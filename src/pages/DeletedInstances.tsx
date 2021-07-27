import { Col, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Card from "../components/Card/Card";
import { useHistory } from "react-router-dom";
import { Instance } from "../types/templateAndInstance";
import CardLoading from "../components/Card/CardLoading";
import PageHeader from "../components/PageHeader/PageHeader";
import axios from "../api/index";
import handleError from "../utils/Error";
import { AxiosError, AxiosResponse } from "axios";

const DeletedInstances: FC = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const dispatch = useDispatch();
  const history = useHistory();
  const [instances, setInstances] = useState<Instance[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/instance/deleted")
      .then((response: AxiosResponse<Instance[]>) => {
        setInstances(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        handleError(err, history, dispatch, false);
      });
  }, []);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <PageHeader title="Deleted Instances" />
      <div className="container">
        <div>
          <Row gutter={[25, 25]}>
            {!loading ? (
              <>
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
                        description: instance.deletedAt,
                        views: instance.views,
                        likes: instance.likes,
                        shares: instance.shares,
                        forks: instance.forks,
                        keywords: instance.keywords,
                      }}
                      drawer
                      deleted
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

export default DeletedInstances;
