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
      className: "text-center"
    }, "MAFS Rater"), /* @__PURE__ */ React.createElement(Rater, null));
  }
}
export default App;
