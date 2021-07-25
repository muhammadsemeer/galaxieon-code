import { Input } from "antd";
import React from "react";

const Search = () => {
  return (
    <>
      <Input.Search style={{ width: "40%" }} allowClear placeholder="Search Instances" />
    </>
  );
};

export default Search;
