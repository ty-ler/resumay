import { useResumeStore } from '@/lib/stores';
import { ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';
import EditorSectionHeader from './EditorSectionHeader';

type EditorSectionProps = {
  children: ReactNode;
  title: string;
};

function EditorSectionLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[150px] h-[14px]" />
        <Skeleton className="w-full h-[42px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[150px] h-[14px]" />
        <Skeleton className="w-full h-[42px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[150px] h-[14px]" />
        <Skeleton className="w-full h-[42px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[150px] h-[14px]" />
        <Skeleton className="w-full h-[42px]" />
      </div>
    </div>
  );
}

export default function EditorSection({ children, title }: EditorSectionProps) {
  const resume = useResumeStore((state) => state.resume);

  return (
    <div className="flex flex-col gap-6">
      <EditorSectionHeader title={title} />

      <div className="flex flex-col gap-6 h-full">
        {resume ? children : <EditorSectionLoading />}
      </div>
    </div>
  );
}
