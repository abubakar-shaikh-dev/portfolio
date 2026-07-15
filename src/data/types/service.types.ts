export interface Service {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

export interface ExpertiseArea {
  category: string;
  items: string;
}

export interface PreviousClient {
  company: string;
  role: string;
  description: string;
}
