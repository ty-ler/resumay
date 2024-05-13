import { Resume } from '../types';

const RESUME_LOCAL_KEY = 'RESUME';

export const getLocalResume = (): Resume | undefined => {
  const resumeStr = localStorage.getItem(RESUME_LOCAL_KEY);
  if (!resumeStr) return;

  return JSON.parse(resumeStr) as Resume;
};

export const storeLocalResume = (resume: Resume) => {
  localStorage.setItem(RESUME_LOCAL_KEY, JSON.stringify(resume));
};
