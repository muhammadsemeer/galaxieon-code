import { Drawer, Input, Form, Tag, Space, Button } from "antd";
import React, { FC, KeyboardEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { InstanceMetaData } from "../../types/templateAndInstance";

type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface FormDrawerProps {
  data: InstanceMetaData;
  onClose: (e: EventType) => void;
  visible: boolean;
}

const FormDrawer: FC<FormDrawerProps> = ({ data, onClose, visible }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [keywords, setKeywords] = useState(data.keywords?.split(","));
  const [form] = Form.useForm();

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

  const addTags: KeyboardEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    if (value && value !== " " && keywords?.indexOf(value) === -1) {
      setKeywords([...keywords, value]);
    }
  };

  const footer = (
    <Space size="middle">
      <Button type="primary" onClick={() => form.submit()}>Submit</Button>
      <Button type="default" onClick={onClose as MouseEventHandler<HTMLElement>}>Close</Button>
    </Space>
  );

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Drawer title="Edit Instance" visible={visible} width={width} footer={footer} onClose={onClose}>
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter user name" }]}
          initialValue={data.name}
        >
          <Input placeholder="Please enter user name" />
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
            <Input placeholder="Add Keywords" required onPressEnter={addTags} />
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormDrawer;
