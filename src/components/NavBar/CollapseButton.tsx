import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { collapse } from "../../store/menu/collapsedSlice";

const CollapseButton = () => {
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const dispatch = useDispatch();
  return (
    <Button type="text" onClick={() => dispatch(collapse())}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

export default CollapseButton;
