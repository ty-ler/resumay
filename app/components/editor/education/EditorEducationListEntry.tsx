import { useSortableContainerContext } from '@/components/dnd/SortableContainer';
import { Button } from '@/components/ui/button';
import { useEducationStore } from '@/lib/stores/education.store';
import { EducationEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavLink } from '@remix-run/react';
import { format } from 'date-fns';
import { GripVertical, Trash } from 'lucide-react';
import { MouseEvent, useState } from 'react';

type EditorEducationListEntryProps = {
  entry: EducationEntry;
  index: number;
};

export default function EditorEducationListEntry({
  entry,
  index,
}: EditorEducationListEntryProps) {
  const store = useEducationStore();

  const [focusedActions, setFocusedActions] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: entry.id,
  });

  const { activeItem } = useSortableContainerContext<EducationEntry>();

  const dragging = activeItem?.id === entry.id;

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
      }
    : undefined;

  const formatMonth = (date: string) => format(date, 'MM/yyyy');

  const handleFocusAction = () => {
    setFocusedActions(true);
  };

  const handleBlurAction = () => {
    setFocusedActions(false);
  };

  const handleClickDeleteEntry = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    store.removeSection(index);
  };

  return (
    <NavLink
      to={entry.id}
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative grid grid-cols-[auto_1fr] items-center h-full pr-2 bg-background border rounded transition-colors ring-primary outline-none  focus-visible:ring-2 ',
        {
          'border-primary': dragging,
        }
      )}
    >
      <button
        className={cn(
          'h-full p-2 rounded transition ring-primary outline-none  focus-visible:ring-2 hover:cursor-grab',
          {
            '!cursor-grabbing !text-primary': dragging,
          }
        )}
        onClick={(e) => e.preventDefault()}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={28} />
      </button>
      <div className="flex gap-6 text-sm w-full py-3">
        <div className="flex flex-col w-full">
          <div
            className={cn('font-medium', {
              'text-white/35': !entry.schoolName,
            })}
          >
            {entry.schoolName || 'School Name'}
          </div>
          <hr className="my-1" />
          <div className="flex items-center">
            <div
              className={cn('text-xs truncate', {
                'text-white/35': !entry.location,
              })}
            >
              {entry.location || 'Location'}
            </div>

            <div className="flex items-center h-full">
              <div className="bg-border w-[1px] h-3 mx-2"></div>
              <div
                className={cn('flex items-center gap-1 text-xs truncate', {
                  'text-white/35': !entry.degree,
                })}
              >
                {entry.degree || 'Degree'}
              </div>
            </div>

            {entry.dateRange.startDate && entry.dateRange.endDate ? (
              <div className="flex items-center h-full">
                <div className="bg-border w-[1px] h-3 mx-2"></div>
                <div className="flex items-center gap-1 text-xs">
                  <div className="truncate">
                    {formatMonth(entry.dateRange.startDate)}
                  </div>
                  <div>—</div>
                  <div className="truncate">
                    {formatMonth(entry.dateRange.endDate)}
                  </div>
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'absolute right-0 flex items-center gap-2 h-full px-2 opacity-0 bg-background transition before:absolute before:-left-8 before:w-8 before:h-full before:bg-gradient-to-l before:from-background before:to-background/0 group-hover:opacity-100',
          {
            '!opacity-0': dragging,
            '!opacity-100': focusedActions,
          }
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="flex justify-center items-center w-10 h-10 p-0 rounded-full"
          onFocus={handleFocusAction}
          onBlur={handleBlurAction}
          onClick={handleClickDeleteEntry}
        >
          <Trash size={16} />
        </Button>
      </div>
    </NavLink>
  );
}
