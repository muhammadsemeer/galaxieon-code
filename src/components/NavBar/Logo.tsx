import React, { FC } from "react";
import logo from "../../logo.svg";
import CollapseButton from "./CollapseButton";
import style from "./header.module.scss";

const Logo: FC<{ isNav: boolean }> = ({ isNav }) => {
  return (
    <div className={style.logo}>
      {isNav && <CollapseButton />}
      <img src={logo} alt="LOGO" />
    </div>
  );
};

export default Logo;
