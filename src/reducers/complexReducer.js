import { TOGGLE_COMPLEX } from "../constants";

let initialState = {
  isComplex: false,
  ingredients: [],
  cuisine: [],
  diet: '',
  intolerances: [],
  type: null,
  sort: 2
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);
  let data = Object.assign({}, action.data);
  // console.log('Switch - updated: ', updated);
  // console.log('data: ',data);
  
  switch (action.type) {

    case TOGGLE_COMPLEX:
      updated[data.name] = data.value

      return updated;

    default:
      return updated;
  }
};
