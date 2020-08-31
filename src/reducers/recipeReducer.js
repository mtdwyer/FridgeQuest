import { 
    FETCH_RECIPES,
    FETCH_MORE_RECIPES } from '../constants';

let initialState = {
    fetchedRecipes: null,
    clickedRecipe: null,

}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state);
    let copyArray, splicedArray, copyData;
    // console.log('UpDated: ', updated);
    // console.log('B4 action.data: ', action.data);
    // console.log('PropsReducer: '. this.props);
    
    

    switch(action.type) {

        case FETCH_RECIPES:
            console.log('!@-------action.data-------@!')
            console.log(action.data)

            if (action.data === null) {
                return null
            }
            
            copyData = action.data
            copyArray = copyData
            splicedArray = copyArray.splice(0, 20)
            updated.fetchedRecipes = [];
            splicedArray.forEach(item => {
                updated.fetchedRecipes.push(item)
            });
            updated.splicedArray = copyData;

            return updated;

        case FETCH_MORE_RECIPES:
            // console.log('!@-------fetchmore-------@!')
            // console.log(updated)
            
            let newRecipes = updated.splicedArray.splice(0, 20);
            updated.fetchedRecipes = [...state.fetchedRecipes, ...newRecipes]

            return updated;

        default: 
            return state;
    }

}