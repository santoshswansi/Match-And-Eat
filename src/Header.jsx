import React from 'react'
import "./Header.css"

import logoHeader from "./assets/logo-header.svg"

function Header({style: colorThemeHeader}) {
  return (
    <div className="header-container" style={colorThemeHeader}>
      <div className='header-logo'>
        <img src={logoHeader} alt="logo" />
      </div>
      <div className="about">About</div>
    </div>
  );
}

export default Header