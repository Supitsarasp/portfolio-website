import { GraduationCap, MapPin, Target, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { education, targetRoles, bio } = portfolioData.about;
  const { image, name } = portfolioData.personal;
  return <section id="about" className="section-container original-section original-about bg-white">
    <div className="text-center mb-10 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">เกี่ยวกับฉัน</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-5 space-y-6">
        <div className="aspect-square rounded-2xl overflow-hidden border border-border-light shadow-soft bg-base-bg p-2">
          <img src={image} alt={`ภาพของ ${name}`} width="848" height="1024" loading="lazy" className="w-full h-full rounded-xl object-cover" />
        </div>
        <div className="p-6 rounded-2xl border border-border-light bg-base-bg space-y-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border-light">
            <h3 className="font-bold text-base flex items-center gap-2"><GraduationCap size={18} className="text-primary" />การศึกษา</h3>
            <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary-dark">GPA {education[0].gpa}</span>
          </div>
          <div className="space-y-4">{education.map((item,idx) => <div key={item.institution} className={`space-y-1.5 ${idx>0?'pt-4 border-t border-border-light/70':''}`}>
            <div className="flex flex-wrap items-start justify-between gap-2"><h4 className="font-bold text-sm">{item.institution}</h4><span className="text-sm text-text-secondary">{item.period}</span></div>
            <p className="text-sm">{item.degree}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1"><span className="text-sm text-text-secondary flex items-center gap-1"><MapPin size={13} className="text-primary shrink-0" />{item.location}</span><span className="text-sm font-bold px-2 py-0.5 rounded bg-accent/20">GPA: {item.gpa}</span></div>
            {item.status && <p className="text-sm font-medium !text-primary-dark mt-1">• {item.status}</p>}
          </div>)}</div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-8">
        <div><h3 className="text-2xl font-bold mb-4">นักศึกษา ICT ที่พร้อมเรียนรู้และร่วมสร้างผลงาน</h3>{bio.map((paragraph,idx) => <p key={idx} className="text-base mb-4">{paragraph}</p>)}</div>
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-3"><Target size={16} className="text-primary" /><h4 className="text-sm font-bold text-primary-dark">ตำแหน่งงานที่สนใจ</h4></div>
          <div className="flex flex-wrap gap-2">{targetRoles.map(role => <span key={role} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-border-light text-sm font-medium shadow-sm"><CheckCircle2 size={14} className="text-accent shrink-0" />{role}</span>)}</div>
        </div>
      </div>
    </div>
  </section>;
}
