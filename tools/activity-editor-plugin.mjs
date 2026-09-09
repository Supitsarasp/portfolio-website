import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { randomBytes } from 'node:crypto';

const MAX_BODY = 24 * 1024 * 1024;
const MAX_IMAGE = 3 * 1024 * 1024;
const safePhoto = /^activities\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i;
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);

async function readBody(req) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > MAX_BODY) throw new Error('ข้อมูลรูปใหญ่เกินไป กรุณาเลือกรูปน้อยลง');
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new Error('ข้อมูลที่ส่งมาไม่ถูกต้อง'); }
}

export async function saveActivityGallery(root, input) {
  const content = JSON.parse(await readFile(join(root,'src/data/portfolioContent.json'),'utf8'));
  if (!content.activities.some(a => a.id === input?.activityId)) throw new Error('ไม่พบกิจกรรมที่เลือก');
  if (!Array.isArray(input.photos) || input.photos.length > 6) throw new Error('เลือกได้สูงสุด 6 รูปต่อกิจกรรม');
  const dir = join(root,'public/activities');
  const manifestPath = join(dir,'gallery.json');
  await mkdir(dir,{recursive:true});
  const manifest = JSON.parse(await readFile(manifestPath,'utf8'));
  const previous = manifest.activities[input.activityId] || [];
  // Prevent a stale editor tab from overwriting a more recent save.
  if (input.revision !== JSON.stringify(previous)) throw new Error('กิจกรรมนี้ถูกแก้ไขจากหน้าต่างอื่น กรุณาเปิดเครื่องมือใหม่ก่อนบันทึก');
  const existing = new Set(previous.map(p => p.src));
  const writes = [];
  const nextPhotos = input.photos.map(photo => {
    if (!photo || typeof photo.caption !== 'string' || photo.caption.length > 180) throw new Error('คำบรรยายต้องยาวไม่เกิน 180 ตัวอักษร');
    if (photo.data) {
      if (typeof photo.data !== 'string' || !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photo.data)) throw new Error('รูปที่ส่งมาไม่ใช่ JPEG ที่รองรับ');
      const bytes = Buffer.from(photo.data.slice(photo.data.indexOf(',')+1),'base64');
      if (bytes.length > MAX_IMAGE || bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.lastIndexOf(Buffer.from([0xff,0xd9])) < 2) throw new Error('รูปเสียหรือมีขนาดเกิน 3 MB');
      const name = `activity-${randomBytes(10).toString('hex')}.jpg`;
      writes.push({path:join(dir,name),bytes});
      return {src:`activities/${name}`,caption:photo.caption.trim()};
    }
    if (!safePhoto.test(photo.src || '') || !existing.has(photo.src)) throw new Error('ไม่พบรูปเดิม กรุณาเลือกรูปจากเครื่องอีกครั้ง');
    return {src:photo.src,caption:photo.caption.trim()};
  });
  const created = [];

try {
  for (const item of writes) {
    await writeFile(item.path, item.bytes, { flag: 'wx' });
    created.push(item.path);
  }

  manifest.activities[input.activityId] = nextPhotos;

  await writeFile(
    manifestPath,
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8'
  );
} catch (error) {
  for (const path of created) {
    await unlink(path).catch(() => {});
  }

  throw error;
}
  // Keep old image files so a removed photograph can still be recovered locally.
  return {photos:nextPhotos,revision:JSON.stringify(nextPhotos)};
}

export default function activityEditor() {
  const token = randomBytes(32).toString('hex');
  let queue = Promise.resolve();
  return {
    name:'local-activity-editor', apply:'serve',
    configureServer(server) {
      const root = resolve(server.config.root);
      server.middlewares.use(async (req,res,next) => {
        const pathname = (req.url || '').split('?')[0];
        if (!['/__activity-editor','/__activity-api'].includes(pathname)) return next();
        const send = (status,data,type='application/json; charset=utf-8') => {
          res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY'});
          res.end(type.startsWith('application/json') ? JSON.stringify(data) : data);
        };
        let host;
        try { host = new URL(`http://${req.headers.host}`); } catch { return send(403,{error:'เปิดเครื่องมือนี้จาก localhost เท่านั้น'}); }
        if (!localHosts.has(host.hostname)) return send(403,{error:'เปิดเครื่องมือนี้จาก localhost เท่านั้น'});
        try {
          if (pathname === '/__activity-editor' && req.method === 'GET') {
            const html = await readFile(join(root,'tools/activity-editor.html'),'utf8');
            return send(200,html.replace('__EDITOR_TOKEN__',JSON.stringify(token)),'text/html; charset=utf-8');
          }
          if (req.headers['x-editor-token'] !== token) return send(403,{error:'กรุณาเปิดเครื่องมือเพิ่มรูปจากหน้าเว็บในเครื่องอีกครั้ง'});
          if (req.headers.origin && req.headers.origin !== host.origin) return send(403,{error:'ไม่อนุญาตให้บันทึกจากเว็บไซต์อื่น'});
          if (req.method === 'GET') {
            const content = JSON.parse(await readFile(join(root,'src/data/portfolioContent.json'),'utf8'));
            const gallery = JSON.parse(await readFile(join(root,'public/activities/gallery.json'),'utf8'));
            return send(200,{activities:content.activities,gallery});
          }
          if (req.method !== 'POST' || !String(req.headers['content-type']).startsWith('application/json')) return send(405,{error:'รูปแบบคำขอไม่รองรับ'});
          if (req.headers.origin !== host.origin) return send(403,{error:'กรุณาบันทึกผ่านเครื่องมือในเครื่องของคุณ'});
          const input = await readBody(req);
          const save = queue.then(() => saveActivityGallery(root,input));
          queue = save.catch(() => {});
          return send(200,await save);
        } catch (error) { return send(400,{error:error.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่'}); }
      });
    }
  };
}
