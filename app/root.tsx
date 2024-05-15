import stylesheet from '@/globals.css?url';
import { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import debounce from 'lodash-es/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useResumeStore } from './lib/stores';
import { useEducationStore } from './lib/stores/education.store';
import { useProfileStore } from './lib/stores/profile.store';
import { useWorkExperienceStore } from './lib/stores/work-experience.store';
import { DEFAULT_RESUME, Resume } from './lib/types';
import { getLocalResume, storeLocalResume } from './lib/utils';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [foundResume, setFoundResume] = useState(false);

  const { resume, setResume } = useResumeStore(({ resume, setResume }) => ({
    resume,
    setResume,
  }));

  const profileStore = useProfileStore();
  const profile = useProfileStore((state) => state.profile);

  const educationStore = useEducationStore();
  const education = useEducationStore((state) => state.education);

  const workExperienceStore = useWorkExperienceStore();
  const workExperience = useWorkExperienceStore(
    (state) => state.workExperience
  );

  const loadResume = () => {
    const localResume = getLocalResume();
    if (localResume) {
      profileStore.setProfile(localResume.profile);
      educationStore.setEducation(localResume.education);
      workExperienceStore.setWorkExperience(localResume.workExperience);

      setFoundResume(true);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const storeResume = useCallback(
    debounce((resume: Resume) => {
      storeLocalResume(resume);
    }, 250),
    []
  );

  useEffect(() => {
    if (foundResume) {
      setResume({
        ...DEFAULT_RESUME,
        profile: profile,
        education: education,
        workExperience: workExperience,
      });
    }
  }, [profile, education, workExperience, foundResume]);

  useEffect(() => {
    if (resume) {
      storeResume(resume);
    }
  }, [resume]);

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
