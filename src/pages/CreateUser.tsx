import React, { FC, useState } from "react";
import { Form, Input, Typography, Select, Button, Space } from "antd";
import styles from "../styles/form.module.scss";

const formItem = {
  google: {
    label: "Email :",
    name: "email",
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    placeHolder: "elonmusk@gmail.com",
  },
  github: {
    label: "Github Username :",
    name: "email",
    pattern: /([A-Za-z0-9])\w+/g,
    placeHolder: "elonmusk123",
  },
};


const CreateUser: FC = () => {
  const [emailOrUname, setEmailOrUname] = useState(formItem["google"]);

  const onSelectChange = (value: "google" | "github") => {
    setEmailOrUname(formItem[value]);
  };

  const onSubmit = (values: any) => {
    console.table(values);
  };

  return (
    <main className={`admin ${styles.container}`}>
      <Form
        name="create-user"
        className={styles.form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Typography.Title level={3}>Create User</Typography.Title>
        <Form.Item
          label="Name :"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input user's name!",
            },
          ]}
        >
          <Input placeholder="Elon Musk" className={styles.input} />
        </Form.Item>
        <Form.Item
          label="Type :"
          name="type"
          rules={[{ required: true, message: "Please Select Type" }]}
          initialValue="google"
        >
          <Select className={styles.input} onChange={onSelectChange}>
            <Select.Option value="google">Google</Select.Option>
            <Select.Option value="github">Github</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={emailOrUname.label}
          name={emailOrUname.name}
          rules={[
            {
              required: true,
              message: `Please input user's ${emailOrUname.label}`,
              pattern: emailOrUname.pattern,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={emailOrUname.placeHolder}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </main>
  );
};

export default CreateUser;
