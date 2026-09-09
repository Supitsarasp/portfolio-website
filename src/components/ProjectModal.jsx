import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import Modal from './Modal';
import ProjectVisual from './ProjectVisual';
const labels = { github:'ซอร์สโค้ดบน GitHub',livePortfolio:'เว็บไซต์สรุปผลงาน',applicationUnderTest:'เว็บไซต์ที่ใช้ทดสอบ',liveDemo:'เปิดแอป Demo',liveWebsite:'เปิดเว็บไซต์',presentation:'เอกสารนำเสนอ PDF' };
const types = {github:'GitHub',website:'เว็บไซต์',pdf:'PDF',image:'รูปภาพ',excel:'Excel',figma:'Figma'};
export default function ProjectModal({ project, onClose }) {
  return <Modal title={project.title} onClose={onClose}>
    <div className="p-5 md:p-8"><div className="flex flex-wrap gap-3 mb-6">{[['บทบาท',project.role],['ประเภท',project.category],['ปี',project.year]].filter(([,v]) => v).map(([label,value]) => <div key={label} className="rounded-lg p-3 border border-border-light bg-base-bg"><span className="text-sm text-text-secondary block">{label}</span><span className="font-medium">{value}</span></div>)}</div>
      <div className="rounded-xl overflow-hidden mb-8"><ProjectVisual project={project} /></div>
      <div className="grid lg:grid-cols-[1.8fr_1fr] gap-8">
        <div className="space-y-7">{[['overview','ภาพรวมโปรเจกต์'],['problem','ปัญหาที่ต้องการแก้'],['goal','เป้าหมาย'],['process','ขั้นตอนการทำงาน'],['solution','แนวทางแก้ไข'],['result','ผลลัพธ์'],['learned','สิ่งที่ได้เรียนรู้']].map(([key,title]) => <section key={key}><h3 className="text-xl font-bold mb-3">{title}</h3><p className={key==='result' ? 'p-5 rounded-xl bg-accent/10 border border-accent/20 !text-text-primary' : ''}>{project[key]}</p></section>)}</div>
        <aside className="space-y-5"><div className="p-5 rounded-xl bg-base-bg border border-border-light"><h3 className="font-bold text-lg mb-4">เครื่องมือที่ใช้</h3><div className="flex flex-wrap gap-2">{project.tools.map(t => <span key={t} className="tag !bg-white">{t}</span>)}</div></div><div className="p-5 rounded-xl bg-base-bg border border-border-light"><h3 className="font-bold text-lg mb-4">ลิงก์โปรเจกต์</h3><div className="space-y-3">{Object.entries(project.links).filter(([,url]) => url).map(([key,url]) => <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center gap-3 p-3 bg-white rounded-lg border border-border-light text-sm hover:text-primary"><span>{labels[key] || 'เปิดลิงก์โปรเจกต์'}</span><ExternalLink size={16} className="shrink-0" /></a>)}</div></div></aside>
      </div>
      <section className="mt-10 pt-8 border-t border-border-light"><h3 className="font-bold text-2xl mb-2">เอกสารและหลักฐานประกอบ</h3><p className="mb-6">เอกสาร ผลงานที่ส่งมอบ และหลักฐานการทดสอบ</p><div className="grid md:grid-cols-2 gap-4">{project.evidence.map((item,i) => <div key={`${item.type}-${item.url}-${i}`} className="p-5 rounded-xl border border-border-light"><p className="text-sm !text-primary flex items-center gap-2 mb-3"><FileText size={17} />{types[item.type] || 'เอกสาร'}</p><h4 className="font-bold mb-2">{item.title}</h4><p className="text-sm mb-4">{item.description}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold">เปิดดูหลักฐาน <ArrowUpRight size={17} /></a>{item.sizeLabel && <p className="text-sm mt-2">{item.sizeLabel}</p>}</div>)}</div></section>
    </div>
  </Modal>;
}
