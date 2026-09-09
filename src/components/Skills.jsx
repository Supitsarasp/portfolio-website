import { portfolioData } from '../data/portfolioData';
import { ClipboardCheck, Code2, PenTool, Users, Wrench } from 'lucide-react';

const groups = [
  ['testing', 'การทดสอบซอฟต์แวร์', ClipboardCheck],
  ['tools', 'เครื่องมือ', Wrench],
  ['development', 'การพัฒนาระบบ', Code2],
  ['uxui', 'การออกแบบ UX/UI', PenTool],
  ['softSkills', 'ทักษะการทำงานร่วมกับผู้อื่น', Users],
];

export default function Skills() {
  return <section id="skills" className="section-container"><div className="mb-10"><p className="eyebrow">เครื่องมือและทักษะจากการเรียนและโปรเจกต์</p><h2 className="text-3xl md:text-4xl font-bold">ทักษะและเทคโนโลยี</h2></div><div className="skills-grid">{groups.map(([key,title,Icon]) => <article key={key} className="skill-card card"><div className="skill-card-heading"><span className="skill-card-icon" aria-hidden="true"><Icon size={20} /></span><h3 className="text-lg md:text-xl font-semibold min-w-0">{title}</h3></div><ul className="flex flex-wrap gap-2" aria-label={title}>{portfolioData.skills[key].map(skill => <li key={skill} className="tag">{skill}</li>)}</ul></article>)}</div></section>;
}
