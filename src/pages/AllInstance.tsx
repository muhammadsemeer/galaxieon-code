import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Card from "../components/Card/Card";
import getInstances from "../utils/getInstances";
import { useHistory } from "react-router-dom";
import { Instance } from "../types/templateAndInstance";
import CardLoading from "../components/Card/CardLoading";
import PageHeader from "../components/PageHeader/PageHeader";

const AllInstances = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const instances = useSelector((state: RootState) => state.instance);
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    instances.length === 0 && getInstances(history, dispatch, setLoading);
  }, []);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <PageHeader title="All Instances" />
      <div className="container">
        <div>
          <Row gutter={[25, 25]}>
            {!loading ? (
              <>
                <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={3}>
                <CardLoading isAdd />
                </Col>
                {instances.map((instance: Instance) => (
                  <Col
                    key={instance.id}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={6}
                    xxl={3}
                  >
                    <Card
                      cardId={instance.id}
                      style={{ width: "100%" }}
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
                ))}
              </>
            ) : (
              <CardLoading count={4} />
            )}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default AllInstances;
