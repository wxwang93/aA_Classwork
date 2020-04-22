export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON"; 

export const receiveAllPokemon = pokemon => { 
  //debugger 
  return {
    type: RECEIVE_ALL_POKEMON, 
    pokemon
  }
}

import * as APIUtil from '../util/api_util'

export const requestAllPokemon = () =>  (dispatch) => (

  APIUtil.fetchAllPokemon()
    .then(pokemon => dispatch(receiveAllPokemon(pokemon)))

)


