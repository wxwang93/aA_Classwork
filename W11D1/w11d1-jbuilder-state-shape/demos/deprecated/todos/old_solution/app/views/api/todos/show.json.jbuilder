json.todo do 
  json.partial! 'todo', todo: @todo
end 

json.tags do 
    json.partial! 'tags', todo: @todo
end