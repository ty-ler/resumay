import { Button } from '@/components/ui/button';
import { useEducationStore } from '@/lib/stores/education.store';
import { cn } from '@/lib/utils';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  hasSortableData,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditorSection from '../EditorSection';
import EditorEducationEntry from './EditorEducationEntry';

export default function EditorEducation() {
  const store = useEducationStore();
  const entries = useEducationStore((state) => state.education.entries);

  const getEntryById = (id: string) => entries.find((v) => v.id === id);

  const [activeDragId, setActiveDragId] = useState<string | undefined>(
    undefined
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleClickAddButton = () => {
    store.addSection();
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveDragId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {};

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !hasSortableData(active) || !hasSortableData(over)) return;

    const from = active.data.current.sortable.index;
    const to = over.data.current.sortable.index;
    store.moveSection(from, to);

    setActiveDragId(undefined);
  };

  const handleDragCancel = () => {
    setActiveDragId(undefined);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const draggingEntry = activeDragId ? getEntryById(activeDragId) : undefined;

  useEffect(() => {
    if (draggingEntry) {
      document.body.style.setProperty('cursor', 'grab');
    } else {
      document.body.style.setProperty('cursor', '');
    }
  }, [draggingEntry]);

  return (
    <EditorSection title="Education">
      <Button
        className="flex items-center gap-2"
        onClick={handleClickAddButton}
      >
        <Plus />
        Add Education
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={entries} strategy={verticalListSortingStrategy}>
          <div className={cn('flex flex-col gap-6 h-full transition')}>
            {entries.map((entry, index) => (
              <EditorEducationEntry
                key={entry.id}
                entry={entry}
                index={index}
              />
            ))}
            <DragOverlay dropAnimation={dropAnimation}>
              {draggingEntry ? (
                <EditorEducationEntry
                  entry={draggingEntry}
                  index={0}
                  className="border-primary w-full"
                  buttonClassName={'text-primary cursor-grabbing'}
                />
              ) : undefined}
            </DragOverlay>
          </div>
        </SortableContext>
      </DndContext>
    </EditorSection>
  );
}
