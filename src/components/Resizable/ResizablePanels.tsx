import React, {
  FC,
  MouseEvent,
  ReactNodeArray,
  useEffect,
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
  const [panels, setPanels] = useState([300, 300, 300]);

  const [currentDragger, setDragger] = useState<{
    isDragging: boolean;
    dragger: number | null;
    initialPos: number | null;
  }>({
    isDragging: false,
    dragger: null,
    initialPos: null,
  });

  const startResize = (e: MouseEvent<HTMLDivElement>, index: number) => {
    setDragger({
      isDragging: true,
      dragger: index,
      initialPos: e.clientX,
    });
  };

  const handleResize = (e: MouseEvent<HTMLDivElement>) => {
    const { isDragging, dragger, initialPos } = currentDragger;
    if (isDragging && dragger && initialPos) {
      let dargTo = e.clientX - initialPos;
      let newPanels = [...panels];
      let newWidth = (newPanels[dragger - 1] || 0) + dargTo;
      let adjacentWidth = (newPanels[dragger] || 0) - dargTo;
      let minWidth = minConstrains[dragger - 1] || 100;
      let adjMinWidth = minConstrains[dragger] || 100;
      if (minWidth <= newWidth && adjMinWidth <= adjacentWidth) {
        newPanels[dragger] = adjacentWidth;
        newPanels[dragger - 1] = newWidth;

        setDragger({ ...currentDragger, initialPos: e.clientX });
        setPanels((current) => newPanels);
      }
    }
  };

  const stopResize = (e: MouseEvent<HTMLDivElement>) => {
    setDragger({
      isDragging: false,
      dragger: null,
      initialPos: null,
    });
  };

  useEffect(() => {
    setPanels(constrains);
  }, [constrains]);

  return (
    <div
      className={styles.container}
      style={{ height }}
      onMouseLeave={stopResize}
      onMouseUp={(e) => currentDragger.dragger && stopResize(e)}
    >
      {children
        .filter((value) => value !== false)
        .map((child, index) => (
          <div
            className={styles.resize}
            key={(Date.now() + Math.random() * 10).toString(16)}
            style={{ width: panels[index] }}
            onMouseMove={(e) => currentDragger.dragger && handleResize(e)}
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

export default ResizablePanels;
