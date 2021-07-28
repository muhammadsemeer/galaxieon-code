import React, { FC } from "react";
import { Button, Empty as AntEmpty } from "antd";

export interface EmptyProps {
  height?: number | string;
  create?: boolean;
}

const Empty: FC<EmptyProps> = ({ height, create }) => {
  return (
    <div
      className="flex middle"
      style={{ height: height ? height : "calc(100vh - 300px)" }}
    >
      <AntEmpty image={AntEmpty.PRESENTED_IMAGE_SIMPLE}>
        {create && <Button type="primary">Create New Instance</Button>}
      </AntEmpty>
    </div>
  );
};

export default Empty;
