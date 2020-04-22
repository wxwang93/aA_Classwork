json.set! todo.id do 
  json.extract! todo, :id, :title, :body, :done
end

