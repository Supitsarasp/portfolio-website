import { useState } from 'react';
import { FolderCode } from 'lucide-react';

export default function ProjectVisual({ project }) {
  const [failed, setFailed] = useState(false);
  return <div className="aspect-[16/9] bg-base-bg border-b border-border-light overflow-hidden w-full">
    {!failed && project.image ? <img src={project.image} alt={`ภาพประกอบโปรเจกต์ ${project.title}`} loading="lazy" decoding="async" referrerPolicy={project.image.startsWith('http') ? 'no-referrer' : undefined} onError={() => setFailed(true)} className="w-full h-full object-contain" /> : <div className="h-full p-7 md:p-10 flex flex-col justify-between bg-primary/5">
      <FolderCode size={30} className="text-primary" /><div><p className="text-sm !text-primary mb-2">{project.context}</p><p className="text-xl md:text-2xl font-bold !text-text-primary">{project.summaryMetric}</p></div>
    </div>}
  </div>;
}
