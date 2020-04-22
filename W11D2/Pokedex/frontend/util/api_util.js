
export const fetchAllPokemon = (success) => { 
  return (
    $.ajax({ 
      method: "GET", 
      url: "api/pokemons", 
      success
    })
  )
}

