import { produce } from 'immer';
import { create } from 'zustand';
import { EducationSection } from '../types';
import { moveArrayElement } from '../utils';

export type EducationState = {
  education: EducationSection;
};

export type EducationActions = {
  setEducation(education: EducationSection): void;
  addSection(): void;
  moveSection(from: number, to: number): void;
  removeSection(index: number): void;
  setSchoolName(index: number, schoolName: string): void;
  setSchoolLocation(index: number, location: string): void;
  setSchoolDegree(index: number, degree: string): void;
  setSchoolMajor(index: number, major: string): void;
  setSchoolGPA(index: number, gpa: number | undefined): void;
  setSchoolStartDate(index: number, date: Date | undefined): void;
  setSchoolEndDate(index: number, date: Date | undefined): void;
};

export type EducationStore = EducationState & EducationActions;

export const useEducationStore = create<EducationStore>((set) => {
  const modify = (modify: (state: EducationState) => void) =>
    set(produce((state) => modify(state)));

  return {
    education: {
      entries: [],
    },
    setEducation: (education) =>
      modify((state) => {
        state.education = education;
      }),
    addSection: () =>
      modify((state) => {
        state.education.entries.push({
          id: crypto.randomUUID(),
          schoolName: '',
          degree: '',
          location: '',
          major: '',
          dateRange: {},
        });
      }),
    moveSection: (from, to) =>
      modify((state: EducationState) => {
        moveArrayElement(state.education.entries, from, to);
      }),
    removeSection: (index) =>
      modify((state: EducationState) => {
        state.education.entries.splice(index, 1);
      }),
    setSchoolName: (index, schoolName) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.schoolName = schoolName;
        }
      }),
    setSchoolLocation: (index, location) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.location = location;
        }
      }),
    setSchoolDegree: (index, degree) =>
      set(
        produce((state: EducationState) => {
          const entry = state.education.entries[index];
          if (entry) {
            entry.degree = degree;
          }
        })
      ),
    setSchoolMajor: (index, major) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.major = major;
        }
      }),
    setSchoolGPA: (index, gpa) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.gpa = gpa;
        }
      }),
    setSchoolStartDate: (index, date) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.dateRange.startDate = date?.toISOString();
        }
      }),
    setSchoolEndDate: (index, date) =>
      modify((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.dateRange.endDate = date?.toISOString();
        }
      }),
  };
});
