json.set! :pokemon do 
  json.extract! @pokemon, :id, :name, :attack, :defense, :moves
  json.image_url asset_path("pokemon_snaps/#{@pokemon.image_url}")
end 

json.set! :items do 
  @items.each do |item|
    json.set! item.id do 
      json.id item.id
      json.pokemon_id item.pokemon_id
      json.name item.name 
      json.price item.price
      json.happiness item.happiness
      json.image_url item.image_url
    end
  end
end 