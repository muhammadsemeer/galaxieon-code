import { Affix, Divider, PageHeader as AntPageHeader, Typography } from "antd";
import React, { FC } from "react";

const PageHeader: FC<{ title: string; subTitle?: string }> = ({
  title,
  subTitle,
}) => {
  return (
    <div style={{ marginBottom: 25, padding: "0 20px" }}>
      <Affix offsetTop={50}>
        <AntPageHeader title={title} style={{ background: "#151515" }} />
        <Divider style={{ margin: "0" }} />
      </Affix>
      {subTitle && (
        <Typography.Title level={5} style={{ marginTop: 25 }}>
         {subTitle}
        </Typography.Title>
      )}
    </div>
  );
};

export default PageHeader;
