import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { format as dateFormat, isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import MonthPicker from './MonthPicker';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type DatePickerProps = {
  onSelect: (date: Date | undefined) => void;
  type?: 'day' | 'month';
  date?: Date;
  id?: string;
  dayPickerClassName?: ClassValue;
  monthPickerClassName?: ClassValue;
};

export default function DatePicker({
  type = 'day',
  date,
  id,
  onSelect,
  dayPickerClassName,
  monthPickerClassName,
}: DatePickerProps) {
  const format = type === 'day' ? 'MM/dd/yyyy' : 'MM/yyyy';

  const [_date, setDate] = useState(date);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(
    _date ? dateFormat(_date, format) : ''
  );

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      setInputValue(dateFormat(day, format));
    } else {
      setDate(undefined);
      setInputValue('');
    }

    onSelect(day);
  };

  const showFocused = () => popoverOpen || inputFocused;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setDate(undefined);
      onSelect(undefined);
      setInputValue(value);
      return;
    }

    const parsedDate = parse(value, format, new Date());
    if (isValid(parsedDate)) {
      setDate(parsedDate);
      onSelect(parsedDate);
    }

    setInputValue(e.target.value);
  };

  const handleFocusInput = () => {
    setInputFocused(true);
  };

  const handleBlurInput = () => {
    setInputFocused(false);
  };

  return (
    <div
      className={cn('flex items-center border rounded', {
        'ring-2 ring-ring ring-offset-2 ring-offset-background': showFocused(),
      })}
    >
      <Input
        id={id ?? ''}
        value={inputValue}
        className="!border-none !ring-0 !ring-offset-0 rounded-none"
        onChange={handleChangeInput}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
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
