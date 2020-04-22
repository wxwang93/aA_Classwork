# Todos Demo

## Before Lecture

1) Download Postman, the app.
2) Either start with the skeleton OR download the curriculum solution[todos part 2 solution][todos-part-2]
  + `npm install`
  + `bundle install`
  + `rails db:setup`

2) Add logger from 'redux-logger' onto the store.

[todos-part-2]:
https://github.com/appacademy/curriculum/blob/master/react/projects/todos/solution_2.zip

## Code Demo Part 1 (45 mins)

### Set Up

If you download the curriculum solution:

1) Comment out protect from forgery. Note: With Rails 5.2+, Rails 5.2 no longer includes the `protect_from_forgery` option in `ApplicationController`. Add the line: `Rails.application.config.action_controller.default_protect_from_forgery = false` in the `config/initializers/content_security_policy.rb`

### Review the Todos

1) Go over the schema, routes, models, controllers.
2) Draw rails-redux-rails diagram to review logical flow of render a list of todos on the page.
3) Point out tags are created in the `Todo` model.
    + create 1 tag at a time
    + `tag_names=` is method defined on the `Todo` model
4) Point out the current state is NOT normalized because a todo's tags is nested within the todos slice of state instead of having its own slice of state.

### Start using Jbuilder

Let's see how the backend communicates with the front end. We will be using Postman to see the json object output.
1) Use postman to show json output. Sign into app with a user defined in the seed file
+ `POST` `localhost:3000/session`
  + user[username] = 'Guest'
  + user[password] =  'starwars'
+ **Note**: If you signed into Postman and signed into the same user in localhost in this order, the user in Postman will be automatically logged off because the user's session token would have changed when logging in from localhost.

3) Review the `TodosController#create`

4) Create a todo on postman with a namespaced route
+ `POST` `localhost:3000/api/todos`
  + todo[title] = 'eat healthier'
  + todo[body] = 'eat healthier for the next month'
  + todo[done] = false
  + todo[tag_names][] = 'lifestyle'
Point out why this creates a nested state by showing logger in chrome's console. Best practice is that Redux's slices of state should mimic the DB's schema. We do not have a column "tags" in the schema so we shouldnt have a key "tags" in the todos slice of state.

5) Currently, rails is creating a json output. comment out the json render method. Instead, `render :show`.

6) In the `views` directory, create an `api/todos/show.json.jbuilder` file.
We will be going over the many ways to do display the same information using Jbuilder.

  + We will be coding everything but todos' `tags`. We'll do that later.

    ```ruby
    # Method 1
    # statically defining keys of json object

    json.id @todo.id
    json.title @todo.title
    json.body @todo.body
    json.done @todo.done

    # Method 2
    # dymanically define attribute and structure names of json object
    json.set! :id, @todo.id
    json.set! :title, @todo.title
    json.set! :body, @todo.body
    json.set! :done, @todo.done

    # Method 3
    # using extract!
    json.extract! @todo, :id, :title, :body, :done, :created_at, :updated_at
    ```

After showing this, do a Postman request to `/api/todos` and see that you get an
array of `Todo` objects. Note that based on the state shape we desire we are 
going to change this to an object that matches our desired state shape, however
for demonstration purposes let's see how we could do this with Jbuilder.

```ruby
json.array! @todos
```

`json.array!` creates an _array of objects_. If we want to pull specific attributes
out of the objects we specify that _inside the block_

```ruby
json.array! @todos do |todo|
  json.extract! todo, :id, :title, :body, :done
end
```
  
7) Now, let's normalize this state shape in our views.

```ruby
  # api/todos/_todo.json.jbuilder
  json.set! todo.id do
    json.extract! todo, :id, :title, :body, :done
    # do not add :tags because this will create nested states!
  end

  # api/todos/show.json.jbuilder
  json.partial! 'todo', todo: @todo

  # api/todos/index.json.jbuilder
  @todos.each do |todo|
    json.partial! 'todo', todo: todo
  end
```

Note: The first argument of json.partial! is treated very similarly to how you render views in your controller. If you are in the same views directory, you dont have to type in the full path from the `views` directory.

8) Refactor other `TodosController` controller actions.

```ruby
# todos_controller.rb
def index
  # render json: Todo.all.where(user_id: current_user.id), include: :tags
  @todos = Todo.all.where(user_id: current_user.id)
  render :index
end

def show
  @todo = current_user.todos.find(params[:id])
  # render json: Todo.find(params[:id]), include: :tags
  render :show
end

# make sure you also update this method or the undo/done toggle button doesnt work
def update
  @todo = Todo.find(params[:id])
  if @todo.update(todo_params)
    # render json: @todo, include: :tags
    render :show
  end
end

def destroy
  @todo = current_user.todos.find(params[:id])
  @todo.destroy
  # render json: @todo, include: :tags
  render json: @todo.id
end
```

