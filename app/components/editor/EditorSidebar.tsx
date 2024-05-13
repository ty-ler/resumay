import { Button } from '@/components/ui/button';
import { useRoutingStore } from '@/lib/stores/routing.store';
import { cn } from '@/lib/utils';
import { Link } from '@remix-run/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

type EditorSidebarProps = {
  children: ReactNode;
};

function EditorSidebarNavigation() {
  const { previousRoute, nextRoute } = useRoutingStore(
    ({ previousRoute, nextRoute }) => ({
      previousRoute,
      nextRoute,
    })
  );

  const prev = previousRoute();
  const next = nextRoute();

  return (
    <div className="flex justify-between items-center gap-2 p-4 border-l border-r border-t">
      <Button
        variant="outline"
        size="sm"
        className={cn([
          'flex items-center gap-2 w-32',
          !prev ? 'opacity-50 pointer-events-none' : '',
        ])}
        tabIndex={!prev ? -1 : 0}
        asChild
      >
        <Link to={prev?.path ?? ''}>
          <ChevronLeft size={12} />
          Previous
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!next}
        className={cn([
          'flex items-center gap-2 w-32',
          !next ? 'opacity-50 pointer-events-none' : '',
        ])}
        tabIndex={!prev ? -1 : 0}
        asChild
      >
        <Link to={next?.path ?? ''}>
          Next
          <ChevronRight size={12} />
        </Link>
      </Button>
    </div>
  );
}

export default function EditorSidebar({ children }: EditorSidebarProps) {
  return (
    <div className="flex flex-col w-full max-w-[500px] h-full">
      <div className="bg-card px-4 py-8 border-l border-r h-full overflow-y-auto z-10">
        {children}
      </div>
      <EditorSidebarNavigation />
    </div>
  );
}
