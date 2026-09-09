import { useState } from 'react';
import { ArrowUpRight, GitBranch, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import ProjectVisual from './ProjectVisual';
export default function Projects() {
  const [selected, setSelected] = useState(null);
  return <section id="projects" className="section-container bg-white">
    <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6"><div className="max-w-2xl"><p className="eyebrow">ผลงานพร้อมเอกสาร</p><h2 className="text-3xl md:text-4xl font-bold mb-4">โปรเจกต์ที่ลงมือทำ</h2><p>ผลงานด้านการทดสอบซอฟต์แวร์ ฐานข้อมูล การออกแบบ UX/UI และการพัฒนาเว็บไซต์ เปิดอ่านแนวคิด บทบาท วิธีทำ และผลลัพธ์ของแต่ละโปรเจกต์ หรือดูซอร์สโค้ดและเอกสารต้นฉบับได้โดยตรง</p></div><a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm shrink-0"><GitBranch size={18} />ดูทุก Repository <ArrowUpRight size={16} /></a></div>
    <div className="grid md:grid-cols-2 gap-7">{portfolioData.projects.map(project => {
      const repo = project.links.github;
      const document = project.evidence.find(e => e.type === 'pdf');
      return <article key={project.id} className="card flex flex-col hover:border-primary/40 transition-colors">
        <button type="button" onClick={() => setSelected(project)} aria-label={`ดูรายละเอียด ${project.title}`} className="text-left w-full"><ProjectVisual project={project} /></button>
        <div className="p-6 md:p-7 flex-1"><div className="flex items-start justify-between gap-4 mb-3"><p className="text-sm !text-primary font-medium">{project.context}</p>{project.year && <span className="text-sm text-text-secondary shrink-0">{project.year}</span>}</div><h3 className="text-xl md:text-2xl font-bold mb-3"><button type="button" onClick={() => setSelected(project)} className="text-left hover:text-primary">{project.title}</button></h3><p className="text-sm !text-primary mb-4">{project.category}</p><p className="mb-5">{project.description}</p><p className="text-sm mb-3"><strong className="text-text-primary">บทบาท: </strong>{project.role}</p><p className="font-semibold text-sm !text-text-primary px-4 py-3 bg-base-bg rounded-lg mb-4">{project.summaryMetric}</p><div className="flex flex-wrap gap-2">{project.tools.map(tool => <span key={tool} className="tag">{tool}</span>)}</div></div>
        <div className="px-6 pb-6 md:px-7 md:pb-7 flex flex-wrap gap-3"><button type="button" onClick={() => setSelected(project)} className="btn-secondary text-sm flex-1">รายละเอียดโปรเจกต์ <ArrowUpRight size={17} /></button>{(repo || document) && <a href={repo || document.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm flex-1">{repo ? <GitBranch size={17} /> : <FileText size={17} />}{repo ? 'ดูบน GitHub' : 'เปิดเอกสาร PDF'}</a>}</div>
      </article>;
    })}</div>
    {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
  </section>;
}
