import Logo from '../../assets/dummy-logo.png'
import React from "react";
import './Header.scss'
const Header = () => {
  return (
    <header>
        <img src={Logo} alt="logo" width={100} height={100} />
        <div className={'divider'}/>
    </header>
  );
};

export default Header;









