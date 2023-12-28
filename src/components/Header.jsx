import React, { useState } from "react";
import PauseScreen from "./PauseScreen";
import infoButton from "../images/question-mark-circle.svg";

function Header(props) {
  return (
    <div className="header">
      {/* <button onClick={() => setShow(true)} className="pause">
        ?
      </button> */}
      <div className="pause" onClick={() => props.setShow(true)}>
        <img src={infoButton} alt="info button" width={"100%"} />
      </div>
      <PauseScreen onClose={() => props.setShow(false)} show={props.show} />
    </div>
  );
}

export default Header;
