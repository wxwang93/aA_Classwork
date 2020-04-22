import * as APIUtil from '../util/api_util'
import {receiveAllPokemon} from '../actions/pokemon_actions'

export const requestAllPokemon = (dispatch) => (
  
  APIUtil.fetchAllPokemon()
  .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
  
)
