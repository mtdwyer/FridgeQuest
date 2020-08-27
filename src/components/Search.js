import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchIngredients, addItem, deleteItem } from "../actions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

var isSearchButtonDisabled = true
class Search extends Component {
  constructor(props) {
    super(props);

    this.search = React.createRef();
    this.state = {
      ingredients: ""
    };
  }

  componentDidMount() {
    //this.props.fetchIngredients();
  }

  handleSearch = event => {
    let value = this.search.current.value;
    let updated = Object.assign({}, this.state.ingredients);
    updated = value;
    //console.log('Upd: ',updated);
    if(updated.length === 0){
      isSearchButtonDisabled = true
    } else {
      isSearchButtonDisabled = false
    }

    this.setState({
      ingredients: updated
    });
  };

  handleSubmitSearch = event => {
    event.preventDefault();
    this.props.fetchIngredients(this.state.ingredients);
    //event.target.reset();
  };

  handleButtonClick = (e, name) => {
    if (!this.props.fridge.ingredients.includes(name)) {
      this.props.addItem(name);
    }
  };

  render() {
    const { fetchedIngredients } = this.props.ingredients;
    let tempIngredients;

    // console.log("FetchedIngredients: ", fetchedIngredients);
    // console.log("fridge: ", this.props.fridge.ingredients);
    // console.log("Props: ", this.props);
    
    if (fetchedIngredients !== null) {
      tempIngredients = fetchedIngredients.map((item) => {
        //API bug -  garlic 
        if(item.image === 'garlic.png'){
          item.image = 'garlic.jpg'
        }

        return (
            <Button
              className='searchBox'
              name={item.name}
              item={item.name}
              key={item.name}
              onClick={(e) => {
                this.handleButtonClick(e, item.name)
              }}
            >
            <div className='searchBox'>
              <div className = 'searchImg'>
                <img
                  name={item.name}
                  alt={item.name}
                  src={'https://spoonacular.com/cdn/ingredients_100x100/' + item.image}
                  style={{maxHeight:100}}
                >
                </img>
              </div>
              <div className = 'searchName'>
                {item.name}
              </div>
            </div>
            </Button>
        );
      });
    } else {
      tempIngredients = <p>no results.</p>;
    }

    return (
      <div id="Search" style={{}}>
        <div id="searchForm" style={{margin: 15}}>
          <form noValidate onSubmit={this.handleSubmitSearch}>
            <TextField
              style={{ marginTop: 0 }}
              id="searchInput"
              autoFocus={true}
              label="Search for Ingredients"
              type="search"
              inputRef={this.search}
              onKeyUp={this.handleSearch}
            />
            <Button
              id="searchBtn"
              style={{ margin: 10 }}
              variant="contained"
              color="primary"
              onClick={this.handleSubmitSearch}
              disabled={isSearchButtonDisabled}
            >
              Search
        </Button>
          </form>
        </div>

        <div id='searchIngredients' 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-end'
          }}>
          {tempIngredients}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  fridge: state.fridge
});

export default connect(
  mapStateToProps,
  { fetchIngredients, addItem, deleteItem }
)(Search);
