import React from 'react'
import './About.css'

import close from "./assets/close-svg.svg"
import logoHeader from "./assets/logo-header.svg"

function About({style: colorThemeAbout, setShowAbout: setShowAbout}) {
  function closeAbout(){
    document.getElementById("board-container").classList.remove("blur")
    document.getElementById("button-container").classList.remove("blur")
    document.getElementById("header-container").classList.remove("blur")
    document.getElementById("footer-container").classList.remove("blur")
    document.getElementById("button-container").classList.remove("in-active")
    document.getElementById("about-button").classList.remove("in-active")
    setShowAbout(false)
  }

  return (
    <div id="about-container" className="about-container" style={colorThemeAbout}>
      <div>
        <img src={logoHeader} alt="logo" className='about-logo'/>
        <img src={close} alt="close" className="about-close" onClick={closeAbout}/>
      </div>
      <h1>About Match and Eat</h1>
      <div className="about-question">
        <h2>What is match and eat?</h2>
        <p>
          {`>>`} It is a simple board game in which a player -💲 has to match
          three 💲in order to eat opponent's ⭐. Similarly a player - ⭐ has to
          match three ⭐ in order to eat opponent's 💲
        </p>
        <p>{`>>`} Each player has initially eight 💲/ ⭐</p>
      </div>

      <div className="about-question">
        <h2>How to play match and eat?</h2>
        <p>
          {`>>`} Initially each player will be placing their 💲/ ⭐ in the board
          turn by turn until they are finished
        </p>
        <p>
          {`>>`} Obviously while placing 💲/⭐, a three match in the board
          result in eating opponent's ⭐/💲
        </p>
        <p>
          {`>>`} After each player has finished its 💲/⭐. Each player will move
          their 💲/⭐ to their adjacent free position to match three 💲/⭐ in
          order to eat opponent's ⭐/💲
        </p>
        <p>
          {`>>`} Those who finish eating opponent's ⭐/💲 first will win the
          game
        </p>
      </div>
    </div>
  );
}

export default About