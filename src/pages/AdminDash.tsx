import React, { FC, useEffect, useState } from "react";
import { Row, Col, Space } from "antd";
import StatCards, { Stats } from "../components/StatCards/StatCards";
import { CodeOutlined, UserOutlined, FileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "../api/index";
import { AxiosResponse } from "axios";
import handleError from "../utils/Error";
import { useHistory } from "react-router-dom";

let dummyData = [
  { title: "Users", value: 100 },
  { title: "Templates", value: 5 },
  { title: "Instances", value: 100 },
];

let icons = [<UserOutlined />, <FileOutlined />, <CodeOutlined />];

const AdminDash: FC = () => {
  const [stats, setStats] = useState<Stats[]>(dummyData);

  const collapsed = useSelector((state: RootState) => state.collapsed);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/admin/stats")
      .then((res: AxiosResponse<Stats[]>) => {
        setStats(res.data);
      })
      .catch((err) => {
        handleError(err, history, dispatch, true);
      });
  }, []);

  return (
    <main className={`admin p-left ${collapsed && "collapsed"}`}>
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
