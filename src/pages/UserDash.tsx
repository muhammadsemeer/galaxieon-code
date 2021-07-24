import { Affix, Divider, PageHeader, Space, Typography } from "antd";
import React, { useRef, MutableRefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styles from "../styles/card.module.scss";
import Card from "../components/Card/Card";

const arr: JSX.Element[] = [];

for (let i = 0; i < 6; i++) {
  arr.push(
    <Card
      cardId={i.toString(16)}
      className={styles.card}
      title="My Sample Web"
      content={{
        description: "Sample Web Page Created",
        views: 10,
        likes: 5,
        shares: 2,
        forks: 1,
        keywords: "HTML,CSS,JS",
      }}
    />
  );
}

const UserDash = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <Affix offsetTop={75}>
        <PageHeader title="Dashboard" style={{ background: "#151515" }} />
        <Divider style={{ margin: "0" }} />
      </Affix>
      <div className={styles.container}>
        <Typography.Title level={5}>
          Recently Modified Instances
        </Typography.Title>
        <div className={styles.cards}>
          <Space wrap size="large">{arr}</Space>
        </div>
      </div>
    </main>
  );
};

export default UserDash;
