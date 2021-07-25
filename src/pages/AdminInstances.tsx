import React, { FC, useEffect, useState } from "react";
import { Instance } from "../types/templateAndInstance";
import axios from "../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../utils/Error";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable/DataTable";
import { TableColumnType, Tag } from "antd";
import tableSearch from "../utils/tableSearch";
import { RootState } from "../store";

const AdminInstances: FC = () => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.collapsed);

  useEffect(() => {
    axios
      .get("/instance/all")
      .then((response: AxiosResponse) => {
        setLoading(false);
        setInstances(
          response.data.map(({ User, ...rest }: Instance) => ({
            ...rest,
            owner: User?.name,
          }))
        );
      })
      .catch((err: AxiosError) => {
        handleError(err, history, dispatch, true);
      });
  }, []);

  const columns: TableColumnType<any>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...tableSearch("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      ...tableSearch("keywords"),
      render: (text: string) => {
        let colors = [
          "magenta",
          "red",
          "volcano",
          "orange",
          "gold",
          "lime",
          "green",
          "cyan",
          "blue",
          "geekblue",
          "purple",
        ];
        let tags = text?.split(",")?.map((value) => {
          return (
            <Tag
              key={value + text}
              color={colors[Math.floor(Math.random() * colors.length)]}
            >
              {value}
            </Tag>
          );
        });
        return tags;
      },
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      sorter: (a, b) => a.likes - b.likes,
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      sorter: (a, b) => a.shares - b.shares,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      ...tableSearch("owner"),
    },
  ];

  return (
    <main className={`admin table p-left ${collapsed && "collapsed"}`}>
      <DataTable columns={columns} datas={instances} loading={loading} />
    </main>
  );
};

export default AdminInstances;
