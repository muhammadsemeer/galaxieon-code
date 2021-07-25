import React, { FC } from "react";
import { Table, TableColumnType, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface TableProps {
  columns: TableColumnType<any>[];
  datas: any[];
  loading: boolean;
}

const DataTable: FC<TableProps> = ({ columns, datas, loading }) => {
  return (
    <Spin indicator={<LoadingOutlined  style={{ fontSize: 50 }} />} spinning={loading}>
      <Table columns={columns} dataSource={datas} />
    </Spin>
  );
};

export default DataTable;
