//import the react component
import React from "react";
//facilitate render react components into DOM
import ReactDOM from "react-dom/client";
//represent the root component
import App from "./App";

//create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));
//render the root element
root.render(
  //React.StrictMode => tool to enforces strict check potential issues
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
