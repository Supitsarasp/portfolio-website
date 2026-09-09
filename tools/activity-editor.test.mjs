import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import editorPlugin, { saveActivityGallery } from './activity-editor-plugin.mjs';
import { galleryPhotos } from '../src/utils/gallery.js';

async function fixture(fn) {
  const root = await mkdtemp(join(tmpdir(),'portfolio-gallery-'));
  try {
    await mkdir(join(root,'src/data'),{recursive:true});
    await mkdir(join(root,'public/activities'),{recursive:true});
    await writeFile(join(root,'src/data/portfolioContent.json'),JSON.stringify({activities:[{id:'event'},{id:'mentor'}]}));
    await writeFile(join(root,'public/activities/gallery.json'),JSON.stringify({version:1,activities:{event:[],mentor:[]}}));
    await fn(root);
  } finally { await rm(root,{recursive:true,force:true}); }
}

// Use a real supplied JPEG as a fixture without changing the original file.
const jpeg = await readFile(new URL('../public/profile.jpg',import.meta.url));
const data = `data:image/jpeg;base64,${jpeg.toString('base64')}`;

test('save images to disk, update captions/order, retain unrelated activity, and remove from gallery',async () => fixture(async root => {
  const first = await saveActivityGallery(root,{activityId:'event',revision:'[]',photos:[{data,caption:'จัดกิจกรรม'},{data,caption:'ทำงานร่วมกับทีม'}]});
  assert.equal(first.photos.length,2);
  assert.deepEqual(await readFile(join(root,'public',first.photos[0].src)),jpeg);
  const other = await saveActivityGallery(root,{activityId:'mentor',revision:'[]',photos:[{data,caption:'พี่เลี้ยง'}]});
  const reordered = await saveActivityGallery(root,{activityId:'event',revision:first.revision,photos:[{...first.photos[1],caption:'รูปหลักใหม่'},first.photos[0]]});
  assert.equal(reordered.photos[0].caption,'รูปหลักใหม่');
  const saved = JSON.parse(await readFile(join(root,'public/activities/gallery.json'),'utf8'));
  assert.deepEqual(saved.activities.mentor,other.photos);
  const removed = await saveActivityGallery(root,{activityId:'event',revision:reordered.revision,photos:[]});
  assert.equal(removed.photos.length,0);
  assert.deepEqual(await readFile(join(root,'public',first.photos[0].src)),jpeg);
}));

test('reject a stale editor revision without changing the saved gallery',async () => fixture(async root => {
  const first = await saveActivityGallery(root,{activityId:'event',revision:'[]',photos:[{data,caption:'รูปเดิม'}]});
  await assert.rejects(saveActivityGallery(root,{activityId:'event',revision:'[]',photos:[]}),/หน้าต่างอื่น/);
  assert.deepEqual(JSON.parse(await readFile(join(root,'public/activities/gallery.json'),'utf8')).activities.event,first.photos);
}));

test('reject unsupported files, paths, missing activities and more than six photos',async () => fixture(async root => {
  for (const input of [
    {activityId:'missing',revision:'[]',photos:[]},
    {activityId:'event',revision:'[]',photos:[{data:'data:image/svg+xml;base64,PHN2Zz4=',caption:''}]},
    {activityId:'event',revision:'[]',photos:[{src:'../../index.html',caption:''}]},
    {activityId:'event',revision:'[]',photos:Array.from({length:7},()=>({data,caption:''}))}
  ]) await assert.rejects(saveActivityGallery(root,input));
  assert.deepEqual(JSON.parse(await readFile(join(root,'public/activities/gallery.json'),'utf8')).activities,{event:[],mentor:[]});
}));

test('editor middleware refuses remote hosts and unauthenticated writes; never included in build',async () => {
  const plugin = editorPlugin();
  assert.equal(plugin.apply,'serve');
  let handler;
  plugin.configureServer({config:{root:process.cwd()},middlewares:{use:fn=>{handler=fn;}}});
  for (const headers of [{host:'attacker.example'},{host:'127.0.0.1:5173'}]) {
    let code,body;
    await handler({url:'/__activity-api',method:'POST',headers},{writeHead:status=>{code=status;},end:value=>{body=value;}},()=>{throw Error('Unexpected route fallthrough');});
    assert.equal(code,403);assert.ok(JSON.parse(body).error);
  }
});

test('gallery viewer accepts only local image paths and tolerates missing or malformed data',() => {
  assert.deepEqual(galleryPhotos(null,'event'),[]);
  assert.deepEqual(galleryPhotos({activities:{event:'bad'}},'event'),[]);
  assert.deepEqual(galleryPhotos({activities:{event:[{src:'https://example.com/x.jpg'},{src:'activities/good.jpg',caption:'ทดสอบ'}]}},'event'),[{src:'activities/good.jpg',caption:'ทดสอบ'}]);
});
