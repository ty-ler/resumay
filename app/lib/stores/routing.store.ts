import { produce } from 'immer';
import { create } from 'zustand';

export type Route = {
  path: string;
  label: string;
};

export const ROUTES: Route[] = [
  { path: '/editor/profile', label: 'Profile' },
  { path: '/editor/education', label: 'Education' },
  { path: '/editor/work', label: 'Work Experience' },
  { path: '/editor/skills', label: 'Skills' },
  { path: '/editor/projects', label: 'Projects' },
];

export type RoutingState = {
  activeRoute?: Route;
};

export type RoutingActions = {
  setActiveRoute(path: string | undefined): void;
  routeIndex(): number;
  previousRoute(): Route | undefined;
  nextRoute(): Route | undefined;
};

export type RoutingStore = RoutingState & RoutingActions;

export const useRoutingStore = create<RoutingStore>((set, get) => ({
  setActiveRoute: (path) =>
    set(
      produce((state: RoutingState) => {
        state.activeRoute = ROUTES.find((v) => v.path === path);
      })
    ),
  routeIndex: () =>
    ROUTES.findIndex((route) => route.path === get().activeRoute?.path),
  previousRoute: () => {
    const routeIndex = get().routeIndex();
    const prevIndex = routeIndex - 1;
    return prevIndex >= prevIndex ? ROUTES[prevIndex] : undefined;
  },
  nextRoute: () => {
    const routeIndex = get().routeIndex();
    const nextIndex = routeIndex + 1;
    return nextIndex <= ROUTES.length - 1 ? ROUTES[nextIndex] : undefined;
  },
}));
