import React from "react";
import icon from "../assets/icon.png";

const Header = () => {
  return (
    <div className="container-fluid pt-4 pb-2">
      <h1 className="text-center">
        <img
          src={icon}
          alt="Icon"
          style={{ height: "1em", marginRight: "0.5em" }}
        />
        Mad Libs Diceware
      </h1>
    </div>
  );
};

export default Header;
