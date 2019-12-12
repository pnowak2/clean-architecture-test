// import { ConsoleApp } from "./app/console/console.app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app/react/app";

// new ConsoleApp().run();

ReactDOM.render(
    <App title="app" paragraph="welcome"/>,
    document.getElementById('app')
);