import React, { FC } from "react";
import Admin from "./Admin";
import User from "./User";

interface Props {
  isAdmin: boolean;
}

const NavBar: FC<Props> = ({ isAdmin }) => {
  return <>{isAdmin ? <Admin /> : <User />}</>;
};

export default NavBar;
