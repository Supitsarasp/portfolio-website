import { useEffect, useState } from 'react';
import { Camera, ArrowUpRight, ZoomIn } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { assetUrl } from '../utils/assets';
import { galleryPhotos } from '../utils/gallery';
import Modal from './Modal';
export default function Activities() {
  const [gallery,setGallery] = useState({});
  const [galleryError,setGalleryError] = useState(false);
  const [selected,setSelected] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl('activities/gallery.json'),{cache:'no-store',signal:controller.signal})
      .then(r => { if (!r.ok) throw Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { setGallery(data); setGalleryError(false); })
      .catch(error => { if (error.name !== 'AbortError') setGalleryError(true); });
    return () => controller.abort();
  },[]);
  return <section id="activities" className="section-container original-section original-activities">
    <div className="flex flex-wrap items-end justify-between gap-5 mb-16"><div><h2 className="text-3xl md:text-4xl font-bold mb-4">กิจกรรมและประสบการณ์</h2><p className="text-sm font-medium">เส้นทางการเรียนรู้และประสบการณ์</p></div>{import.meta.env.DEV && <a href="/__activity-editor" target="_blank" rel="noopener" className="btn-secondary text-sm"><Camera size={18} />เพิ่ม / จัดการรูปกิจกรรม <ArrowUpRight size={16} /></a>}</div>
    {galleryError && <p role="status" className="mb-6 rounded-lg border border-border-light bg-white p-4 text-sm">โหลดรูปกิจกรรมไม่ได้ในขณะนี้ แต่รายละเอียดกิจกรรมยังแสดงได้ตามปกติ</p>}
    <div className="original-timeline">{portfolioData.activities.map(activity => {
      const photos=galleryPhotos(gallery,activity.id);
      return <article key={activity.id} className="original-timeline-item">
        <div className="original-timeline-marker" aria-hidden="true"><span /></div>
        <div className="original-timeline-card">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-2"><span className="text-sm font-semibold text-primary-dark">{activity.year}</span><span className="text-sm text-text-secondary">{activity.organization}</span></div>
          <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
          <p className="text-sm font-medium mb-3">{activity.role}</p>
          <p className="text-sm">{activity.description}</p>
        {photos.length>0 && <div className="mt-7"><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{photos.map((photo,index) => <figure key={photo.src} className={index===0 ? 'col-span-2 sm:col-span-3' : ''}><button type="button" onClick={() => setSelected({photos,index,title:activity.title})} className="w-full rounded-xl overflow-hidden relative group border border-border-light bg-base-bg" aria-label={`ขยายรูป ${photo.caption||activity.title} ลำดับที่ ${index+1}`}><img src={assetUrl(photo.src)} alt={photo.caption||`${activity.title} รูปที่ ${index+1}`} loading="lazy" decoding="async" className={`w-full object-cover ${index===0?'aspect-[16/9]':'aspect-[4/3]'}`} /><span className="absolute bottom-3 right-3 p-2 bg-white/95 rounded-full text-primary"><ZoomIn size={18} /></span></button>{photo.caption && <figcaption className="text-sm text-text-secondary mt-2">{photo.caption}</figcaption>}</figure>)}</div></div>}
      </div></article>;
    })}</div>
    {selected && <Modal title={selected.title} onClose={() => setSelected(null)}><div className="p-5"><img src={assetUrl(selected.photos[selected.index].src)} alt={selected.photos[selected.index].caption||selected.title} className="max-h-[65dvh] w-full object-contain" /><p className="text-center mt-4">{selected.photos[selected.index].caption}</p><div className="flex flex-wrap justify-center items-center gap-4 mt-5"><button type="button" disabled={selected.index===0} onClick={() => setSelected({...selected,index:selected.index-1})} className="btn-secondary text-sm">รูปก่อนหน้า</button><span className="text-sm" aria-live="polite">{selected.index+1} / {selected.photos.length}</span><button type="button" disabled={selected.index===selected.photos.length-1} onClick={() => setSelected({...selected,index:selected.index+1})} className="btn-secondary text-sm">รูปถัดไป</button></div></div></Modal>}
  </section>;
}
