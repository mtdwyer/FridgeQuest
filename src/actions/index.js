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
  timeout: 15000,
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

export const fetchRecipes = (ingredients, complex) => async dispatch => {
  try {

  // if (complex.isComplex === true){

    let ingredientsJoin = ingredients.toString().split(',').join('%252C%20')
    let ingredientsStr = ingredientsJoin.replace(/ /g, '+')
    let cuisineStr = '';
    let intolerancesStr = '';
    if (complex.cuisine.length > 0) {
      cuisineStr = complex.cuisine.toString().split(',').join('%252C%20')
    }

    if (complex.intolerances.length > 0) {
      intolerancesStr = complex.intolerances.toString().split(',').join('%252C%20')
    }
    // console.log('!@-------fetchComplex-------@!')
    // console.log(ingredientsStr)
    
    let results = await Axios.get(
      `/recipes/complexSearch?cuisine=${cuisineStr}&diet=${complex.diet}&includeIngredients=${ingredientsStr}&intolerances=${intolerancesStr}&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&ranking=${complex.sort}&limitLicense=false&offset=0&number=40`
    )
// console.log('!@-------results.data.results-------@!')
// console.log(results.data.results)
// console.log('!@-------results-------@!')
// console.log(results)



    dispatch({
      type: FETCH_RECIPES,
      data: results.data.results
    });
    
  // } else {
    
  //   let ingredientsJoin = ingredients.toString().split(',').join('%252C')
  //   let ingredientsStr = ingredientsJoin.replace(/ /g, '+')
  //   // console.log('!@-------fetchSimple-------@!')
  //   // console.log(ingredientsStr)

  //   let results = await Axios.get(
  //     `/recipes/findByIngredients?number=50&ranking=1&ignorePantry=false&ingredients=${ingredientsStr}`
  //   )

  //   dispatch({
  //     type: FETCH_RECIPES,
  //     data: results.data
  //   });

  // }

  } catch(err) {
      console.log(err);
    };
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
