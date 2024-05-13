import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import { ClassValue } from 'clsx';
import { ReactNode } from 'react';

type DroppableProps = {
  children: ReactNode;
  className?: ClassValue;
};

export default function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <div ref={setNodeRef} className={cn(props.className)}>
      {props.children}
    </div>
  );
}
