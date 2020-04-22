class Api::PokemonsController < ApplicationController

  def show 
    @pokemon = Pokemon.find(params[:id])
    @items = @pokemon.items
    render 
  end 

  def index 
    @pokemons = Pokemon.all
    render  
  end
  
  def create 

  end 

  private 
  def pokemon_params 
    params.require(pokemon).permit(:name)
  end 
end

