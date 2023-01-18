import React, {useState} from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'

import { Board } from './Board'
import Footer from "./Footer"

import {theme} from "./theme.js"
 
export function App() {
  const colorThemeIdx = Math.floor(Math.random() * 10)
  const colorThemeBoard = {
    "--div-border-color": theme[colorThemeIdx]["divBorderColor"],
    "--circle-background-color": theme[colorThemeIdx]["circleBackgroundColor"],
    "--circle-hover-bg-color": theme[colorThemeIdx]["circleHoverBackgroundColor"],
    "--circle-hover-border-color": theme[colorThemeIdx]["circleHoverBorderColor"],
  }

  const colorThemeFooter = {
    "--footer-bg-color": theme[colorThemeIdx]["divBorderColor"],
    "--footer-font-color": theme[colorThemeIdx]["backgroundColor"],
  }

  document.querySelector("body").style.backgroundColor = theme[colorThemeIdx]["backgroundColor"]

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        theme="dark"
        closeOnClick
        draggable
        pauseOnHover
      />
      <Board style={colorThemeBoard}/>
      <Footer style={colorThemeFooter}/>
    </>
  );
}