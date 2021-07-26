import React, { FC, ReactNode, useEffect } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./sidebar.module.scss";
import { collapseWithPayload } from "../../store/menu/collapsedSlice";
import { toggle } from "../../store/menu/responsiveSlice";

export interface SideBarProps {
  menus: Array<{ key: string; name: string; icon: ReactNode; to: string }>;
  isAdmin: boolean;
}

const SideBar: FC<SideBarProps> = ({ menus }) => {
  const location = useLocation();
  const collapsed = useSelector((state: RootState) => state.collapsed);
  const responsive = useSelector((state: RootState) => state.responsive);
  const defaultSelectedKeys = menus
    .filter(
      (menu) =>
        menu.to.split("/").join("") === location.pathname.split("/").join("")
    )
    .map((menu) => menu.key);

  const dispatch = useDispatch();

  const collapseEffect = () => {
    if (window.innerWidth <= 980 && window.innerWidth >= 575) {
      dispatch(collapseWithPayload(true));
    } else {
      dispatch(collapseWithPayload(false));
    }
  };

  useEffect(() => {
    window.addEventListener("load", collapseEffect);
    window.addEventListener("resize", collapseEffect);
    return () => {
      window.removeEventListener("resize", collapseEffect);
    };
  }, []);

  const handleClick = () => {
    responsive && dispatch(toggle());
  };

  return (
    <Menu
      className={`${styles.sidebar} ${responsive && styles.active}`}
      style={{
        maxWidth: 225,
        height: "calc(100vh - 50px)",
        padding: "25px 0",
        position: "fixed",
        marginTop: "65px",
        zIndex: 99,
      }}
      defaultSelectedKeys={defaultSelectedKeys}
      mode="inline"
      inlineCollapsed={collapsed}
    >
      {menus.map((menu) => (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <NavLink onClick={handleClick} to={menu.to}>
            {menu.name}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideBar;
