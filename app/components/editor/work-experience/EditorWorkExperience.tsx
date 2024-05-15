import { SortableContainer } from '@/components/dnd/SortableContainer';
import { Button } from '@/components/ui/button';
import { useWorkExperienceStore } from '@/lib/stores/work-experience.store';
import { WorkExperienceEntry } from '@/lib/types';
import { Plus } from 'lucide-react';
import EditorSection from '../EditorSection';

export default function EditorWorkExperience() {
  const store = useWorkExperienceStore();
  const entries = useWorkExperienceStore(
    (state) => state.workExperience.entries
  );

  const handleClickAddButton = () => {
    store.addSection();
  };

  return (
    <EditorSection title="Work">
      <Button
        className="flex items-center gap-2"
        onClick={handleClickAddButton}
      >
        <Plus />
        Add Work
      </Button>

      <SortableContainer
        items={entries}
        renderDragOverlay={(item: WorkExperienceEntry) => <></>}
      >
        {entries.map((entry, index) => (
          <div key={entry.id}>hello</div>
        ))}
      </SortableContainer>
    </EditorSection>
  );
}
