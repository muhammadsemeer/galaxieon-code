import { Affix, Col, Divider, PageHeader, Row, Space, Typography } from "antd";
import React, { useRef, MutableRefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styles from "../styles/card.module.scss";
import Card from "../components/Card/Card";

const arr: JSX.Element[] = [];

for (let i = 0; i < 6; i++) {
  arr.push(
    <Col key={i} sm={24} md={12} lg={8} xl={6} xxl={3}>
      <Card
        cardId={i.toString(16)}
        className={styles.card}
        title="My Sample Web"
        content={{
          description: " Sample Web Page Created".repeat(i),
          views: 10,
          likes: 5,
          shares: 2,
          forks: 1,
          keywords: "HTML,CSS,JS",
        }}
      />
    </Col>
  );
}

const UserDash = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <Affix offsetTop={50}>
        <PageHeader title="Dashboard" style={{ background: "#151515" }} />
        <Divider style={{ margin: "0" }} />
      </Affix>
      <div className={styles.container}>
        <Typography.Title level={5}>
          Recently Modified Instances
        </Typography.Title>
        <div className={styles.cards}>
          <Row wrap gutter={[10, 10]}>
            {arr}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default UserDash;
