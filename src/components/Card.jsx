import React from "react";
import { Draggable } from "react-beautiful-dnd";
import * as spotify from "react-spotify-embed";

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
                <img
                  className="cardPoint"
                  src={require("../images/annaPlusSign.png")}
                  alt="heart"
                />
              )}
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  function cardClassToUse(correct, used, lives) {
    if (used && lives === 0) {
      return "cardOpened card";
    } else if (used && correct) {
      return "cardRight card";
    } else if (used && !correct) {
      return "cardWrong card";
    } else {
      return null;
    }
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
    <Draggable
      draggableId={String(props.id)}
      index={props.index}
      isDragDisabled={props.used || props.loading}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={cardClassToUse(props.right, props.used, props.lives)}
            ref={provided.innerRef}
            snapshot={snapshot}
            key={props.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <>
              {props.lives !== 0 ? (
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
              ) : (
                <>
                  <spotify.Spotify
                    link={`https://open.spotify.com/album/${props.id}?utm_source=generator&theme=0`}
                    width={"100%"}
                    height={"352"}
                  />
                </>
              )}
            </>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