On another Postman tab, create another todo and compare the output before and now. Use another Postman tab to fetch all the todos and make sure it looks like what we would expect it to looks like.

Log back into the app in Chrome, and see that the page is breaking. Open up the
console and have them tell you where the error is (we're teaching them to debug).
The error is in the reducer because we were previously getting a response back
of an array, but now we have an object.

9) Refactoring todos reducer to handle our current normalized state shape.

```js
  // todos_reducer.js
  switch(action.type){
    case RECEIVE_TODOS:
      // action.todos.forEach( todo => {
      //   nextState[todo.id] = todo;
      // });
      // return nextState;
      return action.todos;
    case RECEIVE_TODO:
      // const newTodo = { [action.todo.id]: action.todo };
      // return merge({}, state, newTodo);
      return Object.assign({}, state, action.todo)
```

Point out how much simpler our reducer logic has become. We let our back-end
do the heavy lifting for us so the front end logic is reduced. Emphasize that
**our Jbuilder views serve the purpose of curating data for our front-end.**

Open up the app. See that our main page is loading properly but when we try to 
click into a detail view it breaks. This is because our show view used to 
including tags in the response that it returned but it no longer is. You can 
update the `todo` partial quickly to add back the tags and show them that it
works to prove it to them.

Break them for 10 minutes and ask them to think about what our state shape 
should look like to properly normalize todos, tags, and taggings (the joins 
table) while they are on break.

## Code Demo Break

## Demo Part 2 (45 mins)

Bring them back and ask for some ideas on what state shape should look like. If
you want, you could have them draw it on the whiteboard.

1) This is what we are going for - each table should have it's own, dedicated
slice of state.

```js
state: {
  todos: {},
  tags: {},
  taggings: {},
  steps: {},
  users: {}
}
```

These keys should match your tables names in the `schema.db` file!

### Situation

This is kind of a tricky situation. We want to fetch the tags, and it makes 
sense to fetch them with the todo, rather than make an entirely separate AJAX
call altogether to fetch them separately, since we will always want to display
the tags with the todo. So the question becomes, how can we keep them separate,
while fetching them together?

Remember that every reducer responds to every action. Mostly we've had one 
reducer respond to each of the actions we've made, but there's nothing that says
we can't have multiple reducers respond to a single action. In fact, that is 
actually something quite powerful. We can restructure our Jbuilder file for
todos to not just return todo information but also `tags` and `taggings` (the 
joins table) information.

Since our response will no longer just contain todo information, we will have
three top-level keys in the response - `todo`, `tags`, and `taggings`. Then, 
each reducer can easily grab its respective chunk of information.

2) Refactor corresponding JBuilder files to render tags correctly.

Start with todo

```ruby
# api/todos/show.json.jbuilder
json.todo do
  json.partial! 'todo', todo: @todo
end
```

Test this out in Postman to see how the response looks different. Point out how
now all of our todo information is nested under the key of `todo`. We can 
similarly add keys like this for the associated `tags` and `taggings` 
information, and each reducer can grab what it needs!

Now go to Chrome - see that the app is broken and again have them debug with 
you. The problem was with the reducer again - re-iterate that the purpose of
Jbuilder is to curate data for our front-end. The reducer logic is always going
to be based off of the type of response we are sending from our server, since
that is the data that gets sent in our action. Refactor the `todosReducer` as
follows

```js
const todosReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch (action.type) {
    case RECEIVE_TODOS:
      return action.todos;
    case RECEIVE_TODO:
      const newTodo = { [action.todo.todo.id]: action.todo.todo };
      return Object.assign({}, state, newTodo);
    case REMOVE_TODO:
      nextState = Object.assign({}, state);
      delete nextState[action.todo.id];
      return nextState;
    default:
      return state;
  }
};
```

Point out that this is awkward. Since our response is now sending multiple 
pieces of data it doesn't make sense to call it `todo`. It's not just a todo
anymore. Rename it to either `payload` or `data` and show that its more semantic.

Ask the class what we'll need to update to make that happen. Again we need to 
update the reducer, but this time the actions as well. These kinds of questions
will really make them think about the cycle and how information flows through so
ask them as much as possible. Make the appropriate updates in these files.

Change actions argument to `payload` of the `todos_action.js`

```js
export const receiveTodo = payload => ({
  type: RECEIVE_TODO,
  payload
});

export const removeTodo = todoId => ({
  type: REMOVE_TODO,
  todoId
});
```

Refactor `todos_reducer.js` to reference payload.

