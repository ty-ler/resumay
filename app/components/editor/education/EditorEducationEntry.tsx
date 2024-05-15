import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { useEducationStore } from '@/lib/stores/education.store';
import { EducationEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Form } from '@remix-run/react';
import { ClassValue } from 'clsx';
import { GripVertical, Trash2 } from 'lucide-react';
import { ChangeEvent, MouseEvent, useState } from 'react';
import EditorFormField from '../EditorFormField';

type EditorEducationEntryProps = {
  index: number;
  entry: EducationEntry;
  className?: ClassValue;
  buttonClassName?: ClassValue;
};

export default function EditorEducationEntry({
  index,
  entry,
  className,
  buttonClassName,
}: EditorEducationEntryProps) {
  const store = useEducationStore();

  const [startDate, setStartDate] = useState(
    entry.dateRange.startDate ? new Date(entry.dateRange.startDate) : undefined
  );

  const [endDate, setEndDate] = useState(
    entry.dateRange.endDate ? new Date(entry.dateRange.endDate) : undefined
  );

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

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
      }
    : undefined;

  const handleClickRemoveButton = (e: MouseEvent<HTMLButtonElement>) => {
    store.removeSection(index);
  };

  const handleChangeSchoolName = (e: ChangeEvent<HTMLInputElement>) => {
    store.setSchoolName(index, e.target.value);
  };

  const handleChangeSchoolLocation = (e: ChangeEvent<HTMLInputElement>) => {
    store.setSchoolLocation(index, e.target.value);
  };

  const handleChangeSchoolDegree = (e: ChangeEvent<HTMLInputElement>) => {
    store.setSchoolDegree(index, e.target.value);
  };

  const handleChangeSchoolMajor = (e: ChangeEvent<HTMLInputElement>) => {
    store.setSchoolMajor(index, e.target.value);
  };

  const handleChangeSchoolGPA = (e: ChangeEvent<HTMLInputElement>) => {
    let value: number | undefined = e.target.valueAsNumber;
    if (isNaN(value)) {
      value = undefined;
    }

    store.setSchoolGPA(index, value);
  };

  const handleChangeStartDate = (date: Date | undefined) => {
    store.setSchoolStartDate(index, date);
  };

  const handleChangeEndDate = (date: Date | undefined) => {
    store.setSchoolEndDate(index, date);
  };

  return (
    <div ref={setNodeRef} className="flex gap-4 w-full" style={style}>
      <div className="py-4">
        <button
          {...listeners}
          {...attributes}
          className={cn(
            'cursor-grab transition hover:text-primary focus:outline-primary',
            buttonClassName
          )}
        >
          <GripVertical size={32} />
        </button>
      </div>
      <Form
        className={cn(
          'flex flex-col gap-4 p-4 w-full border rounded bg-background z-10',
          {
            'border-primary !cursor-grab z-20': isDragging,
          },
          className
        )}
      >
        <div className="flex flex-col gap-4">
          <EditorFormField
            label="School Name"
            htmlFor={`${entry.id}-school-name`}
          >
            <Input
              id={`${entry.id}-school-name`}
              value={entry.schoolName}
              onChange={handleChangeSchoolName}
            />
          </EditorFormField>

          <EditorFormField
            label="School Location"
            htmlFor={`${entry.id}-school-location`}
          >
            <Input
              id={`${entry.id}-school-location`}
              value={entry.location}
              onChange={handleChangeSchoolLocation}
            />
            {/* <DatePicker onSelect={(date) => handleChangeSchoolLocation()}>
                </DatePicker> */}
          </EditorFormField>

          <EditorFormField label="Degree" htmlFor={`${entry.id}-degree`}>
            <Input
              id={`${entry.id}-degree`}
              value={entry.degree}
              onChange={handleChangeSchoolDegree}
            />
          </EditorFormField>

          <EditorFormField label="Major" htmlFor={`${entry.id}-major`}>
            <Input
              id={`${entry.id}-major`}
              value={entry.major}
              onChange={handleChangeSchoolMajor}
            />
          </EditorFormField>

          <EditorFormField label="GPA" htmlFor={`${entry.id}-gpa`}>
            <Input
              type="number"
              id={`${entry.id}-gpa`}
              placeholder="3.2"
              min={0}
              step={0.1}
              value={entry.gpa ?? ''}
              onChange={handleChangeSchoolGPA}
            />
          </EditorFormField>

          <EditorFormField
            label="Start Date"
            htmlFor={`${entry.id}-start-date`}
          >
            <DatePicker
              type="month"
              id={`${entry.id}-start-date`}
              date={
                entry.dateRange.startDate
                  ? new Date(entry.dateRange.startDate)
                  : undefined
              }
              onSelect={handleChangeStartDate}
            ></DatePicker>
          </EditorFormField>

          <EditorFormField label="End Date" htmlFor={`${entry.id}-end-date`}>
            <DatePicker
              type="month"
              id={`${entry.id}-end-date`}
              date={
                entry.dateRange.endDate
                  ? new Date(entry.dateRange.endDate)
                  : undefined
              }
              onSelect={handleChangeEndDate}
            ></DatePicker>
          </EditorFormField>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={(e) => handleClickRemoveButton(e)}
          >
            <Trash2 size={16} />
            Remove
          </Button>
        </div>
      </Form>
    </div>
  );
}
