/**
 * @jest-environment jsdom
 */

import { LitElement } from "lit";

class MyElement extends LitElement {
  static properties = {
    element: {},
  };

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

document.body.innerHTML = '<my-element element="hello"></my-element>';

const myElement = document.querySelector("my-element");
expect(myElement.element).toBe("hello");
console.log(window.getComputedStyle(myElement));
