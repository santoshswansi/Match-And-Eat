import { useState, useReducer, useEffect } from 'react'
import './Board.css'

// React Toastify
import {toast} from 'react-toastify'

import {reducer, initialState} from "./reducer"

import move from "./assets/move.mp3";
import gameStart from "./assets/game-start.mp3";
import decide from "./assets/decide.mp3";
import success from "./assets/success.mp3";
import gameWin from "./assets/game-win.mp3";

const totalCirclePerPlayer = 8

export function Board({style: colorThemeBoard}) {

  const [isStar, setIsStar] = useState(true)
  const [cntSetCircle, setCntSetCircle] = useState(0)
  const [eatPlayer, setEatPlayer] = useState(null)
  const [startPos, setStartPos] = useState(null)
  const [remCnt, setRemCnt] = useState({starRemCnt: totalCirclePerPlayer, dollarRemCnt: totalCirclePerPlayer})
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
    if(remCnt.dollarRemCnt <= 2 || remCnt.starRemCnt <= 2) {
      if(remCnt.dollarRemCnt <= 2) 
        toast.success("⭐ Won!!", {toastId: "star", style: {"backgroundColor": colorThemeBoard["--div-border-color"]}})
      else if(remCnt.starRemCnt <= 2)
        toast.success("💲Won!!", {
          toastId: "dollar",
          style: { "backgroundColor": colorThemeBoard["--div-border-color"] },
        });

      const gameWinAudio = new Audio(gameWin)
      gameWinAudio.play()
      dispatch(initialState)
      setIsStar(true)
      setCntSetCircle(0)
      setEatPlayer(null)
      setStartPos(null)
      setIsPlay(false)
      setRemCnt({starRemCnt: totalCirclePerPlayer, dollarRemCnt: totalCirclePerPlayer})
    }
  }, [remCnt.dollarRemCnt, remCnt.starRemCnt])

  function handlePlay(){
    const gameStartAudio = new Audio(gameStart)
    gameStartAudio.play()

    dispatch(initialState)
    setIsStar(true)
    setCntSetCircle(0)
    setEatPlayer(null)
    setStartPos(null)
    setRemCnt({starRemCnt: totalCirclePerPlayer, dollarRemCnt: totalCirclePerPlayer})
    setIsPlay(true)
  }

  function handleClick(circlePos) {
    if(!isPlay)
      return

    if(eatPlayer == null && state[circlePos]["occupant"] == null && cntSetCircle < totalCirclePerPlayer*2) {
      dispatch({
        [circlePos]: {
          ...state[circlePos],
          "occupant": isStar ? "star" : "dollar",
        },
      })

      const [[second1, third1], [second2, third2]] = state[circlePos]["tripletMembers"]
      const player = isStar? "star" : "dollar"
      if((player == state[second1]["occupant"] && player == state[third1]["occupant"]) ||
        (player == state[second2]["occupant"] && player == state[third2]["occupant"])){
        setEatPlayer(player == "star" ? "dollar" : "star")
        const decideAudio = new Audio(decide)
        decideAudio.play()
      }else{

        const moveAudio = new Audio(move);
        moveAudio.play();
      }

      setIsStar(!isStar);
      setCntSetCircle(cntSetCircle + 1);
    }else if(eatPlayer != null && state[circlePos]["occupant"] == eatPlayer){

      if(remCnt.dollarRemCnt != 3 && remCnt.starRemCnt != 3){
        const successAudio = new Audio(success);
        successAudio.play();
      }
      dispatch({[circlePos]: {...state[circlePos], "occupant": null}})
      const keyToBeUpdated = eatPlayer + "RemCnt"
      setEatPlayer(null)
      setRemCnt({...remCnt,  [keyToBeUpdated]: remCnt[keyToBeUpdated]-1})
    }else if(eatPlayer == null && cntSetCircle == totalCirclePerPlayer*2 && (state[circlePos]["occupant"] == (isStar ? "star": "dollar"))){
      
      setStartPos(circlePos)
    }else if(eatPlayer == null && cntSetCircle == totalCirclePerPlayer*2 && state[circlePos]["occupant"] == null  && startPos != null && state[startPos]["neighbor"].includes(circlePos) && state[circlePos]["occupant"] == null){
      
      const player = state[startPos]["occupant"]
      dispatch({[circlePos]: {...state[circlePos], "occupant": player}, [startPos]: {...state[startPos], "occupant": null}}) 
      
      const [[second1, third1], [second2, third2]] = state[circlePos]["tripletMembers"];
      if((second1 != startPos && player == state[second1]["occupant"] && third1 != startPos && player == state[third1]["occupant"]) ||
        (second2 != startPos && player == state[second2]["occupant"] && third2 != startPos  && player == state[third2]["occupant"])){
        setEatPlayer(player == "star" ? "dollar" : "star");
        const decideAudio = new Audio(decide);
        decideAudio.play()
      }else{
        const moveAudio = new Audio(move);
        moveAudio.play()
      }

      setStartPos(null)
      setIsStar(!isStar)
    }
  }

  // isMouseOver = true => mouse is over
  //             = false => mouse is out
  function handleMouseOverAndOut(circlePos, isMoverOver){
    if((eatPlayer == null || !isMoverOver) && (state[circlePos]["occupant"] == null || !isMoverOver) && cntSetCircle < totalCirclePerPlayer*2)
      dispatch({ [circlePos]: {...state[circlePos], isHovering: isMoverOver} })
  }

  function handleClassNames(circlePos){
    return `${circlePos} ${state[circlePos]["isHovering"] && isPlay && "hover"} ${
      state[circlePos]["occupant"]
    } ${
      eatPlayer != null &&
      state[circlePos]["occupant"] == eatPlayer &&
      "zoomInZoomOut"
    } ${
      startPos != null &&
      state[startPos]["neighbor"].includes(circlePos) &&
      state[circlePos]["occupant"] == null &&
      "zoomInZoomOut"
    }`;
  } 

  return (
    <>
      <div id="board-container" className={`board-container ${!isPlay && 'game-start-board-container'}`} style={colorThemeBoard}>
        <div className="top">
          {/* ========top circles start================== */}
          <div
            className={handleClassNames("top-top-right")}
            onClick={() => handleClick("top-top-right")}
            onMouseOver={() => handleMouseOverAndOut("top-top-right", true)}
            onMouseOut={() => handleMouseOverAndOut("top-top-right", false)}
          ></div>
          <div
            className={handleClassNames("top-top-middle")}
            onClick={() => handleClick("top-top-middle")}
            onMouseOver={() => handleMouseOverAndOut("top-top-middle", true)}
            onMouseOut={() => handleMouseOverAndOut("top-top-middle", false)}
          ></div>
          <div
            className={handleClassNames("top-top-left")}
            onClick={() => handleClick("top-top-left")}
            onMouseOver={() => handleMouseOverAndOut("top-top-left", true)}
            onMouseOut={() => handleMouseOverAndOut("top-top-left", false)}
          ></div>
          <div
            className={handleClassNames("top-left-middle")}
            onClick={() => handleClick("top-left-middle")}
            onMouseOver={() => handleMouseOverAndOut("top-left-middle", true)}
            onMouseOut={() => handleMouseOverAndOut("top-left-middle", false)}
          ></div>
          <div
            className={handleClassNames("top-bottom-left")}
            onClick={() => handleClick("top-bottom-left")}
            onMouseOver={() => handleMouseOverAndOut("top-bottom-left", true)}
            onMouseOut={() => handleMouseOverAndOut("top-bottom-left", false)}
          ></div>
          <div
            className={handleClassNames("top-bottom-middle")}
            onClick={() => handleClick("top-bottom-middle")}
            onMouseOver={() => handleMouseOverAndOut("top-bottom-middle", true)}
            onMouseOut={() => handleMouseOverAndOut("top-bottom-middle", false)}
          ></div>
          <div
            className={handleClassNames("top-bottom-right")}
            onClick={() => handleClick("top-bottom-right")}
            onMouseOver={() => handleMouseOverAndOut("top-bottom-right", true)}
            onMouseOut={() => handleMouseOverAndOut("top-bottom-right", false)}
          ></div>
          <div
            className={handleClassNames("top-right-middle")}
            onClick={() => handleClick("top-right-middle")}
            onMouseOver={() => handleMouseOverAndOut("top-right-middle", true)}
            onMouseOut={() => handleMouseOverAndOut("top-right-middle", false)}
          ></div>
          {/*  =============top circles end================================ */}

          {/* Top Bridges Start */}
          <div className="top-bridge-top"></div>
          <div className="top-bridge-left"></div>
          <div className="top-bridge-bottom"></div>
          <div className="top-bridge-right"></div>
          {/* Top Bridges End */}

          <div className="middle">
            {/* ========middle circles start================== */}
            <div
              className={handleClassNames("middle-top-right")}
              onClick={() => handleClick("middle-top-right")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-top-right", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-top-right", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-top-middle")}
              onClick={() => handleClick("middle-top-middle")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-top-middle", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-top-middle", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-top-left")}
              onClick={() => handleClick("middle-top-left")}
              onMouseOver={() => handleMouseOverAndOut("middle-top-left", true)}
              onMouseOut={() => handleMouseOverAndOut("middle-top-left", false)}
            ></div>

            <div
              className={handleClassNames("middle-left-middle")}
              onClick={() => handleClick("middle-left-middle")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-left-middle", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-left-middle", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-bottom-left")}
              onClick={() => handleClick("middle-bottom-left")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-bottom-left", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-bottom-left", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-bottom-middle")}
              onClick={() => handleClick("middle-bottom-middle")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-bottom-middle", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-bottom-middle", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-bottom-right")}
              onClick={() => handleClick("middle-bottom-right")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-bottom-right", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-bottom-right", false)
              }
            ></div>

            <div
              className={handleClassNames("middle-right-middle")}
              onClick={() => handleClick("middle-right-middle")}
              onMouseOver={() =>
                handleMouseOverAndOut("middle-right-middle", true)
              }
              onMouseOut={() =>
                handleMouseOverAndOut("middle-right-middle", false)
              }
            ></div>
            {/* =============middle circles end================================ */}

            {/* Middle Bridges Start  */}
            <div className="middle-bridge-top"></div>
            <div className="middle-bridge-left"></div>
            <div className="middle-bridge-bottom"></div>
            <div className="middle-bridge-right"></div>
            {/* Middle Bridges End */}

            <div className="bottom">
              {/* ========bottom circles start================== */}

              <div
                className={handleClassNames("bottom-top-right")}
                onClick={() => handleClick("bottom-top-right")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-top-right", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-top-right", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-top-middle")}
                onClick={() => handleClick("bottom-top-middle")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-top-middle", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-top-middle", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-top-left")}
                onClick={() => handleClick("bottom-top-left")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-top-left", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-top-left", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-left-middle")}
                onClick={() => handleClick("bottom-left-middle")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-left-middle", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-left-middle", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-bottom-left")}
                onClick={() => handleClick("bottom-bottom-left")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-bottom-left", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-bottom-left", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-bottom-middle")}
                onClick={() => handleClick("bottom-bottom-middle")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-bottom-middle", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-bottom-middle", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-bottom-right")}
                onClick={() => handleClick("bottom-bottom-right")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-bottom-right", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-bottom-right", false)
                }
              ></div>

              <div
                className={handleClassNames("bottom-right-middle")}
                onClick={() => handleClick("bottom-right-middle")}
                onMouseOver={() =>
                  handleMouseOverAndOut("bottom-right-middle", true)
                }
                onMouseOut={() =>
                  handleMouseOverAndOut("bottom-right-middle", false)
                }
              ></div>
              {/* =============bottom circles end================================ */}
            </div>
          </div>
        </div>
      </div>

      <div id="button-container" className={`button-container ${!isPlay && "game-start-button-container"}`} style={colorThemeBoard}>
        <button onClick={handlePlay}>{isPlay ? "Restart" : "Start"}</button>
      </div>
    </>
  );
}
