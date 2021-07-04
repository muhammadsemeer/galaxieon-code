import React, { FC } from "react";
import { Table, TableColumnType } from "antd";

export interface TableProps {
  coloums: TableColumnType<any>[];
  datas: any[];
}

const DataTable: FC<TableProps> = ({ coloums, datas }) => {
  return <Table columns={coloums} dataSource={datas} />;
};

export default DataTable;
