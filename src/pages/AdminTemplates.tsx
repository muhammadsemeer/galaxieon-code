import React, { FC, useEffect, useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import { Template } from "../types/templateAndInstance";
import axios from "../api/index";
import { AxiosResponse, AxiosError } from "axios";
import handleError from "../utils/Error";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TableColumnType, Tag } from "antd";
import tableSearch from "../utils/tableSearch";

const AdminTemplates: FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/template")
      .then((res: AxiosResponse) => {
        setTemplates(
          res.data.map(({ id, status, ...rest }: Template) => ({
            key: id,
            id,
            status: status ? "Active" : "Inactive",
            ...rest,
          }))
        );
      })
      .catch((err: AxiosError) => handleError(err, history, dispatch, true));
  }, []);

  let columns: TableColumnType<any>[] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      ...tableSearch("name"),
      width: "20%",
    },
    {
      title: "Languages",
      key: "language",
      dataIndex: "language",
      ...tableSearch("language"),
      width: "20%",
      render: (text: string) => {
        let colurs = [
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
        let tags = text.split(",").map((value) => {
          return (
            <Tag
              key={value + text}
              color={colurs[Math.floor(Math.random() * colurs.length)]}
            >
              {value}
            </Tag>
          );
        });
        return tags;
      },
    },
    {
      title: "Used",
      key: "used",
      dataIndex: "used",
      width: "5%",
      sorter: (a, b) => a.used - b.used,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "5%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  return (
    <main className="admin table">
      <DataTable columns={columns} datas={templates} />
    </main>
  );
};

export default AdminTemplates;
