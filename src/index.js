import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import "./index.css";

ReactDOM.render(
    <BrowserRouter>
        <div className="app">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);
