import React, {
  FC,
  MouseEvent,
  ReactNodeArray,
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
  const [panels, setPanels] = useState(constrains);

  const [currentDragger, setDragger] = useState({
    isDragging: false,
    dragger: -1,
    initialPos: -1,
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
    if (isDragging) {
      let dargTo = e.clientX - initialPos;
      let newPanels = [...panels];
      let newWidth = (newPanels[dragger - 1] || 0) + dargTo;
      let adjacentWidth = (newPanels[dragger] || 0) - dargTo;
      minConstrains[dragger - 1] = minConstrains[dragger - 1]
        ? minConstrains[dragger - 1]
        : 50;
      if (minConstrains[dragger - 1] <= newWidth) {
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
      dragger: -1,
      initialPos: -1,
    });
  };

  return (
    <div
      className={styles.container}
      style={{ height }}
      onMouseLeave={stopResize}
      onMouseUp={stopResize}
    >
      {children.map((child, index) => (
        <div
          className={styles.resize}
          key={(Date.now() + Math.random() * 10).toString(16)}
          style={{ width: panels[index], minWidth: minConstrains[index] || 50 }}
          onMouseMove={handleResize}
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
