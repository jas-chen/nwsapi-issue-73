import { JSDOM } from "jsdom";

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body></body>
  </html>
`);

global.window = dom.window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;

class MyElement extends HTMLElement {
  get element() {
    return "hello";
  }

  render() {
    return this.element;
  }
}

customElements.define("my-element", MyElement);

const style = document.createElement("style");
style.innerHTML = `
  body::before {
    content: '';
  }
`;
document.head.appendChild(style);

document.body.innerHTML = "<my-element></my-element>";

const myElement = document.querySelector("my-element");

if (myElement.element !== "hello") {
  throw new Error();
}

console.log(window.getComputedStyle(myElement));
