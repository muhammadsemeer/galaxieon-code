import {
  EditOutlined,
  EyeOutlined,
  ForkOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  message,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateInstance } from "../../store/instance/editorInstance";
import { Instance } from "../../types/templateAndInstance";
import FormDrawer from "../FormDrawer/FormDrawer";
import { AxiosError, AxiosResponse } from "axios";
import axios from "../../api/index";
import handleError from "../../utils/Error";

const InstanceDetails: FC = () => {
  const instance = useSelector((state: RootState) => state.editorInstance);
  const user = useSelector((state: RootState) => state.auth.user);

  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();

  const onUpdate = (data: Instance) => {
    dispatch(updateInstance(data));
  };

  const updatePreviewAndSave = (
    checked: boolean,
    name: "autosave" | "autopreview"
  ) => {
    const data =
      name === "autosave"
        ? ({ autosave: checked } as Instance)
        : ({ autopreview: checked } as Instance);
    onUpdate(data);
    axios
      .put(`/instance/${instance.id}`, {
        [name]: checked,
      })
      .then((res: AxiosResponse<Instance>) => {
        onUpdate({ ...res.data, [name]: checked });
        message.success("Update instance success!");
      })
      .catch((err: AxiosError) => handleError(err, history, dispatch, false));
  };

  return (
    <div style={{ padding: 10, maxWidth: 250 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div className="flex justify-content-between">
          <Typography.Text>{instance?.name}</Typography.Text>
          {user?.id === instance.User?.id && (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setOpen(true)}
            />
          )}
        </div>
        {user?.id === instance.User?.id && (
          <Typography.Text type="secondary">
            {instance?.description || "Add Some Short Description"}
          </Typography.Text>
        )}
      </Space>
      <div className="flex" style={{ marginTop: 10 }}>
        <Avatar src={instance.User?.profileImage} shape="square" />
        <div
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            fontSize: 13,
          }}
        >
          <Typography.Text>{instance.User?.name}</Typography.Text>
          <Typography.Text type="secondary">
            {instance.User?.email.split("@")[0]}
          </Typography.Text>
        </div>
      </div>
      <div
        className="flex justify-content-between"
        style={{ marginTop: 15, maxWidth: 250 }}
      >
        <div>
          <LikeOutlined /> {instance.likes}
        </div>
        <div>
          <ShareAltOutlined /> {instance.shares}
        </div>
        <div>
          <ForkOutlined /> {instance.forks}
        </div>
        <div>
          <EyeOutlined /> {instance.views}
        </div>
      </div>
      <div className="flex" style={{ marginTop: 10 }}>
        {instance?.keywords?.split(",").map((keyword, index) => (
          <Tag key={keyword} color="blue">
            {keyword}
          </Tag>
        ))}
      </div>
      {user?.id === instance.User?.id && (
        <Space direction="vertical" style={{ marginTop: 15 }}>
          {/* <Typography.Text>
            AutoSave:{" "}
            <Switch
              size="small"
              checked={instance.autosave}
              onChange={(checked) => updatePreviewAndSave(checked, "autosave")}
            />
          </Typography.Text> */}
          <Typography.Text>
            AutoPreview:{" "}
            <Switch
              size="small"
              checked={instance.autopreview}
              onChange={(checked) =>
                updatePreviewAndSave(checked, "autopreview")
              }
            />
          </Typography.Text>
        </Space>
      )}
      {user?.id === instance.User?.id && (
        <FormDrawer
          data={{
            description: instance.description,
            name: instance.name,
            id: instance.id,
            keywords: instance.keywords,
            autosave: instance.autosave,
            autopreview: instance.autopreview,
          }}
          onClose={() => setOpen(false)}
          onUpdate={onUpdate}
          visible={isOpen}
        />
      )}
    </div>
  );
};

export default InstanceDetails;
