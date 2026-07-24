export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  trainingHours: string;
}

export interface ClubIdentity {
  name: string;
  shortName: string;
  academyName: string;
  motto: string;
  tagline: string;
  logo: string;
  establishedYear?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  author: string;
  ogImage: string;
}

export interface SiteConfig {
  identity: ClubIdentity;
  contact: ContactInfo;
  socials: SocialLinks;
  seo: SEOConfig;
}
