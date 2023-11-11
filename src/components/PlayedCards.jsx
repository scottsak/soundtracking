import React, { useState } from "react";
import Card from "./Card.jsx";
import * as card from "./card.js";
import * as api from "../api.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function PlayedCards(props) {
  return (
    <Droppable droppableId="played" direction="horizontal">
      {(provided) => (
        <div
          className="timelineCards"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {props.movieData.map((movieItem, index) => {
            return (
              <div className="timelineCard">
                <Card
                  key={movieItem.id}
                  id={movieItem.id}
                  index={index}
                  used={true}
                  title={movieItem.title}
                  poster={movieItem.poster_path}
                  date={movieItem.release_date}
                  right={movieItem.correct}
                />
              </div>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default PlayedCards;
