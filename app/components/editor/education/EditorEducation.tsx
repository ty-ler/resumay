import { SortableContainer } from '@/components/dnd/SortableContainer';
import { Button } from '@/components/ui/button';
import { useEducationStore } from '@/lib/stores/education.store';
import { EducationEntry } from '@/lib/types';
import { DragEndEvent } from '@dnd-kit/core';
import { hasSortableData } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import EditorSection from '../EditorSection';
import EditorEducationListEntry from './EditorEducationListEntry';

export default function EditorEducation() {
  const store = useEducationStore();
  const entries = useEducationStore((state) => state.education.entries);

  const handleClickAddButton = () => {
    store.addSection();
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !hasSortableData(active) || !hasSortableData(over)) return;

    const from = active.data.current.sortable.index;
    const to = over.data.current.sortable.index;
    store.moveSection(from, to);
  };

  // useEffect(() => {
  //   if (draggingEntry) {
  //     document.body.style.setProperty('cursor', 'grab');
  //   } else {
  //     document.body.style.setProperty('cursor', '');
  //   }
  // }, [draggingEntry]);

  return (
    <EditorSection title="Education">
      <Button
        className="flex items-center gap-2"
        onClick={handleClickAddButton}
      >
        <Plus />
        Add Education
      </Button>

      <SortableContainer
        items={entries}
        renderDragOverlay={(entry: EducationEntry) => (
          <EditorEducationListEntry
            entry={entry}
            index={0}
          ></EditorEducationListEntry>
          // <EditorEducationEntry
          //   entry={item}
          //   index={0}
          //   className="border-primary"
          //   buttonClassName="text-primary cursor-grabbing"
          // />
        )}
        onDragEnd={handleDragEnd}
        itemsContainerClassName="flex flex-col gap-4 h-full transition"
      >
        {entries.map((entry, index) => (
          <EditorEducationListEntry
            entry={entry}
            index={index}
            key={entry.id}
          />
          // <EditorEducationEntry entry={entry} index={index} key={entry.id} />
        ))}
      </SortableContainer>
    </EditorSection>
  );
}
