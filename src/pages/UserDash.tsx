import { Affix, Col, Divider, PageHeader, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import styles from "../styles/card.module.scss";
import Card from "../components/Card/Card";
import getInstances from "../utils/getInstances";
import { useHistory } from "react-router-dom";
import { Instance, InstanceMetaData } from "../types/templateAndInstance";
import CardLoading from "../components/Card/CardLoading";

const UserDash = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const instances = useSelector((state: RootState) => state.instance);
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    instances.length === 0 && getInstances(history, dispatch, setLoading);
  }, []);

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
          <Row gutter={[10, 10]}>
            {!loading ? (
              [...instances]
                .sort(
                  (a: Instance, b: Instance) =>
                    (new Date(b.lastEditied as string) as any) -
                    (new Date(a.lastEditied as string) as any)
                )
                .slice(0, 4)
                .map((instance: Instance) => (
                  <Col key={instance.id} sm={24} md={12} lg={8} xl={6} xxl={3}>
                    <Card
                      cardId={instance.id}
                      className={styles.card}
                      title={instance.name}
                      content={{
                        description: instance.description,
                        views: instance.views,
                        likes: instance.likes,
                        shares: instance.shares,
                        forks: instance.forks,
                        keywords: instance.keywords,
                      }}
                      drawer
                    />
                  </Col>
                ))
            ) : (
              <CardLoading count={4} />
            )}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default UserDash;
