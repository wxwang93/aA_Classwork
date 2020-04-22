import React from 'react'; 
import PokemonIndexItem from './pokemon/pokemon_index_item'

class PokemonIndex extends React.Component { 
  constructor(props) { 
    super(props) 
  }

  componentDidMount() { 
    this.props.requestAllPokemon
  }

  render() {
    //debugger 
    return ( 
      <div className="pokedex">
        <h1>All Pokemon, got to catch them all!</h1>
        <ul>
            {
              this.props.pokemon.map((poke, index) => { 
                return (
                  <PokemonIndexItem poke={poke} key={index} />
                )
              })  
            }
        </ul>
      </div>
    )
  }
}

export default PokemonIndex; 