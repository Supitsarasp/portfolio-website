import { Download, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
export default function Resume() {
  return <section id="resume" className="section-container"><div className="rounded-3xl border border-primary/20 bg-primary/5 p-7 md:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between"><div className="max-w-xl"><p className="eyebrow">ประวัติสำหรับประกอบการสมัครงาน</p><h2 className="text-3xl md:text-4xl font-bold mb-4">Resume</h2></div><div className="flex flex-wrap lg:flex-col gap-3 shrink-0"><a href={portfolioData.personal.resume} download className="btn-primary">ดาวน์โหลด Resume <Download size={18} /></a><a href={portfolioData.personal.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary">เปิดอ่าน PDF <ExternalLink size={18} /></a></div></div></section>;
}
