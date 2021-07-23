import { HomeFilled } from "@ant-design/icons";
import Search from "../Search/Search";
import React from "react";
import SideBar, { SideBarProps } from "../SideBar/SideBar";
import Logo from "./Logo";
import Profile from "./Profile";

const User = () => {
  const sideBarProps: SideBarProps = {
    isAdmin: false,
    menus: [
      {
        name: "Home",
        key: "home",
        icon: <HomeFilled />,
        to: "/dashboard",
      },
    ],
  };

  return (
    <>
      <header>
        <Logo isNav />
        <Search />
        <Profile isAdmin={false} />
      </header>
      <SideBar {...sideBarProps} />
    </>
  );
};

export default User;
