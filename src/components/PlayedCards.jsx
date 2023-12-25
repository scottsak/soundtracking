import React from "react";
import Card from "./Card.jsx";
import { Droppable } from "react-beautiful-dnd";

function PlayedCards(props) {
  return (
    <Droppable droppableId="played" direction="horizontal">
      {(provided) => (
        <div
          className="timelineCards"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {props.cardsUsed.map((songItem, index) => {
            return (
              <>
                <div className="timelineCard">
                  <Card
                    key={songItem.id}
                    id={songItem.id}
                    index={index}
                    used={true}
                    title={songItem.title}
                    poster={songItem.poster_path}
                    artist={songItem.artist}
                    date={songItem.release_date}
                    right={songItem.correct}
                    startingCard={songItem.startingCard}
                    lives={props.lives}
                  />
                </div>
                {index === props.cardsUsed.length - 1 && props.lives !== 0 && (
                  <div className="timelineCard lastCard"></div>
                )}
              </>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default PlayedCards;
