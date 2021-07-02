import React, { FC } from "react";
import logo from "../../logo.svg";
import style from "./header.module.scss"

const Logo: FC = () => {
  return (
    <div className={style.logo}>
      <img src={logo} alt="LOGO" />
    </div>
  );
};

export default Logo;
