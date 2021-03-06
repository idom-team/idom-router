import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

import { createPath } from "history";

const html = htm.bind(React.createElement);

export function bind(node, config) {
  return {
    create: (type, props, children) =>
      React.createElement(type, props, ...children),
    render: (element) => ReactDOM.render(element, node),
    unmount: () => ReactDOM.unmountComponentAtNode(node),
  };
}

export function Link({ to, onClick, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, to, window.location.origin + to);
    onClick({
      pathname: window.location.pathname,
      search: window.location.search,
    });
  };

  return html`<a href=${to} onClick=${handleClick} ...${props}>${children}</a>`;
}
