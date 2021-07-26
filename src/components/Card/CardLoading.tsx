import { Col, Row } from "antd";
import React, { FC } from "react";
import Card from "./Card";

const CardLoading: FC<{ count: number }> = ({ count }) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(
      <Col key={i} xs={24} sm={24} md={12} lg={8} xl={6} xxl={3}>
        <Card style={{ width: "100%" }} cardId={i.toString()} content={{}} loading></Card>
      </Col>
    );
  }
  return <>{arr}</>;
};

export default CardLoading;
