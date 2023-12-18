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
          {props.cardsUsed.map((movieItem, index) => {
            return (
              <>
                <div className="timelineCard">
                  <Card
                    key={movieItem.id}
                    id={movieItem.id}
                    index={index}
                    used={true}
                    title={movieItem.title}
                    poster={movieItem.poster_path}
                    artist={movieItem.artist}
                    date={movieItem.release_date}
                    right={movieItem.correct}
                    startingCard={movieItem.startingCard}
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
