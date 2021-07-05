import React, { FC, useEffect, useState } from "react";
import { User } from "../types/auth";
import axios from "../api/index";
import { AxiosResponse, AxiosError } from "axios";
import DataTable from "../components/DataTable/DataTable";
import { Avatar, Button, Space, TableColumnType, Spin } from "antd";
import tableSearch from "../utils/tableSearch";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth/authSlice";
import { LoadingOutlined } from "@ant-design/icons";

const AdminUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleError = ({ response }: AxiosError) => {
    if (!response)
      return history.push("/error", {
        status: "error",
        title: "Network Disconnect",
        subTitle: "Make Sure Your Device is Connected",
      });
    if (response?.status !== 401)
      return history.push("/error", {
        status: response?.status,
        title: response?.statusText,
        ...response?.data,
      });
    dispatch(logOut("admin"));
    history.push("/admin/login");
  };

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res: AxiosResponse) => {
        setUsers(
          res.data.map(({ id, createdAt, ...rest }: User) => ({
            key: id,
            id,
            createdAt: new Date(createdAt as Date).toLocaleDateString("en-IN"),
            ...rest,
          }))
        );
        setLoading(false);
      })
      .catch(handleError);
  }, []);

  const changeUserStatus = (
    status: "active" | "block" | "delete",
    id: string
  ) => {
    console.log({ status, id });
  };

  let columns: TableColumnType<any>[] = [
    {
      title: "Image",
      dataIndex: "profileImage",
      key: "profileImage",
      width: "5%",
      render: (image: string) => <Avatar size="large" src={image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...tableSearch("name"),
    },
    {
      title: "Email / Username",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...tableSearch("email"),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      width: "5%",
      sorter: (a, b) => a.followers - b.followers,
    },
    {
      title: "Following",
      dataIndex: "following",
      key: "following",
      width: "5%",
      sorter: (a, b) => a.following - b.following,
    },
    {
      title: "Auth",
      dataIndex: "authType",
      key: "authType",
      width: "5%",
      filters: [
        {
          text: "google",
          value: "google",
        },
        {
          text: "github",
          value: "github",
        },
      ],
      onFilter: (value, record) => record.authType.indexOf(value) === 0,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "5%",
      filters: [
        {
          text: "active",
          value: "active",
        },
        {
          text: "blocked",
          value: "blocked",
        },
        {
          text: "deleted",
          value: "deleted",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "5%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: void, record: User) => {
        return (
          <Space direction="vertical" size="middle">
            {record.status !== "active" && (
              <Button
                type="primary"
                onClick={() => changeUserStatus("active", record.id)}
              >
                Active
              </Button>
            )}
            {record.status !== "blocked" && (
              <Button
                type="primary"
                onClick={() => changeUserStatus("block", record.id)}
              >
                Block
              </Button>
            )}
            {record.status !== "deleted" && (
              <Button
                type="primary"
                danger
                onClick={() => changeUserStatus("delete", record.id)}
              >
                Delete
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <main
      style={{
        padding: "75px 10px 10px 260px",
      }}
    >
      {isLoading ? (
        <Spin
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "80vh",
          }}
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      ) : (
        <Space
          direction="vertical"
          size="large"
          style={{ marginTop: "10px", textAlign: "right" }}
        >
          <Button
            type="primary"
            onClick={() => history.push("/admin/create/user")}
          >
            Create
          </Button>
          <DataTable coloums={columns} datas={users} />
        </Space>
      )}
    </main>
  );
};

export default AdminUsers;
