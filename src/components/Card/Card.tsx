import React, { FC, useState } from "react";
import {
  Card as AntCard,
  CardProps as AntCardProps,
  Space,
  Tag,
  Dropdown,
  Menu,
  Button,
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
}
const overlay = (id: string): JSX.Element => (
  <Menu>
    <Menu.Item key="1">
      <a href="#">
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
      <a href="#">
        <DeleteOutlined /> Delete Instance
      </a>
    </Menu.Item>
  </Menu>
);

const extra = (id: string): JSX.Element => (
  <Dropdown overlay={overlay(id)} trigger={["click"]}>
    <MoreOutlined />
  </Dropdown>
);

const Card: FC<CardProps> = ({ content, cardId, ...rest }) => {
  const history = useHistory();

  const [descLength, setDescLength] = useState(20);

  const length = content.description?.length;

  const description = length && length !== 0 && (
    <>
      {content.description?.substr(0, descLength)}
      {descLength < length && <>...</>}
      <br />
      {descLength < length ? (
        <a onClick={() => setDescLength(length)}>Show More</a>
      ) : (
        <a onClick={() => setDescLength(20)}>Show Less</a>
      )}
    </>
  );

  return (
    <AntCard
      hoverable
      {...rest}
      extra={extra(cardId)}
      onDoubleClick={() => history.push(`/instance/${cardId}`)}
    >
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        {length !== 0 && <AntCard.Meta description={description} />}
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
  );
};

export default Card;
