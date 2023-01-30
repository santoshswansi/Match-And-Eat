import React, {useState, useEffect} from 'react'
import "./Header.css"

import About from "./About"

function Header({style: colorThemeHeader, styleForAbout: colorThemeAbout}) {
  const [showAbout, setShowAbout] = useState(false)
  
  function openAbout() {
    setShowAbout(true)
    document.getElementById("board-container").classList.add("blur")
    document.getElementById("button-container").classList.add("blur")
    document.getElementById("header-container").classList.add("blur")
    document.getElementById("footer-container").classList.add("blur")
    document.getElementById("button-container").classList.add("in-active")
    document.getElementById("about-button").classList.add("in-active")
  }

  return (
    <>
    <div id="header-container" className="header-container" style={colorThemeHeader}>
      <svg
        width="210"
        height="180"
        viewBox="0 0 210 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="logo-header"
          d="M0 180V0H30L60 90L90 0H120H210V30H120V75H180V105H120V150H210V180H120H90V90L60 180L30 90V180H0Z"
          fill={colorThemeHeader["--header-font-color"]}
        />
      </svg>
      <div id="about-button" className="about-button" onClick={openAbout}>About</div>
    </div>

    {showAbout && <About style={colorThemeAbout} setShowAbout={setShowAbout}/>}
    </>
  );
}

export default Header