const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function normalizePortfolioContent(input) {
  const errors = [];
  const fail = (path, expected) => errors.push(`${path}: ต้องเป็น${expected}`);
  const object = (value, path) => {
    if (isRecord(value)) return value;
    fail(path, ' object');
    return {};
  };
  const array = (value, path) => {
    if (Array.isArray(value)) return value;
    fail(path, ' array');
    return [];
  };
  const string = (value, path, optional = false) => {
    if (typeof value === 'string' && (optional || value.trim())) return value;
    if (optional && (value === undefined || value === null)) return '';
    fail(path, optional ? ' string หรือเว้นว่าง' : ' string ที่ไม่ว่าง');
    return '';
  };
  const url = (value, path, optional = false) => {
    const result = string(value, path, optional).trim();
    if (!result) return '';
    if (/^(https?:\/\/|mailto:|#)/i.test(result) || !/^[a-z][a-z\d+.-]*:/i.test(result)) return result;
    errors.push(`${path}: scheme ของ URL ไม่ได้รับอนุญาต`);
    return '';
  };
  const strings = (value, path) => array(value, path).map((item, index) => string(item, `${path}[${index}]`));

  const root = object(input, 'root');
  const rawPersonal = object(root.personal, 'personal');
  const personal = {
    ...rawPersonal,
    name: string(rawPersonal.name, 'personal.name'),
    role: string(rawPersonal.role, 'personal.role'),
    heroHeadline: string(rawPersonal.heroHeadline, 'personal.heroHeadline'),
    intro: string(rawPersonal.intro, 'personal.intro'),
    email: string(rawPersonal.email, 'personal.email'),
    location: string(rawPersonal.location, 'personal.location'),
    github: url(rawPersonal.github, 'personal.github'),
    linkedin: url(rawPersonal.linkedin, 'personal.linkedin', true),
    image: url(rawPersonal.image, 'personal.image'),
    resume: url(rawPersonal.resume, 'personal.resume'),
  };
  if (personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) errors.push('personal.email: รูปแบบอีเมลไม่ถูกต้อง');

  const rawAbout = object(root.about, 'about');
  const education = array(rawAbout.education, 'about.education').map((value, index) => {
    const path = `about.education[${index}]`;
    const item = object(value, path);
    return { ...item, institution: string(item.institution, `${path}.institution`), degree: string(item.degree, `${path}.degree`), location: string(item.location, `${path}.location`), period: string(item.period, `${path}.period`), gpa: string(item.gpa, `${path}.gpa`), status: string(item.status, `${path}.status`, true) };
  });
  if (education.length === 0) errors.push('about.education: ต้องมีอย่างน้อย 1 รายการ');
  const about = { ...rawAbout, education, bio: strings(rawAbout.bio, 'about.bio'), targetRoles: strings(rawAbout.targetRoles, 'about.targetRoles') };

  const rawSkills = object(root.skills, 'skills');
  const skills = Object.fromEntries(['testing', 'tools', 'development', 'uxui', 'softSkills'].map(key => [key, strings(rawSkills[key], `skills.${key}`)]));

  const projects = array(root.projects, 'projects').map((value, index) => {
    const path = `projects[${index}]`;
    const project = object(value, path);
    const rawLinks = object(project.links, `${path}.links`);
    const links = Object.fromEntries(Object.entries(rawLinks).map(([key, value]) => [key, url(value, `${path}.links.${key}`, true)]));
    const evidence = array(project.evidence, `${path}.evidence`).map((value, evidenceIndex) => {
      const evidencePath = `${path}.evidence[${evidenceIndex}]`;
      const item = object(value, evidencePath);
      return { ...item, title: string(item.title, `${evidencePath}.title`), type: string(item.type, `${evidencePath}.type`), description: string(item.description, `${evidencePath}.description`), url: url(item.url, `${evidencePath}.url`), sizeLabel: string(item.sizeLabel, `${evidencePath}.sizeLabel`, true) };
    });
    const normalized = { ...project, links, evidence, tools: strings(project.tools, `${path}.tools`) };
    for (const key of ['id', 'title', 'category', 'role', 'description', 'overview', 'problem', 'goal', 'process', 'solution', 'result', 'learned', 'context', 'summaryMetric']) normalized[key] = string(project[key], `${path}.${key}`);
    normalized.year = string(project.year, `${path}.year`, true);
    normalized.image = url(project.image, `${path}.image`, true);
    return normalized;
  });

  const activities = array(root.activities, 'activities').map((value, index) => {
    const path = `activities[${index}]`;
    const item = object(value, path);
    return { ...item, id: string(item.id, `${path}.id`), year: string(item.year, `${path}.year`), organization: string(item.organization, `${path}.organization`), title: string(item.title, `${path}.title`), role: string(item.role, `${path}.role`), description: string(item.description, `${path}.description`) };
  });

  const certificates = array(root.certificates, 'certificates').map((value, index) => {
    const path = `certificates[${index}]`;
    const item = object(value, path);
    return { ...item, title: string(item.title, `${path}.title`), originalTitle: string(item.originalTitle, `${path}.originalTitle`), issuer: string(item.issuer, `${path}.issuer`), date: string(item.date, `${path}.date`), image: url(item.image, `${path}.image`), url: url(item.url, `${path}.url`) };
  });

  for (const [collectionName, collection] of [['projects', projects], ['activities', activities]]) {
    const seen = new Set();
    collection.forEach((item, index) => {
      if (item.id && seen.has(item.id)) errors.push(`${collectionName}[${index}].id: ค่า "${item.id}" ซ้ำ`);
      seen.add(item.id);
    });
  }

  return { data: { ...root, personal, about, skills, projects, activities, certificates }, errors };
}

export function assertValidPortfolioContent(input) {
  const result = normalizePortfolioContent(input);
  if (result.errors.length) throw new Error(`portfolioContent.json ไม่ถูกต้อง:\n- ${result.errors.join('\n- ')}`);
  return result.data;
}
