import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AlbumInformation from "./AlbumInformation";
import checkmark from "../images/checkmark.svg";

function Card(props) {
  const [albumModal, setAlbumModal] = useState(false);
  const [hovered, setHover] = useState(false);
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

  function openModal({ used }) {
    if (used) {
      setAlbumModal(true);
    }
  }

  function cardHover() {
    setHover(true);
  }

  function cardUnHover() {
    setHover(false);
  }

  function CardUsed(props) {
    const used = props.used;
    let d = new Date(props.date);
    let month = d.getMonth();
    let year = d.getFullYear();
    if (used) {
      return (
        <>
          <div className="cardInfoContainer">
            <p className="cardInfo cardTitle">{props.title}</p>
            <p className="cardInfo cardArtist">{props.artist}</p>
            <div className="cardInfo cardBottomRow">
              <p className="cardInfo cardDate">{months[month] + " " + year}</p>
              {!props.startingCard && props.right && (
                <img className="cardPoint" src={checkmark} alt="heart" />
              )}
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  function cardClassToUse(correct, used, hover) {
    let classes = "card";
    if (used && hover && correct) {
      classes = classes.concat(" ", "hoveredRight");
    }
    if (used && hover && !correct) {
      classes = classes.concat(" ", "hoveredWrong");
    }
    if (used && !hover && correct) {
      classes = classes.concat(" ", "cardRight");
    }
    if (used && !hover && !correct) {
      classes = classes.concat(" ", "cardWrong");
    }
    if (!used) {
      return null;
    }
    return classes;
  }

  function Findposter() {
    if (props.poster === "spotifyLoad") {
      return require("../images/spotifyImage.gif");
    }
    if (props.poster === null) {
      return "https://f4.bcbits.com/img/a4139357031_10.jpg";
    }
    return props.poster;
  }

  return (
    <>
      <AlbumInformation
        onClose={() => setAlbumModal(false)}
        show={albumModal}
        albumId={props.id}
      />
      <Draggable
        draggableId={String(props.id)}
        index={props.index}
        isDragDisabled={props.used || props.loading}
      >
        {(provided, snapshot) => {
          return (
            <div
              className={cardClassToUse(props.right, props.used, hovered)}
              ref={provided.innerRef}
              snapshot={snapshot}
              key={props.id}
              onMouseOver={cardHover}
              onMouseOut={cardUnHover}
              onClick={() => openModal({ used: props.used })}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <>
                <img
                  className="cardPoster"
                  src={Findposter()}
                  alt={props.title}
                  draggable={false}
                />
                <CardUsed
                  used={props.used}
                  date={props.date}
                  right={props.right}
                  title={props.title}
                  artist={props.artist}
                  startingCard={props.startingCard}
                />
              </>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default Card;
