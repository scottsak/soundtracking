import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import * as spotify from "react-spotify-embed";
import "../index.css";

const AlbumInformation = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div
          className="modal-content album-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="album-modal-body">
            <spotify.Spotify
              link={`https://open.spotify.com/album/${props.albumId}?utm_source=generator&theme=0`}
              width={"100%"}
              height={"352"}
            />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default AlbumInformation;
