import React from "../snowpack/pkg/react.js";
import "./App.css.proxy.js";
import Rater from "./Rater.js";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "container"
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "text-center heading"
    }, "MAFS Rater", /* @__PURE__ */ React.createElement("small", null, ".com")), /* @__PURE__ */ React.createElement(Rater, null), /* @__PURE__ */ React.createElement("p", {
      className: "footer"
    }, "Made with ", /* @__PURE__ */ React.createElement("img", {
      width: "16",
      src: "images/heart-solid.svg",
      alt: "love"
    }), " by ", /* @__PURE__ */ React.createElement("a", {
      href: "https://github.com/benkaiser",
      target: "_blank"
    }, "Benjamin Kaiser")));
  }
}
export default App;
