import { useState } from 'react';
import { ExternalLink, ZoomIn } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Modal from './Modal';
export default function Certificates() {
  const [selected,setSelected] = useState(null);
  return <section id="certificates" className="section-container bg-white"><div className="mb-10"><p className="eyebrow">การเรียนรู้และพัฒนาทักษะอย่างต่อเนื่อง</p><h2 className="text-3xl md:text-4xl font-bold">ใบรับรองและความสำเร็จ</h2></div>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{portfolioData.certificates.map(cert => <article key={cert.originalTitle} className="card flex flex-col"><button type="button" onClick={() => setSelected(cert)} aria-label={`ขยายใบรับรอง ${cert.title}`} className="aspect-[4/3] w-full p-4 bg-base-bg border-b border-border-light"><img src={cert.image} alt={cert.originalTitle} loading="lazy" decoding="async" className="w-full h-full object-contain" /></button><div className="p-6 flex flex-col flex-1"><h3 className="font-bold text-lg mb-2">{cert.title}</h3><p className="text-sm mb-4">{cert.originalTitle}</p><p className="flex justify-between gap-4 text-sm mb-6"><span>{cert.issuer}</span><span>{cert.date}</span></p><div className="mt-auto flex flex-wrap gap-3"><button type="button" onClick={() => setSelected(cert)} className="btn-secondary text-sm flex-1"><ZoomIn size={16} />ขยายรูป</button><a href={cert.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm flex-1">ดูใบรับรอง <ExternalLink size={16} /></a></div></div></article>)}</div>
    {selected && <Modal title={selected.title} onClose={() => setSelected(null)}><div className="p-5"><img src={selected.image} alt={selected.originalTitle} className="w-full h-auto object-contain" /><p className="text-sm mt-4">{selected.originalTitle} • {selected.issuer} • {selected.date}</p></div></Modal>}
  </section>;
}
