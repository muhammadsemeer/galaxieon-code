import React, { FC, ReactNode, useState } from "react";
import {
  Card as AntCard,
  CardProps as AntCardProps,
  Space,
  Tag,
  Dropdown,
  Menu,
  message,
  Popconfirm,
  Button,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ForkOutlined,
  LikeOutlined,
  LockOutlined,
  MoreOutlined,
  ShareAltOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FormDrawer from "../FormDrawer/FormDrawer";
import axios from "../../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../../utils/Error";
import { useDispatch } from "react-redux";
import {
  addOneInstance,
  removeOneInstance,
} from "../../store/instance/instanceSlice";
import { Instance } from "../../types/templateAndInstance";
import logo from "../../logo.svg";

export interface CardProps extends AntCardProps {
  cardId: string;
  content: {
    description?: string;
    keywords?: string;
    views?: number;
    likes?: number;
    shares?: number;
    forks?: number;
  };
  drawer?: boolean;
  deleted?: boolean;
  onRetrieve?: (cardId: string) => void;
}

const Card: FC<CardProps> = ({
  cardId,
  title,
  content,
  drawer,
  deleted,
  style,
  onRetrieve,
  ...rest
}) => {
  const history = useHistory();
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  const length = content.description?.length;


  const deleteInstance = () => {
    const loading = message.loading("Deleting...", 0);
    axios
      .delete(`/instance/${cardId}`)
      .then((res: AxiosResponse<{ status: string; message: string }>) => {
        message.success(res.data.message);
        loading();
        dispatch(removeOneInstance(cardId));
      })
      .catch((error: AxiosError) => {
        loading();
        message.error("Deleting Filed");
        handleError(error, history, dispatch, false);
      });
  };

  const forkInstance = () => {
    const loading = message.loading("Forking...", 0);
    axios
      .get(`/instance/fork/${cardId}`)
      .then((res: AxiosResponse<Instance>) => {
        loading();
        console.log(res.data);
        message.success("Instance Successfully Forked");
        dispatch(addOneInstance(res.data));
        history.push(`/instance/editor/${res.data.id}`);
      })
      .catch((error: AxiosError) => {
        loading();
        message.error("Forking Failed");
        handleError(error, history, dispatch, false);
      });
  };

  const overlay: JSX.Element = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={() => setOpen(true)}>
          <EditOutlined /> Edit Instance
        </a>
      </Menu.Item>
      <Menu.Item key="2" disabled>
        <a href="#">
          <LockOutlined /> Make Private
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={forkInstance}>
          <ForkOutlined /> Fork Instance
        </a>
      </Menu.Item>
      <Menu.Item key="4">
        <Popconfirm
          title="Are you sure want to delete?"
          onConfirm={deleteInstance}
          okText="Yes"
          cancelText="No"
        >
          <a>
            <DeleteOutlined /> Delete Instance
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const extra: ReactNode | undefined = !deleted && (
    <Dropdown
      overlayStyle={{ zIndex: 9 }}
      overlay={overlay}
      trigger={["click"]}
    >
      <MoreOutlined />
    </Dropdown>
  );

  const retrieveInstance = () => {
    const loading = message.loading("Retrieving...", 0);
    axios
      .get(`/instance/retrive/${cardId}`)
      .then((res: AxiosResponse<Instance>) => {
        message.success("Instance Retrieved Successfully");
        loading();
        dispatch(addOneInstance(res.data));
        onRetrieve && onRetrieve(cardId);
      })
      .catch((error) => {
        loading();
        message.error("Retrieving Failed");
        handleError(error, history, dispatch, false);
      });
  };

  const [spinning, setSpinning] = useState(true);

  return (
    <>
      <AntCard
        hoverable
        {...rest}
        cover={
          <Spin
            indicator={<LoadingOutlined />}
            spinning={spinning}
            size="large"
          >
            <img
              style={{
                width: "100%",
                height: 125,
                padding: 10,
                paddingBottom: 0,
                objectFit: "cover",
              }}
              src={`${process.env.API_ENDPOINT}/instance/screenshot/${cardId}`}
              onError={(event) => {
                event.currentTarget.src = logo;
                event.currentTarget.style.objectFit = "contain";
              }}
              onLoad={(event) => setSpinning(false)}
            />
          </Spin>
        }
        onDoubleClick={() => history.push(`/instance/editor/${cardId}`)}
        bodyStyle={{ padding: "0px 24px 10px" }}
        style={{ height: 250, ...style }}
      >
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <AntCard.Meta
            title={
              <div className="flex justify-content-between align-center">
                <p style={{ margin: 0, fontSize: "13px" }}>{title}</p>
                {extra}
              </div>
            }
            description={
              deleted && (
                <>
                  <p>Deleted On:</p>
                  <p>
                    {new Date(content.description as string).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>
                  <p>Retrieve before:</p>
                  <p>
                    {new Date(
                      new Date(content.description as string).setDate(
                        new Date(content.description as string).getDate() + 3
                      )
                    ).toLocaleDateString("en-IN")}
                  </p>
                </>
              )
            }
          />
          <div className="flex">
            {!deleted ? (
              content?.keywords?.split(",").map((value) => (
                <Tag key={`${cardId}-${value}`} color="blue">
                  {value}
                </Tag>
              ))
            ) : (
              <Button type="primary" onClick={retrieveInstance}>
                Retrieve
              </Button>
            )}
          </div>
          {!deleted && (
            <div className="flex justify-content-between">
              <p>
                <EyeOutlined /> {content.views}
              </p>
              <p>
                <LikeOutlined /> {content.likes}
              </p>
              <p>
                <ShareAltOutlined /> {content.shares}
              </p>
              <p>
                <ForkOutlined /> {content.forks}
              </p>
            </div>
          )}
        </Space>
      </AntCard>
      {drawer && (
        <FormDrawer
          data={{
            id: cardId,
            name: title as string,
            description: content.description,
            keywords: content.keywords,
          }}
          visible={open}
          onClose={closeDrawer}
        />
      )}
    </>
  );
};

export default Card;
