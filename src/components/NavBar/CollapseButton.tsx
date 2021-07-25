import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { collapse } from "../../store/menu/collapsedSlice";
import { toggle } from "../../store/menu/responsiveSlice";

const CollapseButton: FC<{
  className?: string;
  type: "collapsed" | "responsive";
}> = ({ className, type }) => {
  const state = useSelector((state: RootState) => state[type]);
  const dispatch = useDispatch();
  return (
    <Button
      type="text"
      className={className}
      onClick={() => dispatch(type === "collapsed" ? collapse() : toggle())}
    >
      {state ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

export default CollapseButton;
