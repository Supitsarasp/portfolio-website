import { portfolioData } from '../data/portfolioData';
export default function Footer() {
  const {name,role,email,github,linkedin} = portfolioData.personal;
  return <footer className="border-t border-border-light py-10 px-6"><div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-7"><div><p className="font-bold text-lg !text-text-primary">{name}</p><p className="text-sm mt-1">{role}</p></div><div className="flex flex-wrap gap-5 items-center text-sm"><a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}<a href={`mailto:${email}`} className="hover:text-primary">อีเมล</a><a href="#privacy" className="hover:text-primary">ความเป็นส่วนตัว</a><a href="#hero" className="hover:text-primary">กลับด้านบน</a></div></div><p className="max-w-6xl mx-auto text-sm mt-7">© {new Date().getFullYear()} {name} สงวนลิขสิทธิ์</p></footer>;
}
