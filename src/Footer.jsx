import React from 'react'
import "./Footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCopyright } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer({style: colorThemeFooter}) {

  return (
    <div id="footer-container" className="footer-container" style={colorThemeFooter}>
      <p>
        <FontAwesomeIcon icon={faCopyright} /> 2022 Copyright Santosh Swansi
      </p>
      <div className='link'>
        <a href="mailto:santoshswansi091@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} /> santoshswansi091@gmail.com 
        </a>
        <a href="https://github.com/santoshswansi/Match-And-Eat"  target="_blank" rel='noreferrer noopener'>
          <FontAwesomeIcon icon={faGithub} /> Contribute
        </a>
      </div>
    </div>
  );
}

export default Footer