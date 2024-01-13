import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import closeButton from "../images/x-symbol.svg";
import "../index.css";

const PauseScreen = (props) => {
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
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button onClick={props.onClose} className="button">
              <img src={closeButton} alt="close button" width={15} />
            </button>
          </div>
          <div className="modal-body">
            <h5 className="modal-titles">Getting Started</h5>
            <p className="pause-screen-text">
              Drag the top card to the bottom cards in the order of release
              date.
            </p>
            <p className="pause-screen-text">
              You get 3 lives and every wrongly placed card loses one life.
            </p>
            <p className="pause-screen-text">
              Cards marked in red are incorrect while cards marked with a
              checkmark in the bottom right corner will count towards your
              score.
            </p>
            <h5 className="modal-titles">Examples</h5>
            <table className="card-examples">
              <tr>
                <th>
                  <img
                    src={require("../images/wrongCard.png")}
                    alt="wrong card"
                    width={100}
                  />
                </th>
                <th>
                  <img
                    className="rightCardExample"
                    src={require("../images/rightCard.png")}
                    alt="right card"
                    width={100}
                  />
                </th>
              </tr>
              <tr>
                <td>Wrong Card</td>
                <td>Correct Card</td>
              </tr>
            </table>
            <p></p>
            <div className="pause-screen-spotify-div">
              <p className="pause-screen-text spotify-information">
                Click on a card to learn more about the album, play some of the
                tracks, and even add straight to your Spotify library!
              </p>
              {/* <img
                src={require("../images/spotifyScreen.png")}
                alt="spotify screen"
                className="spotify-screen-ex"
              /> */}
            </div>
            <div className="copyright-div">
              <a
                className="copyright-highlight"
                href="https://developer.spotify.com/documentation/web-api"
              >
                <p className="copyright">
                  Created with Spotify API&emsp;
                  <img
                    width="15px"
                    src={require("../images/spotifyIcon.png")}
                    alt="spotify icon"
                  ></img>
                </p>
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <p className="owner">
              Created and developed by{" "}
              <a className="owner-link" href="https://scottsakurai.com/">
                Scott Sakurai
              </a>
              <br />
              Designed with <a className="owner-link" href="http://www.ok4pril.com">April Picato</a>
            </p>
            <p className="owner"></p>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default PauseScreen;
