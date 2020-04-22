json.set! todo.id do
    json.extract! todo, :id, :title, :body, :done, :tag_ids
end