import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import "./index.css";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/search" component={SearchPage} />
            </div>
        </BrowserRouter>    
    );
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
