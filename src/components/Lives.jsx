import React from "react";

function Lives(props) {
  function Heart() {
    return (
      <img
        src={require("../images/heart.png")}
        alt="Girl in a jacket"
        width="50"
      ></img>
    );
  }

  function amountOfLives(life) {
    if (life === 3) {
      return (
        <>
          <Heart />
          <Heart />
          <Heart />
        </>
      );
    } else if (life === 2) {
      return (
        <>
          <Heart />
          <Heart />
        </>
      );
    } else if (life === 1) {
      return (
        <>
          <Heart />
        </>
      );
    } else if (life === 0) {
      return <h1>You Loser</h1>;
    }
  }

  return <div>{amountOfLives(props.heart)}</div>;
}

export default Lives;
