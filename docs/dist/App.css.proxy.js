// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".text-center {\n  text-align: center;\n}\n\n.button-primary {\n  display: block;\n  margin: 20px auto;\n}\n\n.button-secondary {\n  display: block;\n  margin: 10px auto;\n}\n\n.item {\n  width: 33%;\n  max-width: 200px;\n}\n\n.item img {\n  max-width: 100%;\n}\n\n.item p {\n  text-transform: capitalize;\n  text-align: center;\n}\n\n.sortableContainer {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  width: 100%;\n  overflow-y: auto;\n}\n\n.nodImage {\n  display: block;\n  margin: 0 auto;\n  max-width: 100%;\n}\n\n.heading {\n  padding-left: 60px;\n}\n\n.heading small {\n  color: #888;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}