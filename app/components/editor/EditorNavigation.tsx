import { ROUTES } from '@/lib/stores/routing.store';
import { cn } from '@/lib/utils';
import { NavLink, NavLinkProps } from '@remix-run/react';

interface EditorNavLinkProps extends NavLinkProps {}

function EditorNavLink(props: EditorNavLinkProps) {
  return (
    <NavLink
      {...props}
      className={cn(
        props.className,
        'aria-[current]:text-primary aria-[current]:underline hover:underline transition'
      )}
    >
      {props.children}
    </NavLink>
  );
}

export default function EditorNavigation() {
  return (
    <div className="flex flex-col gap-2 px-6 py-12 min-w-48">
      {ROUTES.map((route, index) => (
        <EditorNavLink key={index} to={route.path}>
          {route.label}
        </EditorNavLink>
      ))}
    </div>
  );
}
