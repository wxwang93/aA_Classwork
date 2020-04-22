import {RECEIVE_ALL_POKEMON} from '../actions/pokemon_actions';

export const pokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      let nextState = Object.assign({}, state)
      //debugger
      return nextState = action.pokemon 
    default:
      return state
  }
};



