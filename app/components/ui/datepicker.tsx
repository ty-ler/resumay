import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { format as dateFormat } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import MonthPicker from './MonthPicker';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type DatePickerProps = {
  type?: 'day' | 'month';
  date?: Date;
  id?: string;
  format?: string;
  onSelect?: (date: Date) => void;
  dayPickerClassName?: ClassValue;
  monthPickerClassName?: ClassValue;
};

export default function DatePicker({
  type = 'day',
  date,
  id,
  format,
  onSelect,
  dayPickerClassName,
  monthPickerClassName,
}: DatePickerProps) {
  const [_date, setDate] = useState(date);
  const [popoverOpen, setPopoverOpen] = useState(false);

  format = format ?? 'MM/yyyy';

  const handleSelect = (day: Date | undefined) => {
    setDate(day);

    if (onSelect && day) {
      onSelect(day);
    }
  };

  const handleClickInput = (e: React.MouseEvent) => {
    setPopoverOpen(true);
  };

  const handleFocusInput = () => {
    setPopoverOpen(true);
  };

  const handleBlurInput = () => {};

  const showFocused = () => popoverOpen;
  const displayedValue = () => {
    if (!_date) {
      return '';
    }

    return dateFormat(_date, format);
  };

  return (
    <div
      className={cn('flex items-center border rounded', {
        'ring-2 ring-ring ring-offset-2 ring-offset-background': showFocused(),
      })}
    >
      <Input
        id={id ?? ''}
        value={displayedValue()}
        className="!border-none !ring-0 !ring-offset-0 rounded-none"
        onClick={handleClickInput}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        readOnly
      />
      <Popover modal open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex justify-center items-center w-8 h-8 mr-1"
          >
            <CalendarIcon size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {type === 'day' ? (
            <Calendar
              initialFocus
              mode="single"
              selected={_date}
              defaultMonth={_date}
              className={cn(dayPickerClassName)}
              onSelect={handleSelect}
            />
          ) : (
            <MonthPicker
              selected={_date}
              onSelect={handleSelect}
              className={cn('w-[275px]', monthPickerClassName)}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
