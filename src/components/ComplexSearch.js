import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import { 
  addItem,
  deleteItem,
  fetchIngredients,
  fetchRecipes,
  toggleComplex } from '../actions';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    margin: theme.spacing.unit,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },

});


const dietArr = ['pescetarian','vegan','paleo','vegetarian']
const cuisineArr = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic','eastern european','caribbean','latin american']
const intolerancesArr = ['dairy','egg','gluten','peanut','sesame','seafood','shellfish','soy','sulfite','tree nut','wheat']

class ComplexSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: props.recipes,
      complex: props.complex
    };
  }
  

  handleChange = event => {
    console.log('Event: ', event.target);
    this.props.toggleComplex(event.target)
   // this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });
  };

  render() {
    //console.log('PropsComplexDiv: ',this.props);
    const { classes } = this.props;

      return(
        <div id="ComplexSearch">
        <Collapse in={this.props.complex.isComplex}>
          <Paper elevation={5} className={classes.paper}>     
            <Typography  variant="title">
              Advanced Search Options
            </Typography>
          
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="dietSelect">
                Diet
              </InputLabel>
              <Select
                value={this.props.complex.diet}
                onChange={this.handleChange}
                input={<Input name="diet" id="dietSelect" />}
                displayEmpty
                name="diet"
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                      {
                        (dietArr.map(
                          item => {
                            return (
                              <MenuItem key={item} value={item}>{item}</MenuItem>
                            );
                          }
                        ))
                      }
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="cuisineSelect">
                Cuisine
            </InputLabel>
              <Select
                multiple
                displayEmpty
                value={this.props.complex.cuisine}
                onChange={this.handleChange}
                input={<Input name="cuisine" id="cuisineSelect" />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>Any</em>;
                  }

                  return selected.join(', ');
                }}
                name="cuisine"
                className={classes.selectEmpty}
              >
                <MenuItem disabled value="">
                  <em>Choose Multiple</em>
                </MenuItem>
                {
                  (cuisineArr.map(
                    item => {
                      return (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      );
                    }
                  ))
                }
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="intolerancesSelect">
                Intolerances
            </InputLabel>
              <Select
                multiple
                displayEmpty
                value={this.props.complex.intolerances}
                onChange={this.handleChange}
                input={<Input name="intolerances" id="intolerancesSelect" />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>None</em>;
                  }

                  return selected.join(', ');
                }}
                name="intolerances"
                className={classes.selectEmpty}
              >
                <MenuItem disabled value="">
                  <em>Choose 1 or more</em>
                </MenuItem>
                {
                  (intolerancesArr.map(
                    item => {
                      return (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      );
                    }
                  ))
                }
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="sortSelect">
                Sort
              </InputLabel>
              <Select
                value={this.props.complex.sort}
                onChange={this.handleChange}
                input={<Input name="sort" id="sortSelect" />}
                name="sort"
                className={classes.selectEmpty}
              >
                <MenuItem value={2}>
                  Relevance <em>(default)</em>
                </MenuItem>
                <MenuItem value={0}>
                  Minimize Missing Ingredidients
                </MenuItem>
                <MenuItem value={1}>
                  Maximize Used Ingredients
                </MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Collapse>
           </div>
      )
    }
   
  
 }

const mapStateToProps = state => ({
  recipes: state.recipes,
  complex: state.complex
});

export default 
  withStyles(styles)(connect(mapStateToProps,{
      addItem,
      deleteItem,
      fetchIngredients,
      fetchRecipes,
      toggleComplex})(ComplexSearch));

