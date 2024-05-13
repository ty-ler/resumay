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
  removeSection(index: number): void;
  moveSection(from: number, to: number): void;
  setSchoolName(index: number, schoolName: string): void;
  setSchoolLocation(index: number, location: string): void;
  setSchoolDegree(index: number, degree: string): void;
  setSchoolMajor(index: number, major: string): void;
  setSchoolGPA(index: number, gpa: number | undefined): void;
  setSchoolStartDate(index: number, date: Date | undefined): void;
  setSchoolEndDate(index: number, date: Date | undefined): void;
};

export type EducationStore = EducationState & EducationActions;

export const useEducationStore = create<EducationStore>((set) => ({
  education: {
    entries: [],
  },
  setEducation: (education) =>
    set((state) => ({
      ...state,
      education,
    })),
  addSection: () =>
    set(
      produce((state: EducationState) => {
        state.education.entries.push({
          id: crypto.randomUUID(),
          schoolName: '',
          degree: '',
          location: '',
          major: '',
          dateRange: {},
        });
      })
    ),
  removeSection: (index) =>
    set(
      produce((state: EducationState) => {
        state.education.entries.splice(index, 1);
      })
    ),
  moveSection: (from, to) =>
    set(
      produce((state: EducationState) => {
        moveArrayElement(state.education.entries, from, to);
      })
    ),
  setSchoolName: (index, schoolName) =>
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.schoolName = schoolName;
        }
      })
    ),
  setSchoolLocation: (index, location) =>
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.location = location;
        }
      })
    ),
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
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.major = major;
        }
      })
    ),
  setSchoolGPA: (index, gpa) =>
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.gpa = gpa;
        }
      })
    ),
  setSchoolStartDate: (index, date) =>
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.dateRange.startDate = date;
        }
      })
    ),
  setSchoolEndDate: (index, date) =>
    set(
      produce((state: EducationState) => {
        const entry = state.education.entries[index];
        if (entry) {
          entry.dateRange.endDate = date;
        }
      })
    ),
}));
