export type PaperStatus = 'published' | 'preprint' | 'under-review' | 'in-progress';

export interface PaperLinks {
  pdf?: string;
  doi?: string;
  arxiv?: string;
  code?: string;
}

export interface Paper {
  id: string;
  title: string;
  /** Full author list in citation order; the site owner's name is highlighted on cards */
  authors: string[];
  /** Conference or journal, e.g. "IEEE S&P" */
  venue: string;
  year: number;
  status: PaperStatus;
  abstract: string;
  keywords: string[];
  links: PaperLinks;
}

export interface PaperStatusOption {
  id: PaperStatus;
  label: string;
}
