/*global chrome*/

import React, { Component } from "react";
import DomInspector from "dom-inspector";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  componentDidMount() {
    const inspector = new DomInspector({
      theme: "you-custom-theme-class",
    });
    inspector.enable();

    document.addEventListener(
      "click",
      (event) => {
        const xpath = inspector.getXPath();
        console.log(xpath);
        console.log("XPATH", this.getElementByXpath(xpath));
        const elm = this.getElementByXpath(xpath);
        elm.style.border = "3px solid pink";
      },
      false
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.isExt ? (
            <img
              src={chrome.runtime.getURL("static/media/logo.svg")}
              className="App-logo"
              alt="logo"
            />
          ) : (
            <img src={logo} className="App-logo" alt="logo" />
          )}

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
