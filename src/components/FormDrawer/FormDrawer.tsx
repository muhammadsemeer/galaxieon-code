import { Drawer, Input, Form, Tag, Space, Button, message } from "antd";
import React, {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Instance, InstanceMetaData } from "../../types/templateAndInstance";
import axios from "../../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../../utils/Error";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateOneInstance } from "../../store/instance/instanceSlice";

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface FormDrawerProps {
  data: InstanceMetaData;
  onClose: (e: EventType) => void;
  onUpdate?: (data: Instance) => void;
  visible: boolean;
}

const FormDrawer: FC<FormDrawerProps> = ({
  data,
  onClose,
  visible,
  onUpdate,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [keywords, setKeywords] = useState(data.keywords?.split(",") ?? []);
  const [tag, setTag] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const changeDrawerWidth = () => {
    setWidth((current) => (window.innerWidth <= 768 ? window.innerWidth : 600));
  };

  useEffect(() => {
    changeDrawerWidth();
    window.addEventListener("resize", changeDrawerWidth);
    return () => {
      window.removeEventListener("resize", changeDrawerWidth);
    };
  }, []);

  const tagClose = (key: number) => {
    setKeywords(keywords?.filter((value, index) => index !== key));
  };

  const addTags: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (tag && tag !== " " && keywords?.indexOf(tag) === -1) {
      setKeywords([...keywords, tag]);
      setTag("");
    }
  };

  const footer = (
    <Space size="middle">
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
      <Button
        type="default"
        onClick={onClose as MouseEventHandler<HTMLElement>}
      >
        Close
      </Button>
    </Space>
  );

  const onSubmit = (values: any) => {
    axios
      .put(`/instance/${data.id}`, {
        ...values,
        keywords: keywords.length !== 0 ? keywords.toString() : null,
      })
      .then((res: AxiosResponse<Instance>) => {
        onUpdate && onUpdate(res.data);
        dispatch(updateOneInstance(res.data));
        message.success("Update instance success!");
        onClose({} as EventType);
      })
      .catch((err: AxiosError) => handleError(err, history, dispatch, false));
  };

  return (
    <Drawer
      title="Edit Instance"
      visible={visible}
      width={width}
      footer={footer}
      onClose={onClose}
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter Instance name" },
            { min: 3, message: "Name contains at least 3 characters" },
            {
              pattern: /^[A-Za-z0-9-]*$/g,
              message: "Name can only contains letters and number",
            },
          ]}
          initialValue={data.name}
        >
          <Input placeholder="Please enter Instance name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false }]}
          initialValue={data.description}
        >
          <Input.TextArea
            placeholder="Something about your instance"
            rows={5}
          />
        </Form.Item>
        <Form.Item label="Keywords" rules={[{ required: false }]}>
          <Space direction="vertical">
            <Space wrap>
              {keywords?.map((value, index) => (
                <Tag
                  key={value}
                  color="blue"
                  closable
                  onClose={() => tagClose(index)}
                >
                  {value}
                </Tag>
              ))}
            </Space>
            <Input
              placeholder="Add Keywords"
              required
              onPressEnter={addTags}
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormDrawer;
