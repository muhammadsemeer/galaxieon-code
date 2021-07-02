import React, { FC } from "react";
import { Card } from "antd";

export interface Stats {
  title: string;
  value: number;
  icon?: JSX.Element;
}

const StatCards: FC<Stats> = ({ title, value, icon }) => {
  return (
    <Card style={{ borderRadius: "10px" }}>
      <Card.Meta avatar={icon} title={title} description={value} />
    </Card>
  );
};

export default StatCards;
