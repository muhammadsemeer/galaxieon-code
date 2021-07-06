import React, { FC, useState } from "react";
import { Row, Col, Space } from "antd";
import StatCards, { Stats } from "../components/StatCards/StatCards";
import { CodeOutlined, UserOutlined, FileOutlined } from "@ant-design/icons";

let dummyData = [
  { title: "Users", value: 100 },
  { title: "Templates", value: 5 },
  { title: "Instances", value: 100 },
];

let icons = [<UserOutlined />, <FileOutlined />, <CodeOutlined />];

const AdminDash: FC = () => {
  const [stats, setStats] = useState<Stats[]>(dummyData);
  return (
    <main className="admin">
      <>
        <Row justify="space-around">
          {stats.map((stat, index) => (
            <Col span={6} key={stat.title}>
              <StatCards
                title={stat.title}
                value={stat.value}
                icon={icons[index]}
              />
            </Col>
          ))}
        </Row>
      </>
    </main>
  );
};

export default AdminDash;
