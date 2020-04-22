json.todos do 
    @todos.each do |todo|
        json.partial! 'todo', todo: todo
    end
end

json.tags do
    @todos.each do |todo|
        json.partial! 'tags', todo: todo
    end
end 