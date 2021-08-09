import React, {
  createRef,
  FC,
  memo,
  MouseEvent,
  ReactNodeArray,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./resize.module.scss";

export interface ResizablePanelsProps {
  constrains: number[];
  minConstrains: number[];
  children: ReactNodeArray;
  height?: number | string;
}

const ResizablePanels: FC<ResizablePanelsProps> = ({
  constrains,
  minConstrains,
  children,
  height,
}) => {
  const currentDragger = useRef<{
    isDragging: boolean;
    dragger: number | null;
    initialPos: number | null;
  }>({
    isDragging: false,
    dragger: null,
    initialPos: null,
  });

  const width = useRef<number[]>(constrains);

  let resizablePanels = useRef<RefObject<HTMLDivElement>[]>([]);

  resizablePanels.current = children.map((child, index) => createRef());

  const startResize = (e: MouseEvent<HTMLDivElement>, index: number) => {
    currentDragger.current = {
      isDragging: true,
      dragger: index,
      initialPos: e.clientX,
    };
  };

  const handleResize = (e: MouseEvent<HTMLDivElement>) => {
    const { isDragging, dragger, initialPos } = currentDragger.current;
    if (isDragging && dragger && initialPos) {
      let dargTo = initialPos - e.clientX;
      const currentElem = resizablePanels.current[dragger - 1].current;
      const adjElem = resizablePanels.current[dragger].current;

      if (currentElem?.style && adjElem?.style) {
        let newWidth = currentElem?.getBoundingClientRect().width - dargTo;
        let adjacentWidth = adjElem?.getBoundingClientRect().width + dargTo;
        if (minConstrains[dragger - 1] <= newWidth) {
          width.current[dragger - 1] = newWidth;
          width.current[dragger] = adjacentWidth;
          currentElem.style.width = `${newWidth}px`;
          adjElem.style.width = `${adjacentWidth}px`;
        }

        currentDragger.current.initialPos = e.clientX;
      }
    }
  };

  const stopResize = (e: MouseEvent<HTMLDivElement>) => {
    currentDragger.current = {
      isDragging: false,
      dragger: null,
      initialPos: null,
    };
  };

  useEffect(() => {
    width.current = constrains;
    constrains.forEach((constrain, index) => {
      let elem = resizablePanels.current[index].current;
      if (elem?.style) {
        elem.style.width = `${constrain}px`;
      }
    });
  }, [constrains]);

  return (
    <div
      className={styles.container}
      style={{ height }}
      onMouseLeave={(e) => currentDragger.current.dragger && stopResize(e)}
      onMouseUp={(e) => currentDragger.current.dragger && stopResize(e)}
    >
      {children
        .filter((value) => value !== false)
        .map((child, index) => (
          <div
            ref={resizablePanels.current[index]}
            className={styles.resize}
            key={(Date.now() + Math.random() * 10).toString(16)}
            style={{
              minWidth: minConstrains[index],
            }}
            onMouseMove={(e) =>
              currentDragger.current.dragger && handleResize(e)
            }
          >
            <div className={styles.panel}>{child}</div>
            {index !== 0 && (
              <div
                className={styles.resizer}
                onMouseDown={(e) => startResize(e, index)}
              ></div>
            )}
          </div>
        ))}
    </div>
  );
};

export default memo(ResizablePanels);
