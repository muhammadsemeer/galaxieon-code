import React, { FC } from "react";
import Admin from "./Admin";

interface Props {
  isAdmin: boolean;
}

const NavBar: FC<Props> = ({ isAdmin }) => {
  return <>{isAdmin ? <Admin /> : null}</>;
};

export default NavBar;
