import { DatabaseFilled, FileFilled, ProfileFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setActivePane, togglePane } from "../../store/editor/sidePane";

const NavTab: FC = () => {
  const sidePane = useSelector((state: RootState) => state.editorSidePane);
  const dispatch = useDispatch();

  const changePane = (pane: "info" | "explorer") => {
    if (sidePane.activePane === pane) {
      return dispatch(togglePane());
    }
    dispatch(setActivePane(pane));
  };

  return (
    <Menu
      inlineCollapsed
      style={{
        height: "calc(100vh - 50px)",
        padding: "25px 0",
        position: "fixed",
        marginTop: "50px",
        zIndex: 99,
        width: 50,
      }}
      defaultSelectedKeys={[sidePane.activePane]}
    >
      <Menu.Item
        key="info"
        icon={<ProfileFilled />}
        onClick={() => changePane("info")}
      >
        Instance Info
      </Menu.Item>
      <Menu.Item
        key="explorer"
        icon={<FileFilled />}
        onClick={() => changePane("explorer")}
      >
        File Explorer
      </Menu.Item>
    </Menu>
  );
};

export default NavTab;
