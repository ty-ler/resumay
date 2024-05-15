import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
  return { id: params.id };
}

export default function EditorEducationIdPage() {
  const { id } = useLoaderData<{ id: string }>();

  return <div>{id}</div>;
}
