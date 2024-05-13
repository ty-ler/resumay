import { ROUTES } from '@/lib/stores/routing.store';
import { redirect } from '@remix-run/node';

export async function loader() {
  return redirect(ROUTES[0].path);
}
