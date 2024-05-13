import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { addYears, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, createContext, useState } from 'react';
import { Button } from './button';

type MonthPickerContext = {
  selected: Date;
};

const MonthPickerContext = createContext<MonthPickerContext>({
  selected: new Date(),
});

type MonthPickerNavButtonProps = {
  ariaLabel: string;
  disabled: boolean;
  renderIcon(): ReactNode;
  onClick(): void;
};

function MonthPickerNavButton({
  ariaLabel,
  disabled,
  renderIcon,
  onClick,
}: MonthPickerNavButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      disabled={disabled}
      aria-label={ariaLabel}
      className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      onClick={onClick}
    >
      {renderIcon()}
    </Button>
  );
}

type MonthPickerButtonProps = {
  month: string;
  monthIndex: number;
  year: number;
  active: boolean;
  onClick: () => void;
};

function MonthPickerButton({
  month,
  monthIndex,
  year,
  active,
  onClick,
}: MonthPickerButtonProps) {
  const date = new Date(year, monthIndex, 1);
  const formattedDate = format(date, 'MMMM y');

  return (
    <Button
      variant="ghost"
      className={cn({
        '!bg-primary': active,
      })}
      aria-label={`Choose ${formattedDate}`}
      onClick={onClick}
    >
      {month}
    </Button>
  );
}

type MonthPickerProps = {
  selected?: Date;
  className?: ClassValue;
  onSelect: (date: Date) => void;
};

export default function MonthPicker({
  selected,
  className,
  onSelect,
}: MonthPickerProps) {
  const [_selected, setSelected] = useState(selected ?? new Date());
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const prevYearButtonDisabled = _selected.getFullYear() < 1;
  const nextYearButtonDisabled =
    _selected.getFullYear() > Number.MAX_SAFE_INTEGER;

  const incrementYear = (amount: number) => {
    const newDate = addYears(_selected, amount);
    setSelected(newDate);

    onSelect(newDate);
  };

  const handleClickMonthButton = (monthIndex: number) => {
    const newDate = new Date(_selected);
    newDate.setMonth(monthIndex);
    newDate.setDate(1);

    setSelected(newDate);

    onSelect(newDate);
  };

  return (
    <MonthPickerContext.Provider
      value={{
        selected: _selected,
      }}
    >
      <div className={cn('flex flex-col gap-4 p-4', className)}>
        <div className="flex justify-between items-center gap-2">
          <MonthPickerNavButton
            ariaLabel="Go to previous year"
            disabled={prevYearButtonDisabled}
            renderIcon={() => <ChevronLeft className="w-4 h-4" />}
            onClick={() => incrementYear(-1)}
          />
          <div className="text-sm font-medium">{_selected?.getFullYear()}</div>
          <MonthPickerNavButton
            ariaLabel="Go to next year"
            disabled={nextYearButtonDisabled}
            renderIcon={() => <ChevronRight className="w-4 h-4" />}
            onClick={() => incrementYear(1)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, monthIndex) => (
            <MonthPickerButton
              month={month}
              monthIndex={monthIndex}
              year={_selected.getFullYear()}
              active={_selected.getMonth() === monthIndex}
              key={monthIndex}
              onClick={() => handleClickMonthButton(monthIndex)}
            />
          ))}
        </div>
      </div>
    </MonthPickerContext.Provider>
  );
}
