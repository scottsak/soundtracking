import React from "react";
import emptyHeart from "../images/empty-heart.svg";
import fullHeart from "../images/full-heart.svg";

function Lives(props) {
  function Heart(props) {
    return (
      <img
        src={props.empty ? emptyHeart : fullHeart}
        alt="heart"
        className="hearts"
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
          <Heart empty={true} />
        </>
      );
    } else if (life === 1) {
      return (
        <>
          <Heart />
          <Heart empty={true} />
          <Heart empty={true} />
        </>
      );
    } else if (life === 0) {
      return <h1>You Loser</h1>;
    }
  }

  return <div>{amountOfLives(props.heart)}</div>;
}

export default Lives;
