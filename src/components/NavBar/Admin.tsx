import React, { FC } from "react";
import SideBar from "../SideBar/SideBar";
import Logo from "./Logo";
import Profile from "./Profile";
const Admin = () => {
  return (
    <>
      <header>
        <Logo />
        <Profile isAdmin />
      </header>
      <SideBar />
    </>
  );
};

export default Admin;
