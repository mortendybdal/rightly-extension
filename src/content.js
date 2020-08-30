/*global chrome*/
/* src/content.js */
import React from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";
import DomInspector from "dom-inspector";

class Main extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Frame
        head={[
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL("/static/css/content.css")}
          ></link>,
        ]}
      >
        <FrameContextConsumer>
          {({ document, window }) => {
            return <App document={document} window={window} isExt={true} />;
          }}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

/////// TEST
const link = document.querySelectorAll("a");

link.forEach((elm) => {
  //elm.style.border = "5px solid red";
});

const inspector = new DomInspector();
inspector.enable();

///////

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    toggle();
  }
});

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}