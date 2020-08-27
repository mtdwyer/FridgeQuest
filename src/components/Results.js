import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse"
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {
  addItem,
  deleteItem,
  fetchRecipes
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
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing.unit * 2}px`,
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
  paper2: {
    margin: theme.spacing.unit
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: "80%"
  }
});


let returnedRecipes;

class Results extends Component {
  state = {
    open: false,
    clicked: [],
    recipeIngredients: [],
    scroll: 'paper',
  };

  handleClickOpen = (scroll, item) => (event) => {
    // console.log('Scroll:', scroll);
    // console.log('Event: ', event.target);
    // console.log('Item: ', item);
    
    
    
    this.setState({ 
      open: true,
      clicked: item,
      scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createIngredients = (fetchedIngredients) => {
    const { classes } = this.props;
    // console.log('fetchedIngredients:', fetchedIngredients);

    if (fetchedIngredients !== undefined) {
      // console.log(('recipe'));
      
      let recipeIng = fetchedIngredients.map((item) => {
        // console.log('item');
        
        return(
          <div key={item.name}
          style={{
            margin:5,
            justifyContent: 'center'
          }}>
            <div key={item.name}>
              <img
                name={item.name}
                alt={item.name}
                src={item.image}
                style={{ maxHeight: 100 }}
              >
              </img>
            </div>
            <div style={{textAlign:"center"}}>
              {item.name}
            </div>
          </div>
        )
      });
        return (
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Ingredients</Typography>
        </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
          {recipeIng}
        </ExpansionPanelDetails>
        </ExpansionPanel>
        );

    }
  }

  parseInstructions = (recipe, callback) => {
    const { classes } = this.props;
    if (recipe.analyzedInstructions !== undefined) {
      // console.log("Parse: ", recipe.analyzedInstructions[0].steps);
      let ingredientsAll = []
      let ingredientsName = []
      let ingredientsImages = []
      let ingAll = []
      let ingName = []
      let ingImages = []
      let steps = recipe.analyzedInstructions[0].steps
      let stepX = steps.map(step => {
        ingredientsAll.push(step.ingredients.map(e=> e))
        let header = 'Step ' + step.number
        return (
          <div key={header}>
          <Divider />
          <ListItem>
            <ListItemText primary={header} secondary={step.step} />
          </ListItem>
          </div>
        )
        

      })
      recipe.usedIngredients.map(e => ingAll.push(e))
      recipe.missedIngredients.map(e => ingAll.push(e))
      
      // ingredientsAll.map(ingredient => {
      //      ingredient.map(ing => {
      //       //console.log('ingredientName: ', ing.name);
      //       if (!ingredientsName.includes(ing.name)) {
      //         ingredientsName.push(ing.name)
      //         ingredientsImages.push(ing.image)
      //       }
      //     })
      //   })
      for (let index = 0; index < ingredientsAll.length; index++) {
        const ingredient = ingredientsAll[index];

        for (let index2 = 0; index2 < ingredient.length; index2++) {
          const ing = ingredient[index2];
          if (!ingredientsName.includes(ing.name)) {
            ingredientsName.push(ing.name)
            ingredientsImages.push(ing.image)
          }
        }
        }
        




      // ingAll.map((ing) => {
      //   // console.log(('ingAll: ', ingAll));

      //     if (!ingName.includes(ing.name)) {
      //       ingName.push(ing.name)
      //       ingImages.push(ing.image)
      //     }
      //   })

      for (let index = 0; index < ingAll.length; index++) {
        const ing = ingAll[index];
        if (!ingName.includes(ing.name)) {
          ingName.push(ing.name)
          ingImages.push(ing.image)
        }
      }


      let finalIngredientsName, finalIngredientsImages
      let finalIngredients = []
      if(ingName.length > ingredientsName.length) {
        finalIngredientsName = ingName
        finalIngredientsImages = ingImages
      } else {
        finalIngredientsName = ingredientsName
        finalIngredientsImages = ingredientsImages.map(e => "https://spoonacular.com/cdn/ingredients_100x100/" + e)
      }
      for (let i = 0; i < finalIngredientsName.length; i++) {
       finalIngredients.push({
         name: finalIngredientsName[i],
         image: finalIngredientsImages[i]
      })
    }

      

     
      return (
      <div>
          {callback(finalIngredients)}
          <List className={classes.root}>
            <ListItem>
              <ListItemText primary="Instructions"/>
            </ListItem>
            {stepX}
          </List>
    </div>
      )
    }
    
    
  }


  render() {
    const { classes } = this.props;
    // console.log("***state.open", this.state.open);
    let fetched = false
 console.log('!@-------state-------@!')
 console.log(this.state)
 
    if (this.props.recipes.fetchedRecipes !== null) {
      fetched = true
      returnedRecipes = this.props.recipes.fetchedRecipes.map((item, index) => {
        // console.log("Item: ", item);
        return (
          
            <Card className={classes.card} id={item.id} key={item.id}>
            <CardActionArea onClick={this.handleClickOpen('paper', item)}>

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
                  Used Ingredients: {item.usedIngredientCount} <br/>
                  Missed Ingredients: {item.missedIngredientCount} <br/>
                  Unused Ingedients: {item.unusedIngredients.length}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
       
        );
      });
    }
  
  return (
    <div>
    <Collapse in={fetched} collapsedHeight="75px">
    <Paper elevation={10} style={{margin:20, backgroundColor: '#FFFAFA' }} className={classes.paper2}>
        <Typography variant="headline" component="h1">
          Results
        </Typography>
        <br/>
        <Grid container justify="center">
          {returnedRecipes}
        </Grid>
      </Paper>
    </Collapse>

      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        scroll={this.state.scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">{this.state.clicked.title}</DialogTitle>
        <DialogContent>
          <CardMedia
            className={classes.media}
            image={this.state.clicked.image}
            title={this.state.clicked.title}
          />

          {this.parseInstructions(this.state.clicked, this.createIngredients)}
          <DialogContentText>
            From: <a href={this.state.clicked.sourceUrl} target="_blank" rel='noopener noreferrer'>{this.state.clicked.sourceName}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
            </Button>
        </DialogActions>
      </Dialog>

    </div>
    );
  }
}

const mapStateToProps = state => ({
  fridge: state.fridge,
  recipes: state.recipes,
  complex: state.complex
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addItem, deleteItem, fetchRecipes }
  )(Results)
);