```js
case RECEIVE_TODOS:
  return action.todos;
case RECEIVE_TODO:
  return Object.assign({}, state, action.payload.todo);
case REMOVE_TODO:
  nextState = merge({}, state);
  delete nextState[action.todoId];
  return nextState;
```

Finally add in taggings/tags. Start with the partials and then incorporate them
into the larger todos views.

```ruby
# api/tags/_tag.json.jbuilder
json.set! tag.id do
  json.extract! tag, :id, :name
end

# api/taggings/_tagging.json.jbuilder
json.set! tagging.id do
  json.extract! tagging, :id, :todo_id, :tag_id
end

# api/todos/show.json.jbuilder
json.todo do
  json.partial! 'todo', todo: @todo
end

json.taggings do
  @todo.taggings.each do |tagging|
    json.partial! 'api/taggings/tagging', tagging: tagging
  end
end

json.tags do
  @todo.tags.each do |tag|
    json.partial! 'api/tags/tag', tag: tag
  end
end
```

3) Hop into Postman and see what the response looks like now. Note that our 
frontend still isn't able to render this information. Comment out the code in
the `TodoDetailView` that is causing the code to break and open up a todo. Note
that the logger shows our action contains the payload with tags and taggings - 
so how do we get that into state? Reducers!

### Add tags and taggings reducers

Currently, the tags are nested in the todos. Let's normalize our state shape!

1) Create `tags_reducer.jsx` and `taggings_reducer.jsx`

```js
import { RECEIVE_TODO } from '../actions/todo_actions';
import merge from 'lodash/merge';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type){
    case RECEIVE_TODOS:
      return action.payload.tags;
    case RECEIVE_TODO:
      return merge({}, state, action.payload.tags);
    default:
      return state;
  }
};

export default tagsReducer;
```

```js
import { RECEIVE_TODOS, RECEIVE_TODO, REMOVE_TODO } from '../actions/todo_actions';

const taggingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.payload.taggings;
    case RECEIVE_TODO:
      return Object.assign({}, state, action.payload.taggings)
    case REMOVE_TODO:
      let nextState = Object.assign({}, state);
      let taggingsArray = Object.values(nextState);
      taggingsArray.forEach(tagging => {
        if (tagging.todoId === action.todoId) delete nextState[tagging.id];
      });
      return nextState;
    default:
      return state;
  }
}

export default taggingsReducer;
```

Make sure to import and add these to the `rootReducer`

2) Add to the `todo_detail_view_container.jsx`

+ Open up `todo_detail_view.jsx` and see how previously `tags` was being keyed into since it was a property on `todos` in state, and we are trying to map over it. Since we have changed state we need to refactor
+ Go over `ownProps`
+ Add the following to `selectors.js`. 
+ Point out that our rails is returning snake-cased keys - for now we'll just
accept that, but we'll see something cool we can do in a bit that will allow us
to stick to convention on both sides.

```js
export const tagsByTodoId = (state, todoId) => {
  return Object.values(state.taggings)
    .filter(tagging => tagging.todo_id === todoId)
    .map(tagging => state.tags[tagging.tag_id])
}
```

Add the following to `todos_detail_view_container.jsx`. Make sure to import
`fetchTodo` from `todo_actions.js`.
```js
const mapStateToProps = (state, { todo }) => ({
    tags: tagsByTodoId(state, todo.id)
})

const mapDispatchToProps = (dispatch, { todo }) => ({
  requestSteps: () => dispatch(requestSteps(todo.id)),
  fetchTodo: (id) => dispatch(fetchTodo(todo.id)),
  destroyTodo: () => dispatch(deleteTodo(todo))
});
```

3) The foreign keys returned from our server are in snake_case, but we would like them in camelCase... how can we get around this? Add the following to `environment.rb` and RESTART THE SERVER.

```rb
Jbuilder.key_format camelize: :lower
```

Also make sure to change other snake_cased foreign keys of `todo_id` and `tag_id` 
to camelCase in the selectors file. You'll need to update the `stepsByTodoId` 
selector as well!

4) Change `todos_detail_view.jsx`
```jsx
  const { todo, tags, destroyTodo } = this.props;

  // { todo.tags.map( ... )}
  { tags.map(tag => <li key={ tag.id }>{ tag.name }</li>)}
```

Show that it works. Beautiful

If time allows, refactor the back-end response to return steps as well and get
all info when we request the todo. Point out that the separate route can still 
exist but when we want to show the todo detail view we need all of this stuff
so we might as well get it in one response.

Can also show refactoring delete to only take an id since it's all we'll ever
need to delete (unless it has a foreign key referencing associated data that 
would also need to update and remove its reference to the destroyed entity).
