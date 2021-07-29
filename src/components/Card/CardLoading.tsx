import { PlusCircleFilled } from "@ant-design/icons";
import { Col, Card as AntCard, Button, Typography } from "antd";
import React, { FC, useState } from "react";
import Card from "./Card";
import { grey } from "@ant-design/colors";
import CreateModal from "../CreateModal/CreateModal";

const CardLoading: FC<{ count?: number; isAdd?: boolean }> = ({
  count,
  isAdd,
}) => {
  const arr = [];
  if (count) {
    for (let i = 0; i < count; i++) {
      arr.push(
        <Col key={i} xs={24} sm={24} md={12} lg={8} xl={6} xxl={3}>
          <Card
            style={{ width: "100%" }}
            cardId={i.toString()}
            content={{}}
            loading
          ></Card>
        </Col>
      );
    }
  }

  const [isModalUp, setModalUp] = useState(false);

  return (
    <>
      {!isAdd ? (
        arr
      ) : (
        <AntCard
          style={{
            minHeight: 372,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: 100,
            padding: 0,
          }}
          hoverable
          onClick={() => setModalUp(true)}
        >
          <PlusCircleFilled style={{ fontSize: 25, color: grey[4] }} />
          <Typography.Text style={{ color: grey[4] }}>
            New Instance
          </Typography.Text>
        </AntCard>
      )}
      <CreateModal visible={isModalUp} onCancel={() => setModalUp(false)} />
    </>
  );
};

export default CardLoading;
