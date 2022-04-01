import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  MouseEvent,
} from "react";

interface IDraggable {
  children: any;
  id?: string;
  onDrag: any;
  onDragEnd: any;
  draggableRef: any;
}

const POSITION = { x: 0, y: 0 };

export const Draggable = ({
  children,
  id,
  onDrag,
  onDragEnd,
  draggableRef,
}: IDraggable) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleMouseDown = useCallback(
    ({ clientX, clientY }: MouseEvent<HTMLElement>) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      }));
    },
    []
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };

      setState((state) => ({
        ...state,
        translation,
      }));

      onDrag({ translation, clientX, clientY, id });
    },
    [state.origin, onDrag, id]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setState((state) => ({ ...state, translation: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  );

  return (
    <div
      ref={draggableRef}
      style={{ width: "fit-content" }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
