import { cn } from '@/lib/utils';
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ClassValue } from 'clsx';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export type SortableContainerContext<ActiveItem = SortableContainerItem> = {
  activeItem?: ActiveItem;
};

const SortableContainerContext = createContext<SortableContainerContext>({
  activeItem: undefined,
});

export const useSortableContainerContext = <
  ActiveItem = SortableContainerItem,
>() =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useContext<SortableContainerContext<ActiveItem>>(SortableContainerContext);

export type SortableContainerItem =
  | UniqueIdentifier
  | {
      id: UniqueIdentifier;
    };

type SortableContainerProps = {
  children: ReactNode;
  items: SortableContainerItem[];
  renderDragOverlay(item: SortableContainerItem): ReactNode;
  itemsContainerClassName?: ClassValue;
  strategy?: SortingStrategy;
  onDragStart?(e: DragStartEvent): void;
  onDragMove?(e: DragMoveEvent): void;
  onDragOver?(e: DragOverEvent): void;
  onDragCancel?(e: DragCancelEvent): void;
  onDragEnd?(e: DragEndEvent): void;
};

export function SortableContainer({
  children,
  items,
  renderDragOverlay,
  itemsContainerClassName,
  strategy = verticalListSortingStrategy,
  onDragStart,
  onDragMove,
  onDragOver,
  onDragCancel,
  onDragEnd,
}: SortableContainerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [activeItemId, setActiveItemId] = useState<
    UniqueIdentifier | undefined
  >(undefined);

  const getItemId = (item: SortableContainerItem) => {
    if (typeof item === 'object') return item.id;
    return item;
  };

  const activeItem = useMemo(
    () => items.find((item) => getItemId(item) === activeItemId),
    [items, activeItemId]
  );

  const handleDragStart = (e: DragStartEvent) => {
    const itemId = getItemId(e.active);
    setActiveItemId(itemId);
    onDragStart?.(e);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    onDragMove?.(e);
  };

  const handleDragOver = (e: DragOverEvent) => {
    onDragOver?.(e);
  };

  const handleDragCancel = (e: DragCancelEvent) => {
    handleDragEnded();
    onDragCancel?.(e);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    handleDragEnded();
    onDragEnd?.(e);
  };

  const handleDragEnded = () => {
    setActiveItemId(undefined);
  };

  return (
    <SortableContainerContext.Provider
      value={{
        activeItem,
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={strategy}>
          <div
            className={cn(
              itemsContainerClassName
                ? itemsContainerClassName
                : 'flex flex-col gap-4'
            )}
          >
            {children}
          </div>

          <DragOverlay>
            {activeItem ? renderDragOverlay(activeItem) : undefined}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </SortableContainerContext.Provider>
  );
}
