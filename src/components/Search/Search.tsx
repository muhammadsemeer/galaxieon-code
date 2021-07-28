import { Input } from "antd";
import React, { ChangeEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "../../utils/useQuery";

const Search = () => {
  const query = useQuery();
  const history = useHistory();
  const [value, setValue] = useState(query.get("query") || "");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const onSearch = () => {
    history.push(`/search?query=${value}`);
  };

  return (
    <>
      <Input.Search
        style={{ width: "40%" }}
        allowClear
        placeholder="Search Instances"
        value={value}
        onChange={handleChange}
        onSearch={onSearch}
      />
    </>
  );
};

export default Search;
