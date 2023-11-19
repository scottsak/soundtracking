import React, { useState } from "react";
import PauseScreen from "./PauseScreen";

function Header() {
  const [show, setShow] = useState(false);

  return (
    <div className="header">
      <button onClick={() => setShow(true)} className="pause">
        ?
      </button>
      <h1 id="gameTitle">Album of What Year</h1>
      <PauseScreen onClose={() => setShow(false)} show={show} />
    </div>
  );
}

export default Header;
