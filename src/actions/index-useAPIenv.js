import {
  FETCH_INGREDIENTS,
  FETCH_RECIPES,
  FETCH_MORE_RECIPES,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_COMPLEX
} from '../constants';
import axios from 'axios';

// Point the import to the API Key file you want to use
//import { FOOD_API_KEY_HEADER } from './apiKey-MichaelGmail';

const Axios = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  timeout: 10000,
  headers: {
    'X-RapidAPI-Key': `${process.env.REACT_APP_FOOD_API_KEY}`
  }
});

export const fetchIngredients = ingredient => dispatch => {
  Axios.get(
    `/food/ingredients/autocomplete?query=${ingredient}&number=10`
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
  let ingredientsStr = ingredientsJoin.replace(/ /g, '+')
  let cuisineStr = '';
  let intolerancesStr = '';

  if (complex.cuisine.length > 0) {
    cuisineStr = complex.cuisine.toString().split(',').join('%2C')
  }

  if (complex.intolerances.length > 0) {
    intolerancesStr = complex.intolerances.toString().split(',').join('%2C')
  }

  Axios.get(
    `recipes/searchComplex?cuisine=${cuisineStr}&diet=${complex.diet}&includeIngredients=${ingredientsStr}&intolerances=${intolerancesStr}&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&ranking=${complex.sort}&limitLicense=false&offset=0&number=40`
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
