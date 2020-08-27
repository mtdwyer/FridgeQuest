import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { addItem,
  deleteItem,
  fetchRecipes,
  fetchMoreRecipes } from "../actions";
import { CircularProgress } from "@material-ui/core";



var isFridgeButtonDisabled = false;
class Fridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
    complex: props.complex,
    spinner: false
  };
};

  handleDeleteItem = item => {
    this.props.deleteItem(item);
  };

  handleScroll = (e) => {
    let lastRecipe = document.querySelector('div:last-child')
    let lastRecipeOffset = lastRecipe.offsetTop + lastRecipe.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 20;  
    if (pageOffset > lastRecipeOffset - bottomOffset) {
        this.props.fetchMoreRecipes();
    }
  }


  handleRecipeSearch = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      spinner: true
    })
    this.props.fetchRecipes(this.props.fridge.ingredients, this.props.complex);
    this.scrollListener = window.addEventListener('scroll', (e) => {
      if ((document.querySelector('div:last-child')) !== null) {
        this.handleScroll(e)
      }
    })
  };

  clearFridge = event => {
    // event.preventDefault()
    // this.props.fridge.ingredients = []
    // this.props.recipes.fetchedRecipes = null
    // console.log('!@-------clear-------@!')
    // console.log(this.props)
    
    // this.setState({
    //   complex: this.props.complex,
    //   spinner: false
    // })
    window.location.reload();
  }

  render() {
    console.log('!@-------props-------@!')
    console.log(this.props)
    console.log('!@-------fetch-------@!')
    console.log(this.props.recipes.fetchedRecipes)
    console.log('!@-------state-------@!')
    console.log(this.state)
    
    
    
    if (this.props.fridge.ingredients.length > 0) {
     isFridgeButtonDisabled = false
    } else {
      isFridgeButtonDisabled = true
    }


    let Spinner = (
      <>
      </>
    );
    if (this.state.spinner === false && this.props.recipes.fetchedRecipes === null) {
      Spinner = (
        <Button
          id="123"
          variant="contained"
          disabled={isFridgeButtonDisabled}
          color="primary"
          onClick={this.handleRecipeSearch}
          style={{ paddingTop: 10, paddingLeft: 30, paddingRight: 30, paddingBottom: 10 }}
        >
          Search
        </Button> 
     
      )
    }

    if (this.state.spinner === true && this.props.recipes.fetchedRecipes === null) {
      Spinner = (
        <CircularProgress />
      )
    }

    if (this.props.recipes.fetchedRecipes != null) {
      Spinner = (
        <Button
          id="123"
          variant="contained"
          disabled={isFridgeButtonDisabled}
          color="primary"
          onClick={this.clearFridge}
          style={{ paddingTop: 10, paddingLeft: 30, paddingRight: 30, paddingBottom: 10 }}
        >
          Reset
        </Button> 
      )
    }

    let yourFridge;
    if (this.props.fridge.ingredients.length > 0) {
      yourFridge = (this.props.fridge.ingredients.map((item, index) => {

        return (
          <Button
            id={index}
            variant="outlined"
            key={item}
            onClick={this.handleDeleteItem.bind(this, item)}>
            {item}
          </Button>
        );
      }))
    } else {
     
      yourFridge = (
          <Button
          variant="outlined"
          disabled={true}
          >
            Empty
        </Button>
      )

    } 



    return (
      <Paper id="Fridge" elevation={10} rounded="true" style={{margin: 20,backgroundColor: '#FAFAFF', paddingBottom: 15}}>
          <Typography variant="headline" component="h2" style={{margin:5}}>
            Your Fridge
          </Typography>
        <div style={{minHeight:37}}>
          {yourFridge}
        </div>
    
        <div id="searchFridgeBtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
          
            {Spinner}
 
          </div>
       
      </Paper>

   
    );
  }
}

const mapStateToProps = state => ({
  fridge: state.fridge,
  recipes: state.recipes,
  complex: state.complex
});

export default connect(
  mapStateToProps,
  {
    addItem,
    deleteItem,
    fetchRecipes,
    fetchMoreRecipes,
  }
)(Fridge);
