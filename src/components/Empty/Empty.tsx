import React, { FC, useState } from "react";
import { Button, Empty as AntEmpty } from "antd";
import CreateModal from "../CreateModal/CreateModal";

export interface EmptyProps {
  height?: number | string;
  create?: boolean;
}

const Empty: FC<EmptyProps> = ({ height, create }) => {
  const [isModalUp, setModalUp] = useState(false);
  return (
    <div
      className="flex middle"
      style={{ height: height ? height : "calc(100vh - 300px)" }}
    >
      <AntEmpty image={AntEmpty.PRESENTED_IMAGE_SIMPLE}>
        {create && (
          <>
            <Button onClick={() => setModalUp(true)} type="primary">Create New Instance</Button>
            <CreateModal
              visible={isModalUp}
              onCancel={() => setModalUp(false)}
            />
          </>
        )}
      </AntEmpty>
    </div>
  );
};

export default Empty;
