import { ArrowRight, Download, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import '../original-sections.css';

export default function Hero() {
  const { name, role, heroHeadline, intro, location, image, resume } = portfolioData.personal;
  return <section id="hero" className="section-container original-section original-hero">
    <div className="original-hero-grid">
      <div className="animate-slide-up">
        <div className="original-badge mb-6">{role}</div>
        <h1 className="original-name mb-6">{heroHeadline}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">{intro}</p>
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <a href="#projects" className="original-button original-button-primary">ดูผลงานของฉัน <ArrowRight size={18} /></a>
          <a href={resume} download className="original-button original-button-secondary">ดาวน์โหลด Resume <Download size={18} /></a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary pt-6 border-t border-border-light/60">
          <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-primary" />{location}</span>
        </div>
      </div>
      <div className="original-portrait animate-fade-in">
        <div className="original-portrait-frame"><img src={image} alt={`ภาพของ ${name}`} width="848" height="1024" fetchPriority="high" className="w-full h-full object-cover rounded-xl" /></div>
      </div>
    </div>
  </section>;
}
