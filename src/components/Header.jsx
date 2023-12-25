import React, { useState } from "react";
import PauseScreen from "./PauseScreen";
import infoButton from "../images/question-mark-circle.svg";

function Header() {
  const [show, setShow] = useState(false);

  return (
    <div className="header">
      {/* <button onClick={() => setShow(true)} className="pause">
        ?
      </button> */}
      <div className="pause" onClick={() => setShow(true)}>
        <img src={infoButton} alt="info button" width={"100%"} />
      </div>
      <PauseScreen onClose={() => setShow(false)} show={show} />
    </div>
  );
}

export default Header;
