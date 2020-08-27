import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { recipeReducer, ingredientsReducer, fridgeReducer, complexReducer } from '../reducers';

const reducers = combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientsReducer,
  fridge: fridgeReducer,
  complex: complexReducer 
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
