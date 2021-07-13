import React, { FC } from "react";
import { Table, TableColumnType, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface TableProps {
  columns: TableColumnType<any>[];
  datas: any[];
}

const DataTable: FC<TableProps> = ({ columns, datas }) => {
  return (
    <Spin indicator={<LoadingOutlined  style={{ fontSize: 50 }} />} spinning={datas.length === 0}>
      <Table columns={columns} dataSource={datas} />
    </Spin>
  );
};

export default DataTable;
