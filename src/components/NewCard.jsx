import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card.jsx";

function NewCard(props) {
  return (
    <Droppable droppableId="next" direction="horizontal">
      {(provided) => (
        <div
          className="timelineCard"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Card
            key={props.songItem.id}
            id={props.songItem.id}
            index={1000}
            used={false}
            loading={props.songItem.loading}
            title={props.songItem.title}
            poster={props.songItem.poster_path}
            date={props.songItem.release_date}
            apiLoading={props.apiLoading}
            setApiLoading={props.setApiLoading}
            correct={null}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default NewCard;
