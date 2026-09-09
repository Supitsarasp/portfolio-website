import content from './portfolioContent.json';
import { assetUrl } from '../utils/assets';
import { assertValidPortfolioContent } from './normalizePortfolio';

const normalizedContent = assertValidPortfolioContent(content);

export const portfolioData = {
  ...normalizedContent,
  personal: { ...normalizedContent.personal, image: assetUrl(normalizedContent.personal.image), resume: assetUrl(normalizedContent.personal.resume) },
  projects: normalizedContent.projects.map(project => ({
    ...project,
    image: assetUrl(project.image),
    links: Object.fromEntries(Object.entries(project.links).filter(([, url]) => url).map(([key, url]) => [key, assetUrl(url)])),
    evidence: project.evidence.map(item => ({ ...item, url: assetUrl(item.url) })),
  })),
  certificates: normalizedContent.certificates.map(cert => ({ ...cert, image: assetUrl(cert.image), url: assetUrl(cert.url) })),
};
