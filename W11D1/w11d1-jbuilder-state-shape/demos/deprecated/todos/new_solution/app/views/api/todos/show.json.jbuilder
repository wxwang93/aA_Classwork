json.todo do
  json.partial! 'todo', todo: @todo
end

json.taggings({})

json.taggings do
  @todo.taggings.each do |tagging|
    json.partial! 'api/taggings/tagging', tagging: tagging
  end
end

json.tags({})

json.tags do
  @todo.tags.each do |tag|
    json.partial! 'api/tags/tag', tag: tag
  end
end
