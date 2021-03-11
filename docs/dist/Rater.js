import html2canvas from "../snowpack/pkg/html2canvas.js";
import React from "../snowpack/pkg/react.js";
import {SortableContainer, SortableElement, arrayMove} from "../snowpack/pkg/react-sortable-hoc.js";
const optionGroups = {
  grooms: [
    "brett-helling",
    "bryce-ruthven",
    "cameron-dunne",
    "jake-edwards",
    "james-susler",
    "jason-engler",
    "patrick-hayes-dwyer",
    "russell-duance",
    "sam-carraro"
  ],
  brides: [
    "alana-lister",
    "belinda-vickers",
    "beth-moore",
    "booka-nile",
    "coco-stedman",
    "joanne-todd",
    "melissa-rawson",
    "rebecca-zemek",
    "samantha-harvey"
  ]
};
class Rater extends React.Component {
  constructor(props) {
    super(props);
    this.SortableItem = SortableElement(({item}) => {
      const imgId = item.id === "your-partner" ? `your-partner-${this.state.mode}` : item.id;
      const name = item.id === "your-partner" ? "My Partner" : item.name;
      return /* @__PURE__ */ React.createElement("div", {
        className: "item"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "inner-item"
      }, /* @__PURE__ */ React.createElement("img", {
        src: `images/individual/${imgId}.jpg`
      }), /* @__PURE__ */ React.createElement("p", null, item.index + 1, ". ", name)));
    });
    this.SortableList = SortableContainer(({items}) => /* @__PURE__ */ React.createElement("div", {
      className: "sortableContainer"
    }, items.map((item, index) => {
      const fullDetail = this._fullDetail(item, index);
      return /* @__PURE__ */ React.createElement(this.SortableItem, {
        key: `${fullDetail.id}`,
        index,
        item: fullDetail
      });
    })));
    this._toggleHardMode = () => {
      const nextHardMode = !this.state.hardMode;
      this.setState({
        hardMode: nextHardMode,
        options: nextHardMode ? this.state.options.concat("your-partner") : this.state.options.filter((item) => item !== "your-partner")
      });
    };
    this._share = () => {
      html2canvas(document.getElementById("shareTarget"), {
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(async (canvas) => {
        const dataUrl = canvas.toDataURL();
        const blob = await (await fetch(dataUrl)).blob();
        const filesArray = [new File([blob], "htmldiv.png", {type: blob.type, lastModified: new Date().getTime()})];
        const shareData = {
          files: filesArray
        };
        navigator.share(shareData).then(() => {
          console.log("Shared successfully");
        });
      });
    };
    this.onSortEnd = ({oldIndex, newIndex}) => {
      this.setState({
        options: arrayMove(this.state.options, oldIndex, newIndex)
      });
    };
    this.state = {
      hardMode: false
    };
    window.onpopstate = () => {
      this.setState({
        hardMode: false,
        mode: void 0,
        options: void 0
      });
    };
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      id: "shareTarget"
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "text-center heading"
    }, "MAFS Rater", /* @__PURE__ */ React.createElement("small", null, ".com")), this.state.options ? this._optionsView() : this._renderPicker()), this.state.options && this._optionsViewButtons());
  }
  _renderPicker() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
      className: "button-primary",
      onClick: this._select.bind(this, "grooms")
    }, "Rate Grooms"), /* @__PURE__ */ React.createElement("button", {
      className: "button-primary",
      onClick: this._select.bind(this, "brides")
    }, "Rate Brides"), /* @__PURE__ */ React.createElement("p", {
      className: "text-center"
    }, `Taking inspiration from the "experts" in Married at First Sight (Australia) Season 8, go ahead and rate the participants of the show. I'm sure it'll be really constructive for your relationship, and really help boost the self esteem of the show participants. While your at it don't forget to share a screenshot of your ratings as broadly as possible on social media #MAFS.`), /* @__PURE__ */ React.createElement("img", {
      className: "nodImage",
      src: "images/nod.gif",
      alt: "John Aiken nodding"
    }));
  }
  _optionsView() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(this.SortableList, {
      items: this.state.options,
      onSortEnd: this.onSortEnd,
      axis: "xy",
      helperClass: "SortableHelper"
    }));
  }
  _optionsViewButtons() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      className: "button-secondary",
      onClick: this._toggleHardMode
    }, "Toggle Hard Mode"), /* @__PURE__ */ React.createElement("button", {
      className: "button-secondary",
      onClick: this._select.bind(this, this.state.mode === "brides" ? "grooms" : "brides")
    }, "Switch to ", this.state.mode === "brides" ? "Grooms" : "Brides"), /* @__PURE__ */ React.createElement("button", {
      className: "button-secondary",
      onClick: this._share
    }, "Share (beta)"));
  }
  _select(group) {
    if (this.state.mode === void 0) {
      window.history.pushState(null, "", "?mode=rating");
    }
    this.setState({
      options: optionGroups[group],
      hardMode: false,
      mode: group
    });
  }
  _fullDetail(id, index) {
    return {
      id,
      name: id.split("-")[0],
      index
    };
  }
}
export default Rater;
