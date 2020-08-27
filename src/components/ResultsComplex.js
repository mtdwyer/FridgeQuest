import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  addItem,
  deleteItem,
  fetchRecipes,
  getClickedRecipe
} from "../actions";

const styles = theme => ({
  card: {
    minWidth: 200,
    maxWidth: 375,
    margin: 5
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  media: {
    height: 175
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: "80%"
  }
});
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  //const top = 50 + rand();
  const top = 2;
  const left = 10;
  return {
    top: `${top}%`,
    left: `${left}%`
    //transfrom: `translate(-${top}%, -${left}%)`
  };
};

// ***************
//Other Stylings and Variables
// ***************
const imageStyle = {
  height: "250px",
  width: "auto"
};


let returnedRecipes;
let id = null;
let rows = [];
let cd;
// ***************
//Results Class
// ***************
class Results extends Component {
  state = {
    open: false,
    recipeID: null
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ recipeID: null });
  };

  // createData(ingredient, amount) {
  //   tableID += 1;
  //   return { id, ingredient, amount };
  // }

  handleCardClick(item) {
    id = item.id;
    this.state.recipeID = item.id;

    console.log("Clicked Card ID: ", id);
    console.log("ClickedRecipe: ", this.props.recipes.clickedRecipe);

    this.state.open = !this.state.open;
    this.props.getClickedRecipe(id);

    let tableID = 0;
    let tempArr = [];

    // this.props.recipes.extendedIngredients.map(item => {
    //   let createData = (name, ingredient) => {
    //     name = item.name;
    //     ingredient = item.id;
    //     tableID += 1;
    //     return id, name, ingredient;
    //   };
    //   rows.push(createData);
    // });
  }

  render() {
    const { classes } = this.props;
    console.log("***state.open", this.state.open, this.state.recipeID);
    if (this.state.open && this.props.recipes.clickedRecipe && this.props.complex.isComplex === false) {
      console.log('ModalProps: ',this.props);
      
      return (
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          onEscapeKeyDown={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          <div style={getModalStyle()} className={classes.paper}>
            <style>
              {`
                table, th{
                  border: 1px solid black;
                }
                
              `}
            </style>
            <Typography variant="title" id="modal-title" align="center">
              <img
                src={this.props.recipes.clickedRecipe.image}
                style={imageStyle}
              />
              <br />
              {this.props.recipes.clickedRecipe.title}
            </Typography>

            <table>
              <tr>
                <th>Ingredient</th>
                <th>Amount</th>
              </tr>
              {
                (rows = this.props.recipes.clickedRecipe.extendedIngredients.map(
                  item => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td style={{ textAlign: "right" }}>
                          {item.amount} {item.unit}
                        </td>
                      </tr>
                    );
                  }
                ))
              }
            </table>

            <Typography variant="body1" />
            <Typography variant="body1" id="simple-modal-description">
              <strong>Preparation Time:</strong>{" "}
              {this.props.recipes.clickedRecipe.preparationMinutes}
              <br />
              <strong>Instructions:</strong>
              <br />
              {this.props.recipes.clickedRecipe.instructions}
            </Typography>
            <Typography variant="caption">
              SourceURL:&nbsp;
              <a href={this.props.recipes.clickedRecipe.sourceUrl}>
                {this.props.recipes.clickedRecipe.sourceUrl}{" "}
              </a>
              <br />
              SpoonacularURL:&nbsp;
              <a href={this.props.recipes.clickedRecipe.spoonacularSourceUrl}>
                {this.props.recipes.clickedRecipe.spoonacularSourceUrl}
              </a>
            </Typography>
          </div>
        </Modal>
      );
    }
    if (this.props.recipes.fetchedRecipes !== null) {
      returnedRecipes = this.props.recipes.fetchedRecipes.map((item, index) => {
        console.log("Item: ", item);
        return (
          
            <Card className={classes.card} id={item.id} key={item.id}>
            <CardActionArea onClick={this.handleCardClick.bind(this, item)}>

              <CardMedia
                className={classes.media}
                image={item.image}
                title={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {item.title}
                </Typography>
                <Typography component="p">
                  Used Ingredients: {item.usedIngredientCount} <br />
                  Missed Ingredients: {item.missedIngredientCount}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
       
        );
      });
    } else returnedRecipes = <p />;

if (this.props.recipes.fetchedRecipes !== null) {    
  return (
    <Paper elevation={10} style={{margin:20, backgroundColor: '#FFFAFA' }}>
        <Typography variant="headline" component="h1">
          Results
        </Typography>
        <br/>
        <Grid container justify="center">
          {returnedRecipes}
        </Grid>
      </Paper>
    );
  } else {
    return(null);
  }
}
}

const mapStateToProps = state => ({
  fridge: state.fridge,
  recipes: state.recipes
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addItem, deleteItem, fetchRecipes, getClickedRecipe }
  )(Results)
);
