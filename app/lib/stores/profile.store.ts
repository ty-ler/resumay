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

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {
    fullName: '',
    email: '',
    location: '',
    phone: '',
    linkUrl: '',
  },
  setProfile: (profile) =>
    set((state) => ({
      ...state,
      profile,
    })),
  setEmail: (email) =>
    set(
      produce((state: ProfileState) => {
        state.profile.email = email;
      })
    ),
  setFullName: (fullName) =>
    set(
      produce((state: ProfileState) => {
        state.profile.fullName = fullName;
      })
    ),
  setPhone: (phone) =>
    set(
      produce((state: ProfileState) => {
        state.profile.phone = phone;
      })
    ),
  setLocation: (location) =>
    set(
      produce((state: ProfileState) => {
        state.profile.location = location;
      })
    ),
  setLinkUrl: (linkUrl) =>
    set(
      produce((state: ProfileState) => {
        state.profile.linkUrl = linkUrl;
      })
    ),
}));
