import React from 'react';
import { Link } from "react-router-dom";

const PokemonIndexItem = ({poke}) => {
  return (
  <div>
      <Link to="/api/pokemons/:id"><li>
        {poke.name}
        </li></Link>
      <li>
        <img src={poke.image_url} />
      </li>
  </div>
  )
}

export default PokemonIndexItem;