import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Home from "./components/layout/Home";

require('dotenv').config()
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
