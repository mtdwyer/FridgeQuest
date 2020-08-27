import {
  FETCH_INGREDIENTS,
  FETCH_RECIPES,
  FETCH_MORE_RECIPES,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_COMPLEX
} from '../constants';
import axios from 'axios';


const Axios = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,

});

export const fetchIngredients = ingredient => dispatch => {
  Axios.get(
    `/auto`
  )
    .then(results => {
      dispatch({
        type: FETCH_INGREDIENTS,
        data: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchRecipes = (ingredients, complex) => dispatch => {
  
  let ingredientsJoin = ingredients.toString().split(',').join('%2C')
  let ingredientsStr = ingredientsJoin.replace(/ /g,'+')
  let cuisineStr = '';
  let intolerancesStr= '';

  if(complex.cuisine.length > 0){
    cuisineStr = complex.cuisine.toString().split(',').join('%2C')
  }
  
  if (complex.intolerances.length > 0) {
    intolerancesStr = complex.intolerances.toString().split(',').join('%2C')
  }
  
  console.log('HTTP://',`recipes/searchComplex?cuisine=${cuisineStr}&diet=${complex.diet}&includeIngredients=${ingredientsStr}&intolerances=${intolerancesStr}&type=main+course&ranking=2`);
  
  


  Axios.get(
    `/complex`
  )

    .then(results => {
      dispatch({
        type: FETCH_RECIPES,
        data: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchMoreRecipes = () => dispatch => {
  console.log();
  dispatch({
    type: FETCH_MORE_RECIPES
  });

}

export const addItem = item => {
  return {
    type: ADD_ITEM,
    data: item
  };
};

export const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    data: item
  };
};

export const toggleComplex = param => {
  return {
    type: TOGGLE_COMPLEX,
    data: param
  }
}
