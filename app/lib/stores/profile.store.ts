import { produce } from 'immer';
import { create } from 'zustand';
import { ProfileSection } from '../types';

export type ProfileState = {
  profile: ProfileSection;
};

export type ProfileActions = {
  setProfile(profile: ProfileSection): void;
  setFullName(fullName: string): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  setLocation(location: string): void;
  setLinkUrl(linkUrl: string): void;
};

export type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>((set) => {
  const modify = (modify: (state: ProfileState) => void) =>
    set(produce((state) => modify(state)));

  return {
    profile: {
      fullName: '',
      email: '',
      location: '',
      phone: '',
      linkUrl: '',
    },
    setProfile: (profile) =>
      modify((state) => {
        state.profile = profile;
      }),
    // set((state) => ({
    //   ...state,
    //   profile,
    // })),
    setEmail: (email) =>
      modify((state: ProfileState) => {
        state.profile.email = email;
      }),
    setFullName: (fullName) =>
      modify((state: ProfileState) => {
        state.profile.fullName = fullName;
      }),
    setPhone: (phone) =>
      modify((state: ProfileState) => {
        state.profile.phone = phone;
      }),
    setLocation: (location) =>
      modify((state: ProfileState) => {
        state.profile.location = location;
      }),
    setLinkUrl: (linkUrl) =>
      modify((state: ProfileState) => {
        state.profile.linkUrl = linkUrl;
      }),
  };
});
