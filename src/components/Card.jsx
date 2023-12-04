import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  function CardUsed(props) {
    const used = props.used;
    let d = new Date(props.date);
    let month = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();
    if (used) {
      return (
        <>
          <p className="cardInfo">{props.title}</p>
          <p className="cardInfo">{months[month] + " " + day + " " + year}</p>
        </>
      );
    } else {
      return null;
    }
  }

  function isRight(correct, used) {
    if (used && correct) {
      return "cardRight card";
    } else if (used && !correct) {
      return "cardWrong card";
    } else {
      return null;
    }
  }

  function Findposter() {
    // console.log(props.poster)
    // console.log("------------------------------------")
    if (props.poster === null) {
      return "https://f4.bcbits.com/img/a4139357031_10.jpg";
    }
    return props.poster;
  }

  return (
    <Draggable
      draggableId={String(props.id)}
      index={props.index}
      isDragDisabled={props.used}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={isRight(props.right, props.used)}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img className="cardPoster" src={Findposter()} alt={props.title} />
            <CardUsed used={props.used} date={props.date} title={props.title} />
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
