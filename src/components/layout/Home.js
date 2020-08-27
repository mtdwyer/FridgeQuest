import React, { Component } from "react";
import Search from "../Search";
import Navbar from "../Navbar";
import Fridge from "../Fridge";
import ComplexSearch from "../ComplexSearch";
import CommonIngredients from "../CommonIngredients";
import Results from "../Results"


class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ComplexSearch />
        <Search />
        <CommonIngredients />
        <Fridge />
        <Results />
      </div>
    );
  }
}

export default Home;
