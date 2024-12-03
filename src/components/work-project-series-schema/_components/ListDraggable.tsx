import { DispatchState } from '@/types';
import { ReactNode, useCallback } from 'react';
import { useDraggableListContext } from '@/hooks/useDraggableListContext';
import { useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';

type InnerProps = {
  isDragging?: boolean;
  isOver?: boolean;
  index?: number;
};

export function ListDraggable({
  index,
  onChange,
  children
}: {
  index: number;
  onChange?: DispatchState<any[]>;
  children?: (props: InnerProps) => ReactNode;
}) {
  const listContext = useDraggableListContext(index);

  const dropCallback = useCallback((...params) => {
    console.log(params);
  }, []);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.LIST_DRAGGABLE,
    collect: (monitor) => ({
      isDragging: monitor.getItem().index === index
    }),
    item: listContext
  }));

  const [{ isOver }, drop] = useDrop<{ listName: string; index: number }>({
    accept: DragTypes.LIST_DRAGGABLE,
    drop: dropCallback,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.getItem().listName === listContext.listName,
      currentItem: monitor.getItem(),
      currentItemType: monitor.getItemType()
    })
  });

  const Inner = children ? children : DefaultInner;

  return drop(
    <div>
      {drag(
        <div>
          {<Inner index={index} isDragging={isDragging} isOver={isOver} />}
        </div>
      )}
    </div>
  );
}

function DefaultInner(props: InnerProps) {
  return <div>{props.index}</div>;
}
