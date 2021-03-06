import React, { FC, useEffect, useState } from "react";
import { User } from "../types/auth";
import axios from "../api/index";
import { AxiosResponse, AxiosError } from "axios";
import DataTable from "../components/DataTable/DataTable";
import {
  Avatar,
  Button,
  Space,
  TableColumnType,
  Popconfirm,
  message,
} from "antd";
import tableSearch from "../utils/tableSearch";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import handleError from "../utils/Error";
import { RootState } from "../store";
import moment from "moment";

const AdminUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const collapsed = useSelector((state: RootState) => state.collapsed);

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res: AxiosResponse) => {
        setLoading(false);
        setUsers(
          res.data.map(({ id, ...rest }: User) => ({
            key: id,
            id,
            ...rest,
          }))
        );
      })
      .catch((error) => handleError(error, history, dispatch, true));
  }, []);

  const changeUserStatus = (
    status: "active" | "blocked" | "deleted",
    id: string
  ) => {
    let loading = message.loading("Loading", 0);
    axios
      .patch(`/admin/user/${id}?status=${status}`)
      .then(async (res: AxiosResponse) => {
        let updatedUsers = [...users];
        let index = users.findIndex((value) => value.id === id);
        updatedUsers[index].status = status;
        setUsers(updatedUsers);
        await loading();
        message.success(`User ${status} Succesfully`);
      })
      .catch(async (error: AxiosError) => {
        const { response } = error;
        if (!response || response.status !== 400)
          return handleError(error, history, dispatch, true);
        await loading();
        message.warn(response.data);
      });
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
      title: "Instances",
      dataIndex: "instances",
      key: "instances",
      width: "5%",
      sorter: (a, b) => a.instances - b.instances,
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
      render: (createdAt) =>
        new Date(createdAt as Date).toLocaleDateString("en-IN"),
      sorter: (a, b) =>
        moment(new Date(a.createdAt)).unix() -
        moment(new Date(b.createdAt)).unix(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: void, record: User) => {
        return (
          <Space direction="vertical" size="middle">
            {record.status !== "active" && (
              <Popconfirm
                title="Are you sure want to activate?"
                onConfirm={() => changeUserStatus("active", record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Active</Button>
              </Popconfirm>
            )}
            {record.status !== "blocked" && (
              <Popconfirm
                title="Are you sure want to block?"
                onConfirm={() => changeUserStatus("blocked", record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Block</Button>
              </Popconfirm>
            )}
            {record.status !== "deleted" && (
              <Popconfirm
                title="Are you sure want to delete?"
                onConfirm={() => changeUserStatus("deleted", record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <main className={`admin table p-left ${collapsed && "collapsed"}`}>
      <Space
        direction="vertical"
        size="large"
        style={{ marginTop: "10px", textAlign: "right", width: "100%" }}
      >
        <Button
          type="primary"
          onClick={() => history.push("/admin/create/user")}
        >
          Create
        </Button>
        <DataTable columns={columns} datas={users} loading={loading} />
      </Space>
    </main>
  );
};

export default AdminUsers;
