import { useState, useReducer, useEffect } from "react";
import "./Board.css";

// React Toastify
import { toast } from "react-toastify";

import { reducer, initialState } from "./reducer";

import move from "./assets/move.mp3";
import gameStart from "./assets/game-start.mp3";
import decide from "./assets/decide.mp3";
import success from "./assets/success.mp3";
import gameWin from "./assets/game-win.mp3";

const totalCirclePerPlayer = 8;

export function Board({ style: colorThemeBoard }) {
  const [isStar, setIsStar] = useState(true);
  const [cntSetCircle, setCntSetCircle] = useState(0);
  const [eatPlayer, setEatPlayer] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [remCnt, setRemCnt] = useState({
    starRemCnt: totalCirclePerPlayer,
    dollarRemCnt: totalCirclePerPlayer,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (remCnt.dollarRemCnt <= 2 || remCnt.starRemCnt <= 2) {
      if (remCnt.dollarRemCnt <= 2)
        toast.success("⭐ Won!!", {
          toastId: "star",
          style: { backgroundColor: colorThemeBoard["--div-border-color"] },
        });
      else if (remCnt.starRemCnt <= 2)
        toast.success("💲Won!!", {
          toastId: "dollar",
          style: { backgroundColor: colorThemeBoard["--div-border-color"] },
        });

      const gameWinAudio = new Audio(gameWin);
      gameWinAudio.play();
      dispatch(initialState);
      setIsStar(true);
      setCntSetCircle(0);
      setEatPlayer(null);
      setStartPos(null);
      setIsPlay(false);
      setRemCnt({
        starRemCnt: totalCirclePerPlayer,
        dollarRemCnt: totalCirclePerPlayer,
      });
    }
  }, [remCnt.dollarRemCnt, remCnt.starRemCnt]);

  function handlePlay() {
    const gameStartAudio = new Audio(gameStart);
    gameStartAudio.play();

    dispatch(initialState);
    setIsStar(true);
    setCntSetCircle(0);
    setEatPlayer(null);
    setStartPos(null);
    setRemCnt({
      starRemCnt: totalCirclePerPlayer,
      dollarRemCnt: totalCirclePerPlayer,
    });
    setIsPlay(true);
  }

  function handleClick(circlePos) {
    if (!isPlay) return;

    if (
      eatPlayer == null &&
      state[circlePos]["occupant"] == null &&
      cntSetCircle < totalCirclePerPlayer * 2
    ) {
      dispatch({
        [circlePos]: {
          ...state[circlePos],
          occupant: isStar ? "star" : "dollar",
        },
      });

      const [[second1, third1], [second2, third2]] =
        state[circlePos]["tripletMembers"];
      const player = isStar ? "star" : "dollar";
      if (
        (player == state[second1]["occupant"] &&
          player == state[third1]["occupant"]) ||
        (player == state[second2]["occupant"] &&
          player == state[third2]["occupant"])
      ) {
        setEatPlayer(player == "star" ? "dollar" : "star");
        const decideAudio = new Audio(decide);
        decideAudio.play();
      } else {
        const moveAudio = new Audio(move);
        moveAudio.play();
      }

      setIsStar(!isStar);
      setCntSetCircle(cntSetCircle + 1);
    } else if (eatPlayer != null && state[circlePos]["occupant"] == eatPlayer) {
      if (remCnt.dollarRemCnt != 3 && remCnt.starRemCnt != 3) {
        const successAudio = new Audio(success);
        successAudio.play();
      }
      dispatch({ [circlePos]: { ...state[circlePos], occupant: null } });
      const keyToBeUpdated = eatPlayer + "RemCnt";
      setEatPlayer(null);
      setRemCnt({ ...remCnt, [keyToBeUpdated]: remCnt[keyToBeUpdated] - 1 });
    } else if (
      eatPlayer == null &&
      cntSetCircle == totalCirclePerPlayer * 2 &&
      state[circlePos]["occupant"] == (isStar ? "star" : "dollar")
    ) {
      setStartPos(circlePos);
    } else if (
      eatPlayer == null &&
      cntSetCircle == totalCirclePerPlayer * 2 &&
      state[circlePos]["occupant"] == null &&
      startPos != null &&
      state[startPos]["neighbor"].includes(circlePos) &&
      state[circlePos]["occupant"] == null
    ) {
      const player = state[startPos]["occupant"];
      dispatch({
        [circlePos]: { ...state[circlePos], occupant: player },
        [startPos]: { ...state[startPos], occupant: null },
      });

      const [[second1, third1], [second2, third2]] =
        state[circlePos]["tripletMembers"];
      if (
        (second1 != startPos &&
          player == state[second1]["occupant"] &&
          third1 != startPos &&
          player == state[third1]["occupant"]) ||
        (second2 != startPos &&
          player == state[second2]["occupant"] &&
          third2 != startPos &&
          player == state[third2]["occupant"])
      ) {
        setEatPlayer(player == "star" ? "dollar" : "star");
        const decideAudio = new Audio(decide);
        decideAudio.play();
      } else {
        const moveAudio = new Audio(move);
        moveAudio.play();
      }

      setStartPos(null);
      setIsStar(!isStar);
    }
  }

  // isMouseOver = true => mouse is over
  //             = false => mouse is out
  function handleMouseOverAndOut(circlePos, isMoverOver) {
    if (
      (eatPlayer == null || !isMoverOver) &&
      (state[circlePos]["occupant"] == null || !isMoverOver) &&
      cntSetCircle < totalCirclePerPlayer * 2
    )
      dispatch({
        [circlePos]: { ...state[circlePos], isHovering: isMoverOver },
      });
  }

  function handleClassNames(circlePos) {
    return `${circlePos} ${
      state[circlePos]["isHovering"] && isPlay && "hover"
    } ${state[circlePos]["occupant"]} ${
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

  function boardCircleElement(circlePos) {
    return (
      <div
        className={handleClassNames(circlePos)}
        onClick={() => handleClick(circlePos)}
        onMouseOver={() => handleMouseOverAndOut(circlePos, true)}
        onMouseOut={() => handleMouseOverAndOut(circlePos, false)}
      ></div>
    );
  }

  return (
    <>
      <div
        id="board-container"
        className={`board-container ${!isPlay && "game-start-board-container"}`}
        style={colorThemeBoard}
      >
        <div className="top">
          {/* ========top circles start================== */}

          {boardCircleElement("top-top-right")}
          {boardCircleElement("top-top-middle")}
          {boardCircleElement("top-top-left")}
          {boardCircleElement("top-left-middle")}
          {boardCircleElement("top-bottom-left")}
          {boardCircleElement("top-bottom-middle")}
          {boardCircleElement("top-bottom-right")}
          {boardCircleElement("top-right-middle")}
          {/*  =============top circles end================= */}

          {/* Top Bridges Start */}
          <div className="top-bridge-top"></div>
          <div className="top-bridge-left"></div>
          <div className="top-bridge-bottom"></div>
          <div className="top-bridge-right"></div>
          {/* Top Bridges End */}

          <div className="middle">
            {/* ========middle circles start================== */}

            {boardCircleElement("middle-top-right")}
            {boardCircleElement("middle-top-middle")}
            {boardCircleElement("middle-top-left")}
            {boardCircleElement("middle-left-middle")}
            {boardCircleElement("middle-bottom-left")}
            {boardCircleElement("middle-bottom-middle")}
            {boardCircleElement("middle-bottom-right")}
            {boardCircleElement("middle-right-middle")}
            {/* =============middle circles end================================ */}

            {/* Middle Bridges Start  */}
            <div className="middle-bridge-top"></div>
            <div className="middle-bridge-left"></div>
            <div className="middle-bridge-bottom"></div>
            <div className="middle-bridge-right"></div>
            {/* Middle Bridges End */}

            <div className="bottom">
              {/* ========bottom circles start================== */}

              {boardCircleElement("bottom-top-right")}
              {boardCircleElement("bottom-top-middle")}
              {boardCircleElement("bottom-top-left")}
              {boardCircleElement("bottom-left-middle")}
              {boardCircleElement("bottom-bottom-left")}
              {boardCircleElement("bottom-bottom-middle")}
              {boardCircleElement("bottom-bottom-right")}
              {boardCircleElement("bottom-right-middle")}
              {/* =============bottom circles end================================ */}
            </div>
          </div>
        </div>
      </div>

      <div
        id="button-container"
        className={`button-container ${
          !isPlay && "game-start-button-container"
        }`}
        style={colorThemeBoard}
      >
        <button onClick={handlePlay}>{isPlay ? "Restart" : "Start"}</button>
      </div>
    </>
  );
}
