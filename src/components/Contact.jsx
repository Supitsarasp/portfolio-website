import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail, MapPin, GitBranch, ExternalLink, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { CONTACT_LIMITS, createEmailDraft, validateContactForm } from '../utils/contact';
export default function Contact() {
  const { email,location,linkedin,github } = portfolioData.personal;
  const [form,setForm] = useState({name:'',email:'',subject:'',message:''});
  const [status,setStatus] = useState('');
  const [draft,setDraft] = useState(null);
  const [draftVersion,setDraftVersion] = useState(0);
  const draftCount = useRef(0);
  const result = useRef(null);
  useEffect(() => {
    if (draftVersion > 0) {
      result.current?.focus();
      result.current?.scrollIntoView({block:'nearest'});
    }
  }, [draftVersion]);
  const submit = e => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) { setDraft(null); setStatus(validation.message); return; }
    draftCount.current += 1;
    const nextDraft = createEmailDraft(email, form);
    setDraft(nextDraft);
    setDraftVersion(draftCount.current);
    setStatus(`เตรียมข้อความใหม่แล้ว ครั้งที่ ${draftCount.current} กรุณาตรวจทานและกดส่งใน Gmail หากหน้าไม่เปิด ให้กด “เปิด Gmail” ด้านล่าง`);
    window.location.assign(nextDraft.gmail);
  };
  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.preview);
      setStatus('คัดลอกแล้ว วางข้อความในอีเมลของคุณ ตรวจทาน แล้วกดส่ง');
    } catch {
      setStatus(`คัดลอกอัตโนมัติไม่ได้ กรุณาคัดลอกจากช่องข้อความด้านล่าง แล้วส่งไปที่ ${email}`);
    }
  };
  const update = e => { setForm({...form,[e.target.name]:e.target.value}); setDraft(null); setStatus(''); };
  return <section id="contact" className="section-container bg-white"><div className="grid lg:grid-cols-2 gap-10 lg:gap-16"><div><p className="eyebrow">พูดคุยเรื่องสหกิจศึกษาและโอกาสร่วมงาน</p><h2 className="text-3xl md:text-4xl font-bold mb-5">ติดต่อฉัน</h2><p className="text-lg mb-8">ยินดีรับโอกาสใหม่ ๆ การทำงานร่วมกัน และการแลกเปลี่ยนเรื่องเทคโนโลยี คุณภาพซอฟต์แวร์ และการออกแบบ</p><div className="space-y-5"><a href={`mailto:${email}`} className="flex items-start gap-3 font-medium hover:text-primary"><Mail size={22} className="text-primary shrink-0 mt-1" />{email}</a><p className="flex gap-3 items-center"><MapPin size={22} className="text-primary shrink-0" />{location}</p></div><div className="flex flex-wrap gap-3 mt-8"><a href={github} target="_blank" rel="noopener noreferrer" className="btn-secondary"><GitBranch size={18} />GitHub</a>{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn <ExternalLink size={16} /></a>}</div></div>
    <div className="card p-6 md:p-8"><h3 className="font-bold text-xl mb-2">เตรียมข้อความติดต่อ</h3><p className="text-sm mb-6">แบบฟอร์มนี้ช่วยร่างอีเมล เมื่อกดปุ่มจะเปิด Gmail ในเบราว์เซอร์นี้พร้อมข้อความ คุณต้องตรวจทานและกดส่งใน Gmail อีกครั้ง</p><form onSubmit={submit} noValidate className="space-y-5"><div className="grid sm:grid-cols-2 gap-4"><div><label htmlFor="contact-name" className="block text-sm font-medium mb-2">ชื่อผู้ติดต่อ</label><input required id="contact-name" name="name" autoComplete="name" maxLength={CONTACT_LIMITS.name} value={form.name} onChange={update} className="field" placeholder="ชื่อของคุณ" /></div><div><label htmlFor="contact-email" className="block text-sm font-medium mb-2">อีเมลตอบกลับ</label><input required type="email" id="contact-email" name="email" autoComplete="email" maxLength={CONTACT_LIMITS.email} value={form.email} onChange={update} className="field" placeholder="yourname@example.com" /></div></div><div><label htmlFor="contact-subject" className="block text-sm font-medium mb-2">หัวข้อ</label><input required id="contact-subject" name="subject" maxLength={CONTACT_LIMITS.subject} value={form.subject} onChange={update} className="field" placeholder="ติดต่อเรื่องสหกิจศึกษา / นัดสัมภาษณ์" /></div><div><label htmlFor="contact-message" className="block text-sm font-medium mb-2">ข้อความ</label><textarea required id="contact-message" name="message" maxLength={CONTACT_LIMITS.message} rows={5} value={form.message} onChange={update} className="field resize-y" placeholder="รายละเอียดตำแหน่งงาน บริษัท และช่องทางติดต่อกลับ" /></div><button type="submit" className="btn-primary w-full"><Mail size={18} />ส่งผ่าน Gmail</button></form><p key={draftVersion} role="status" aria-live="polite" className="text-sm mt-4">{status}</p>{draft && <div ref={result} tabIndex={-1} aria-labelledby="email-ready-title" className="space-y-3 mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4"><p id="email-ready-title" className="flex items-center gap-2 font-semibold !text-text-primary"><CheckCircle2 size={18} className="text-accent shrink-0" />เตรียมอีเมลแล้ว ครั้งที่ {draftVersion}</p><div className="flex flex-wrap gap-3"><a href={draft.gmail} className="btn-primary text-sm">เปิด Gmail <ExternalLink size={16} /></a><button type="button" onClick={copy} className="btn-secondary text-sm"><Copy size={16} />คัดลอกข้อความ</button></div><label htmlFor="email-preview" className="text-sm block">ข้อความที่เตรียมไว้</label><textarea id="email-preview" readOnly rows={7} className="field text-sm" value={draft.preview} /><p className="text-sm">หากยังไม่ได้เข้าสู่ระบบ Gmail ให้เข้าสู่ระบบก่อน หากข้อความไม่ปรากฏ ให้ย้อนกลับมาเปิด Gmail อีกครั้งหรือคัดลอกข้อความไปวาง</p></div>}<p className="text-xs mt-5">ข้อมูลจะอยู่ในหน้านี้จนกว่าคุณจะรีเฟรชหรือปิดหน้า และจะถูกส่งต่อเมื่อคุณกดส่งผ่าน Gmail เปิด Gmail หรือคัดลอกข้อความเท่านั้น อ่าน <a href="#privacy" className="underline hover:text-primary">ข้อมูลความเป็นส่วนตัว</a></p></div>
    </div></section>;
}
