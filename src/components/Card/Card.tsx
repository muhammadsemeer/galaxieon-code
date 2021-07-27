import React, { FC, useState } from "react";
import {
  Card as AntCard,
  CardProps as AntCardProps,
  Space,
  Tag,
  Dropdown,
  Menu,
  message,
  Popconfirm,
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
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FormDrawer from "../FormDrawer/FormDrawer";
import axios from "../../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../../utils/Error";
import { useDispatch } from "react-redux";
import { removeOneInstance } from "../../store/instance/instanceSlice";

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
}

const Card: FC<CardProps> = ({ content, cardId, drawer, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [descLength, setDescLength] = useState(20);

  const [open, setOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const closeDrawer = () => setOpen(false);

  const length = content.description?.length;

  const description = length && length !== 0 && (
    <>
      {content.description?.substr(0, descLength)}
      {descLength < length && <>...</>}
      <br />
      {descLength < length ? (
        <a
          onClick={() => {
            isInitialLoad && setIsInitialLoad(false);
            setDescLength(length);
          }}
        >
          Show More
        </a>
      ) : (
        !isInitialLoad && <a onClick={() => setDescLength(20)}>Show Less</a>
      )}
    </>
  );

  const deleteInstance = () => {
    const loading = message.loading("Deleting...");
    axios
      .delete(`/instance/${cardId}`)
      .then((res: AxiosResponse<{ status: string; message: string }>) => {
        message.success(res.data.message);
        loading();
        dispatch(removeOneInstance(cardId));
      })
      .catch((error: AxiosError) => {
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
        <a href="#">
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

  return (
    <>
      <AntCard
        hoverable
        {...rest}
        extra={
          <Dropdown
            overlayStyle={{ zIndex: 9 }}
            overlay={overlay}
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        }
        onDoubleClick={() => history.push(`/instance/${cardId}`)}
      >
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <AntCard.Meta description={description || "No Description..."} />
          <div className="flex">
            {content?.keywords?.split(",").map((value) => (
              <Tag key={`${cardId}-${value}`} color="blue">
                {value}
              </Tag>
            ))}
          </div>
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
        </Space>
      </AntCard>
      {drawer && (
        <FormDrawer
          data={{
            id: cardId,
            name: rest.title as string,
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
