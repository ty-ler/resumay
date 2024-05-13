import EditorNavigation from '@/components/editor/EditorNavigation';
import EditorPreview from '@/components/editor/EditorPreview';
import EditorSidebar from '@/components/editor/EditorSidebar';
import { useRoutingStore } from '@/lib/stores/routing.store';
import { getLocalResume } from '@/lib/utils';
import { Outlet, useMatches, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export default function EditorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const localResume = getLocalResume();
    if (!localResume) {
      navigate('/');
    }
  }, []);

  const setActiveRoute = useRoutingStore((state) => state.setActiveRoute);
  const matches = useMatches();

  useEffect(() => {
    const match = matches.at(-1);
    if (match) {
      setActiveRoute(match.pathname);
    }
  }, [matches]);

  return (
    <div className="flex gap-4 h-full">
      <EditorNavigation />
      <EditorSidebar>
        <Outlet />
      </EditorSidebar>
      <EditorPreview />
    </div>
  );
}
