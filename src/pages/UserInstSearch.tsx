import React, { FC, useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Card from "../components/Card/Card";
import getInstances from "../utils/instances";
import { useHistory } from "react-router-dom";
import { Instance } from "../types/templateAndInstance";
import CardLoading from "../components/Card/CardLoading";
import PageHeader from "../components/PageHeader/PageHeader";
import Empty from "../components/Empty/Empty";
import useQuery from "../utils/useQuery";
import Fuse from "fuse.js";

const UserInstSearch = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const instances = useSelector((state: RootState) => state.instance);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const options: Fuse.IFuseOptions<any> = {
    keys: ["name", "description", "keywords"],
    findAllMatches: true,
    includeMatches: true,
  };

  const searchTerm = query.get("query");

  const [loading, setLoading] = useState(false);

  const [searchResult, setSearchResult] = useState<Instance[]>([]);

  useEffect(() => {
    instances.length === 0 && getInstances(history, dispatch, setLoading);
  }, []);
  useEffect(() => {
    const fuse = new Fuse(instances, options);
    const result = fuse.search(searchTerm ?? "");
    console.log(result);
    setSearchResult(result.map(({ item }) => item));
  }, [searchTerm, instances]);

  return (
    <main className={`p-top p-left ${collapsed && "collapsed"} p-right`}>
      <PageHeader title={`Search results for ${searchTerm || ""}`} />
      <div className="container">
        <div>
          <Row gutter={[25, 25]}>
            {!loading ? (
              searchResult.map((instance: Instance) => (
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
              ))
            ) : (
              <CardLoading count={4} />
            )}
          </Row>
        </div>
        {!loading && searchResult.length === 0 && <Empty />}
      </div>
    </main>
  );
};

export default UserInstSearch;
