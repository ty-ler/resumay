import { create } from 'zustand';
import { Resume } from '../types';

type ResumeState = {
  resume?: Resume;
};

type ResumeActions = {
  setResume(resume: Resume): void;
};

type ResumeStore = ResumeState & ResumeActions;

export const useResumeStore = create<ResumeStore>((set) => ({
  setResume: (resume: Resume) =>
    set((state) => ({
      ...state,
      resume: resume,
    })),
}));
