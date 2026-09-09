import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
const links = [['about','เกี่ยวกับฉัน'], ['skills','ทักษะ'], ['projects','ผลงาน'], ['activities','กิจกรรม'], ['certificates','ใบรับรอง'], ['contact','ติดต่อ']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <nav aria-label="เมนูหลัก" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-light">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 min-h-20 flex items-center justify-between gap-6">
      <a href="#hero" onClick={() => setOpen(false)} className="font-bold text-base sm:text-lg leading-snug max-w-52">{portfolioData.personal.name}<span className="block text-primary text-sm font-normal">แฟ้มสะสมผลงาน</span></a>
      <div className="hidden xl:flex items-center gap-6">{links.map(([id,label]) => <a key={id} href={`#${id}`} className="text-sm font-medium hover:text-primary">{label}</a>)}<a href="#resume" className="btn-primary text-sm">ดู Resume</a></div>
      <button type="button" className="xl:hidden p-3" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div id="mobile-nav" className="xl:hidden border-t border-border-light px-6 py-4 bg-white grid grid-cols-2 gap-2">{links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="p-3 hover:text-primary">{label}</a>)}<a href="#resume" onClick={() => setOpen(false)} className="p-3 text-primary font-semibold">ดู Resume</a></div>}
  </nav>;
}
