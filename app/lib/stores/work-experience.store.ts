import { produce } from 'immer';
import { create } from 'zustand';
import { WorkExperienceSection } from '../types';
import { moveArrayElement } from '../utils';

export type WorkExperienceState = {
  workExperience: WorkExperienceSection;
};

export type WorkExperienceActions = {
  setWorkExperience(workExperience: WorkExperienceSection): void;
  addSection(): void;
  moveSection(from: number, to: number): void;
  removeSection(index: number): void;
};

export type WorkExperienceStore = WorkExperienceState & WorkExperienceActions;

export const useWorkExperienceStore = create<WorkExperienceStore>((set) => {
  const modify = (modify: (state: WorkExperienceState) => void) =>
    set(produce((state) => modify(state)));

  return {
    workExperience: {
      entries: [],
    },
    setWorkExperience(workExperience) {
      modify((state) => {
        state.workExperience = workExperience;
      });
    },
    addSection() {
      modify((state) => {
        state.workExperience.entries.push({
          id: crypto.randomUUID(),
          companyName: '',
          location: '',
          roleTitle: '',
          responsibilities: [],
          dateRange: {},
        });
      });
    },
    moveSection(from, to) {
      modify((state) => {
        moveArrayElement(state.workExperience.entries, from, to);
      });
    },
    removeSection(index) {
      modify((state) => {
        state.workExperience.entries.splice(index, 1);
      });
    },
  };
});
