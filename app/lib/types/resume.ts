export interface ResumeSection {}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

export interface EducationDegree {
  label: string;
}

export interface EducationEntry {
  id: string;
  schoolName: string;
  degree: string;
  location: string;
  major: string;
  gpa?: number;
  dateRange: DateRange;
}

export interface WorkExperienceEntry {
  companyName: string;
  roleTitle: string;
  location: string;
  dateRange: DateRange;
  responsibilities: string[];
}

export interface SkillsEntry {
  title: string;
  items: string[];
}

export interface ProjectsEntry {
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

export interface ProfileSection extends ResumeSection {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  linkUrl: string;
}

export interface EducationSection extends ResumeSection {
  entries: EducationEntry[];
}

export interface WorkExperienceSection extends ResumeSection {
  entries: WorkExperienceEntry[];
}

export interface SkillsSection extends ResumeSection {
  entries: SkillsEntry[];
}

export interface ProjectsSection extends ResumeSection {
  entries: ProjectsEntry[];
}

export type Resume = {
  profile: ProfileSection;
  education: EducationSection;
  workExperience: WorkExperienceSection;
  skills: SkillsSection;
  projects: ProjectsSection;
};

export const DEFAULT_RESUME: Resume = {
  profile: {
    fullName: '',
    email: '',
    location: '',
    phone: '',
    linkUrl: '',
  },
  education: {
    entries: [],
  },
  workExperience: {
    entries: [],
  },
  projects: {
    entries: [],
  },
  skills: {
    entries: [],
  },
};
