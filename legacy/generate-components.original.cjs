const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const files = {
  'Navbar.jsx': `
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Projects', 'Activities', 'Certificates', 'Contact'];

  return (
    <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}\`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        <a href="#" className="font-heading font-bold text-xl tracking-tight hover:text-primary transition-colors">
          {portfolioData.personal.name}
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map(link => (
              <a key={link} href={\`#\${link.toLowerCase()}\`} className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <a href="#resume" className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-all shadow-soft hover:shadow-md hover:-translate-y-0.5">
            View Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border-light shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} onClick={() => setIsMobileMenuOpen(false)} className="text-text-secondary hover:text-primary font-medium">
              {link}
            </a>
          ))}
          <a href="#resume" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-medium">
            View Resume
          </a>
        </div>
      )}
    </nav>
  );
}
  `,
  'Hero.jsx': `
import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { name, role, heroHeadline, intro, location } = portfolioData.personal;
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 section-container relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wider mb-6 border border-primary/20">
            {role}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg">
            {intro}
          </p>
          <div className="flex flex-wrap gap-4 items-center mb-8">
            <a href="#projects" className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all flex items-center gap-2 hover:-translate-y-1 shadow-soft hover:shadow-lg">
              View My Projects <ArrowRight size={18} />
            </a>
            <a href="#resume" className="px-6 py-3 bg-white text-text-primary border border-border-light rounded-full font-medium hover:border-primary hover:text-primary transition-all flex items-center gap-2 hover:-translate-y-1">
              Download Resume <Download size={18} />
            </a>
          </div>
          
          <div className="flex gap-6 text-sm text-text-secondary pt-6 border-t border-border-light/60">
            <span>📍 Based in {location}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent"></span> Open to opportunities</span>
          </div>
        </div>

        <div className="relative animate-fade-in lg:ml-auto">
          <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-border-light shadow-soft bg-white p-2">
            <div className="w-full h-full rounded-xl bg-secondary/20 object-cover flex items-center justify-center">
              {/* Placeholder for actual image */}
              <span className="text-secondary-dark font-medium">Portrait Placeholder</span>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
  `,
  'About.jsx': `
import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { highlights } = portfolioData.about;
  return (
    <section id="about" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">A little about my journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
           <div className="aspect-square rounded-2xl overflow-hidden border border-border-light shadow-soft bg-base-bg p-2">
            <div className="w-full h-full rounded-xl bg-primary-light/20 flex items-center justify-center">
               <span className="text-primary-dark font-medium">Profile Image</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            I'm a dedicated professional bridging the gap between quality assurance and user experience design. 
            With a keen eye for detail and a passion for problem-solving, I strive to ensure digital products 
            are not only technically sound but also intuitive and delightful for users. I believe that true 
            quality comes from a deep understanding of both the code and the human using it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border-light bg-base-bg hover:border-primary/30 transition-colors">
                <h4 className="font-heading font-bold text-lg mb-2 text-text-primary">{item.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
  `,
  'Skills.jsx': `
import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { testing, qaTools, uxui, development, softSkills } = portfolioData.skills;
  
  const SkillGroup = ({ title, skills }) => (
    <div className="mb-8">
      <h3 className="font-heading text-xl font-semibold mb-4 text-primary-dark">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-4 py-2 bg-white border border-border-light rounded-full text-sm font-medium text-text-secondary hover:border-primary/50 hover:text-primary transition-colors cursor-default shadow-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-container">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">Tools and technologies I use</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        <div>
          <SkillGroup title="Software Testing" skills={testing} />
          <SkillGroup title="QA Tools" skills={qaTools} />
        </div>
        <div>
          <SkillGroup title="UX/UI Design" skills={uxui} />
          <SkillGroup title="Development" skills={development} />
          <SkillGroup title="Soft Skills" skills={softSkills} />
        </div>
      </div>
    </section>
  );
}
  `,
  'Projects.jsx': `
import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
        <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">Selected work & case studies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="card group hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[16/10] overflow-hidden bg-base-bg">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-3">{project.category}</p>
                </div>
                <span className="text-text-secondary text-sm font-medium">{project.year}</span>
              </div>
              <p className="text-text-secondary mb-6 line-clamp-2">{project.description}</p>
              
              <div className="mb-6">
                 <p className="text-sm font-medium mb-2">Role: <span className="font-normal text-text-secondary">{project.role}</span></p>
                 <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0,3).map(tool => (
                      <span key={tool} className="text-xs px-2 py-1 bg-base-bg border border-border-light rounded-md text-text-secondary">{tool}</span>
                    ))}
                    {project.tools.length > 3 && <span className="text-xs px-2 py-1 text-text-secondary">+{project.tools.length - 3}</span>}
                 </div>
              </div>

              <button 
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
              >
                View Case Study <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
  `,
  'ProjectModal.jsx': `
import React, { useEffect } from 'react';
import { X, ExternalLink, FileText, Image as ImageIcon, Figma, Github, FileSpreadsheet } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getEvidenceIcon = (type) => {
    switch(type) {
      case 'image': return <ImageIcon size={24} className="text-primary" />;
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'excel': return <FileSpreadsheet size={24} className="text-accent" />;
      case 'figma': return <Figma size={24} className="text-purple-500" />;
      case 'github': return <Github size={24} className="text-text-primary" />;
      default: return <FileText size={24} className="text-secondary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Header (Sticky) */}
        <div className="flex justify-between items-center p-6 border-b border-border-light bg-white sticky top-0 z-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="p-2 bg-base-bg rounded-full hover:bg-border-light transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="px-4 py-2 bg-base-bg rounded-lg border border-border-light">
              <span className="block text-xs text-text-secondary uppercase tracking-wider mb-1">Role</span>
              <span className="font-medium">{project.role}</span>
            </div>
            <div className="px-4 py-2 bg-base-bg rounded-lg border border-border-light">
              <span className="block text-xs text-text-secondary uppercase tracking-wider mb-1">Category</span>
              <span className="font-medium text-primary">{project.category}</span>
            </div>
            <div className="px-4 py-2 bg-base-bg rounded-lg border border-border-light">
              <span className="block text-xs text-text-secondary uppercase tracking-wider mb-1">Year</span>
              <span className="font-medium">{project.year}</span>
            </div>
          </div>

          <img src={project.image} alt={project.title} className="w-full aspect-[21/9] object-cover rounded-xl mb-12 border border-border-light" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-10 text-text-secondary leading-relaxed">
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Overview</h3>
                <p>{project.overview}</p>
              </section>
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Problem</h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Goal</h3>
                <p>{project.goal}</p>
              </section>
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Process</h3>
                <div className="flex items-center gap-2 flex-wrap text-sm font-medium text-primary bg-primary/5 p-4 rounded-xl border border-primary/10">
                   {project.process}
                </div>
              </section>
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Solution & Result</h3>
                <p className="mb-4">{project.solution}</p>
                <p className="font-medium text-text-primary bg-accent/10 p-4 border border-accent/20 rounded-xl">{project.result}</p>
              </section>
              <section>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">What I Learned</h3>
                <p>{project.learned}</p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-base-bg p-6 rounded-xl border border-border-light">
                <h4 className="font-bold text-lg mb-4">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <span key={tool} className="text-sm px-3 py-1.5 bg-white border border-border-light rounded-md shadow-sm">{tool}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-base-bg p-6 rounded-xl border border-border-light">
                 <h4 className="font-bold text-lg mb-4">External Links</h4>
                 <div className="space-y-3">
                   {Object.entries(project.links).map(([key, url]) => (
                     <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white border border-border-light rounded-lg hover:border-primary hover:text-primary transition-colors group">
                       <span className="capitalize text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                       <ExternalLink size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
                     </a>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border-light pt-12">
            <h3 className="font-heading text-2xl font-bold mb-2">Project Evidence</h3>
            <p className="text-text-secondary mb-8">Documentation, deliverables, and test artifacts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.evidence.map((item, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-5 bg-white border border-border-light rounded-xl hover:border-primary hover:shadow-soft transition-all">
                  <div className="p-3 bg-base-bg rounded-lg">
                    {getEvidenceIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold">{item.type}</p>
                    <p className="text-sm text-text-secondary mb-4">{item.description}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark">
                      View Evidence <ArrowUpRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
  `,
  'Activities.jsx': `
import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Activities() {
  const { activities } = portfolioData;
  return (
    <section id="activities" className="section-container">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Activities & Experience</h2>
        <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">My journey in timeline</p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border-light">
        {activities.map((item, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-base-bg bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-border-light shadow-soft hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{item.year}</span>
                <span className="text-xs text-text-secondary font-medium">{item.organization}</span>
              </div>
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-sm font-medium text-text-secondary mb-3">{item.role}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  `,
  'Certificates.jsx': `
import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export default function Certificates() {
  const { certificates } = portfolioData;
  return (
    <section id="certificates" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificates & Achievements</h2>
        <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">Continuous learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, idx) => (
          <div key={idx} className="card group">
            <div className="aspect-[4/3] bg-base-bg p-4 border-b border-border-light flex items-center justify-center">
              <img src={cert.image} alt={cert.title} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-2 line-clamp-1">{cert.title}</h4>
              <div className="flex justify-between items-center text-sm text-text-secondary mb-6">
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-2.5 bg-base-bg border border-border-light rounded-lg font-medium text-sm hover:border-primary hover:text-primary transition-colors">
                View Certificate <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  `,
  'Resume.jsx': `
import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="section-container">
      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Resume</h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Interested in working together or learning more about my experience? Check out my full resume for a comprehensive look at my background and skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-8 py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all flex items-center gap-2 shadow-soft hover:shadow-lg hover:-translate-y-1">
              Download Resume <Download size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white text-text-primary border border-border-light rounded-full font-medium hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-soft hover:shadow-lg hover:-translate-y-1">
              View PDF <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
  `,
  'Contact.jsx': `
import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  const { email, location, linkedin, github } = portfolioData.personal;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message. I will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-container bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">
            I'm always open to new opportunities, collaborations, and conversations about technology, quality, and design.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-12 h-12 bg-base-bg rounded-full flex items-center justify-center border border-border-light">
                <Mail size={20} className="text-primary" />
              </div>
              <a href={\`mailto:\${email}\`} className="hover:text-primary font-medium">{email}</a>
            </div>
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-12 h-12 bg-base-bg rounded-full flex items-center justify-center border border-border-light">
                <MapPin size={20} className="text-primary" />
              </div>
              <span className="font-medium">{location}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-base-bg rounded-full flex items-center justify-center border border-border-light hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
              <Linkedin size={20} />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-base-bg rounded-full flex items-center justify-center border border-border-light hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input required type="text" id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-base-bg border border-border-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input required type="email" id="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-base-bg border border-border-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="jane@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input required type="text" id="subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-base-bg border border-border-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="How can we work together?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea required id="message" rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-base-bg border border-border-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none custom-scrollbar" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
  `,
  'Footer.jsx': `
import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { name, role, linkedin, github, email } = portfolioData.personal;
  return (
    <footer className="py-12 border-t border-border-light bg-base-bg text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-heading font-bold text-2xl mb-2">{name}</h2>
        <p className="text-text-secondary text-sm font-medium tracking-wide mb-8">{role}</p>
        
        <div className="flex justify-center gap-6 mb-8 text-sm font-medium text-text-secondary">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href={\`mailto:\${email}\`} className="hover:text-primary transition-colors">Email</a>
        </div>
        
        <p className="text-xs text-text-secondary/60">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
  `
};

Object.keys(files).forEach(fileName => {
  fs.writeFileSync(path.join(componentsDir, fileName), files[fileName].trim());
});

console.log("Components created successfully.");
