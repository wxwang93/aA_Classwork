json.todos do
  @todos.each do |todo|
    json.partial! 'todo', todo: todo
  end 
end

if @todos.all? {|todo| todo.taggings.length == 0}
  json.taggings({})
else 
  json.taggings do
    @todos.each do |todo|
      todo.taggings.each do |tagging|
        json.partial! 'api/taggings/tagging', tagging: tagging
      end
    end
  end
end


if @todos.all? {|todo| todo.tags.length == 0}
    json.tags({})
else
  json.tags do
    @todos.each do |todo|
      todo.tags.each do |tag|
        json.partial! 'api/tags/tag', tag: tag
      end
    end 
  end
end