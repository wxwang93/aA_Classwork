## Tea Time

## Before diving into slides!

## Phase 1 - Review what we've done and check out cool new styling!
1. Walk them through the app as it exists. We've added some styling to this site as we're starting to attract a lot of business and need to build our online presence. Walk through the tea form in case they haven't received an explanation yet on React forms and controller inputs in previous lectures. Don't spend too long as they should have done it in the project yesterday, but walk through the key parts like tying input values to state, the `update` function that handles input `onChange`s and the `handleSubmit` that dispatches our thunk action to create a tea in the DB.

2. Show them the additional info we are storing in the DB now
    * Teas (description field, have many transactions & likes)
    * Users (have many transactions & likes)
    * Transactions (belong to user & tea)
    * Likes (belong to user & tea)

## GO TO SLIDES ##

## Phase 2 - Reworking controller actions to curate data using JBuilder

1. Visit `localhost:3000/api/teas` - currently our index & create actions are returning the entire information about the tea. In reality, all we need to immediately display on the index is the `flavor` and `amount`. Let's refactor our index action to only return this. The description will be shown when we actually want to display the detail of the tea so we can fetch that in the `show` action. Additionally our index action returns an array, but we know that our state is organized as an object where the keys are ids and the values are the objects themselves. Let's have our back-end return a response already formatted like that. 

2. Refactor the `index` controller action to use an instance variable and `render :index` instead of directly rendering json of the tea. 

3. Create an `index.json.jbuilder` view inside of `/api/teas` as follows:

```rb
@teas.each do |tea|
  json.set! tea.id do
    json.id tea.id
    json.flavor tea.flavor
    json.amount tea.amount
  end
end
```

4. Try to visit `localhost:3000/api/teas` - oh no what happened? It seems to think a template is missing, but we just made one... let's check the server. Point out the line in the request that says `Processing by Api::TeasController#index as HTML`. Our controller is looking for an HTML view, not a JSON one. Fix this in your routes file by setting the default format to JSON for the api namespace:

```rb
namespace :api, defaults: { format: :json } do
  resources :teas, only: [:index, :create]
end
```

5. Great, it's working! The JSON view is pretty simple, but what if we had a large amount of columns we wanted to extract? It would be cumbersome to write it all out - `json.extract!` to the rescue! Refactor the innermost block of the jbuilder view as follows:

```rb
json.extract! tea, :id, :flavor, :amount
```

If we really wanted to extract every single column (we don't in our case) we could do something fancy like this:

```rb
json.extract! tea, *tea.attributes.keys
```

That's cool, but we don't need the description or timestamps for our index view so let's explicitly extract what we need (revert to previous way extracting only id, flavor, and amount).

6. Let's do a similar thing for `create`, and only return the basic info for a tea when we create it. Refactor controller action to use an instance variable and `render :info`. It should look like this:

```rb
json.extract! @tea, :id, :flavor, :amount
```

7. Cool, how can we test this out? Since this isn't just a `GET` request we need an HTTP client - let's visit our old friend Postman! You'll get an error initially when trying to make the `POST` request - remember when we're testing using Postman we need to temporarily disable CSRF protection. Add `skip_before_action :verify_authenticity_token` to `application_controller.rb`

8. Working pretty well! Is there anything about our code that seems not so DRY? We're duplication logic between the `index` and `info` views - let's refactor to use a partial. Create `_tea.json.jbuilder` as follows:

```rb
json.extract! tea, :id, :flavor, :amount
```

Refactor the index & info pages to use the partial:

```rb
# index.json.jbuilder
@teas.each do |tea|
  json.set! tea.id do
    json.partial! 'tea', tea: tea
  end
end

# info.json.jbuilder
json.partial! 'tea', tea: @tea
```

9. Take any outstanding questions at this point. Let's look at our app again, it's been a minute. Oh no! Where did all the teas go? Open up console, notice some of the errors happening - `action.teas.forEach` is not a function. Ask the class if anyone can walk you through what's happening.

10. Our index was returning an array before, now it's returning an object. We need to refactor our reducer. In fact, we can make it a lot simpler. No need to iterate through an array and structure this object, our JSON response already mirrors state. Refactor the `RECEIVE_TEAS` case to look like this:

```js
return Object.assign(nextState, action.teas);

// OR

return {...state, ...action.teas}; // spread operator is siiickk
```

11. Try creating the tea - note that it is unaffected. Our JSON response for this is still structured the same, the only difference is the object isn't carrying any unnecessary info.

12. Answer any questions and take a break.

## BACK TO SLIDES ##

## Phase 3 - Fetching a Tea Detail

1. Okay, so now we want to fetch a tea's detail. We saw a wireframe of what we want this to look like. We also saw what we want the state shape to look like such that it is normalized. The question now is what should the JSON response look like on our back-end and how do we receive it on our front-end? Before getting to the React component side of things we need to make sure the data is handled properly and exists in state according to the principles described.

2. When we fetch a tea's detail we aren't just fetching information about the tea. We are also fetching transaction, user, and like information. Therefore our JSON response should contain all of these things.  We'll start with just transactions for now and bring likes in later if we have time. But we know all of this information should be stored by different reducers on the front-end so how do we manage that? Well remember that every action gets sent to every reducer - that means multiple reducers can respond to the same action. We can structure our JSON response to have multiple top-level keys and each reducer can respond to the action, and grab only the part of the payload that it needs. Let's start to build it out.

3. Add a `show` route in `routes.rb` and build the controller action. This part should look familiar:

```rb
def show 
  @tea = Tea.find(params[:id])
  render :show
end
```

4. Let's go into the show view, let's get the basic structure setup first (need dummy attributes so that something shows up in the response):

```rb
json.tea do
  json.dummy 'hi'
end

json.transactions do
  json.dummy 'hi'
end
```

5. Let's start filling this in - let's start with the tea. This is pretty simple, even though we've already fetched the flavor & amount in the index view, we want our JSON responses to be self-contained. We'll extract that info along with the description

```rb
json.tea do
  json.extract! @tea, :id, :flavor, :amount, :description
end
```

6. Okay now for the tougher part. How can we get all the transactions we would need to display for this tea? Remember Rails associations, those are going to come in great handy here. Since a tea _has many_ transactions, we know that multiple transactions will be returned. Let's structure this just like the transactions reducer would like to receive it, and similar to how we did our tea index. We can do it like this:

```rb
json.transactions do
  @tea.transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :quantity, :created_at
      json.customer transaction.user.username
    end
  end
end
```

Note the similarity with the tea index, just one level deeper because we're nesting under a top level key of `transactions`. Also note here we store the customer's name directly on the transaction - this goes against our principle of normalization. In this case it's a design decision mostly for the purposes of keeping the demo simple. It is also more acceptable, however, since storing this data does not require further nesting and it is just one field from the users table. As with most things normalization is the standard to strive towards, but exceptions can be made, and in this case it's much simpler and not too costly to store the customer's name directly on the transaction object.

7. Okay cool we have the transactions in this response, but when we add them into our Redux state we need to know which transaction is associated with each tea, and furthermore if we're looking at a tea, we need to know what transactions are associated with it. But we don't want to nest the data. This is where normalization comes in to play. Refactor the extract statements as follows:

```rb
# tea extract
json.extract! @tea, :id, :flavor, :amount, :description, :transaction_ids

# transaction extract
json.extract! transaction, :id, :quantity, :created_at, :tea_id
```

`transaction_ids` is a getter method we get because of our `has_many :transactions` association in our `Tea` model. Gotta love that good ole' Rails magic. Take a look at the JSON response - looking pretty good!

8. Now that we have the JSON response curated, it's time to build out the Redux cycle to get this state. Let's start with the API Util (getting some audience participation for building out the redux cycle is highly recommended). Build the following api util inside of `tea_api_util.js`:

```js
export const fetchTea = teaId => {
  return $.ajax({
    url: `/api/teas/${teaId}`,
    method: 'GET'
  });
}
```

We should always test at every step -> let's test out the AJAX call, import it in the entry point, throw it on the window, make the call and in the `.then` console log the response to confirm it looks as we expect. Awesome! Look at that nicely organized JSON response. This will make writing our reducer logic simple.

9. Before we get to the reducers, though, we need to deal with actions. Generally the workflow should be API Util -> Actions -> Reducers. Let's build out the actions then. Add the following to `tea_actions.js`:

```js
export const RECEIVE_TEA_DETAIL = 'RECEIVE_TEA_DETAIL';

const receiveTeaDetail = payload => {
  return {
    type: RECEIVE_TEA_DETAIL,
    payload
  }
}

export const requestTea = teaId => dispathc => {
  return TeaApiUtil.fetchTea(teaId)
    .then(payload => dispatch(receiveTeaDetail(payload)))
};
```

A few things to note here:
  * We call the argument `payload` because it's not just a tea - it's a tea and the transactions that go along with it. It has a top-level property of `tea` that would make it awkward in the reducer as we'd be saying something like `action.tea.tea`.
  * We don't export the regular action creator - generally we'll only be exporting the thunk action creators and using those in our React components. They've already closed over the regular action creators so there's no need for us to export those.

9. Let's test it out on the window! Cool looks like the action is dispatching, but nothing's really happening because well none of our reducers are programmed to respond to this action yet! Let's first deal with the tea reducer and add in this new action:

```js
import { RECEIVE_TEA, RECEIVE_TEAS, RECEIVE_TEA_DETAIL } from '../actions/tea_actions'

// ...
case RECEIVE_TEA_DETAIL:
  nextState[action.payload.tea.id] = action.payload.tea;
  return nextState;
```

Test out dispatching the action on the window for one of the teas - see in `nextState` that it's description and transaction ids have entered state. Awesome!

10. Now remember, multiple reducers can respond to multiple actions - that means that we can build a transactions reducer to manager the transactions slice of state that will also respond to this action. Let's do that. While writing out the reducer, maybe throw a debugger in the case statement before actually writing the logic so students can see what the payload looks like and get a better idea of how to handle it. This is what `transactions_reducer.js` should look like when you're done:

```js
import { RECEIVE_TEA_DETAIL } from '../actions/tea_actions';

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TEA_DETAIL:
      return {...state, ...action.payload.transactions};
    default:
      return state;
  }
}

export default transactionsReducer;
```

11. Import and add the transactions reducer to the root reducer.

12. Beautiful, the transactions are properly in state! One thing that's not ideal is that `tea_id` and `transaction_ids` are snake_cased. JavaScript uses camelCase. There's a cool trick we can do to configure our Rails app to "camelize" the output of our Jbuilder files. Add the following to `config/environment.rb`:

```rb
Jbuilder.key_format camelize: :lower
```

Don't forget to restart the server to see the change! Alright, that's been a lot, let's **take a 5 minute break** and get this information to render in React.

## Phase 4 - Rendering the `TeaDetail` view and using selectors

1. Alright let's get into rendering the detail view. Some React stuff has already been setup so that the `TeaDetail` will render on click. Ultimately this component will need to know the tea that it needs to render along with the transactions it needs to render. How will we be able to determine this info, given that these occupy different parts of state? Remember that our tea in state maintains an array of `transactionIds` - we can map over this array and key into the transactions slice of state at each of these ids to build an array of relevant transactions! Sounds a little complicated - this is a great case for something that should be a selector. Add the following to `selectors.js` (have a student volunteer to do it):

```js
export const selectTransactionsByTea = (state, teaId) => {
  return state.teas[teaId].transactionIds
    .map(transactionId => state.transactions[transactionId]);
}
```

Import on the window and test it out. Make sure to call the thunk action on the window to get the transactions into state (maybe do it for a few teas to prove the selector really works and isn't just grabbing all transactions in state).

2. Cool, so the selector is working. The selector relies on the Redux state to operate, meaning that we need to make this a connected component so it can connect to the store. Let's build a `TeaDetailContainer`. Do the standard component setup and start to write `mapStateToProps`. The selector need to know the tea's id - how can we know this? We could pass it in as a prop when we render the `TeaDetailContainer` in `TeaIndexItem`, but can we access props like that inside of a container? Actually, we can! Both `mapStateToProps` and `mapDispatchToProps` accept a second argument - `ownProps`. This argument represents the props threaded directly through to the component. We can thread through the tea's id and use this in here. So far the container should look like this:

```js
import { connect } from 'react-redux';
import TeaDetail from './tea_detail';
import { requestTea } from '../actions/tea_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    tea: state.teas[ownProps.teaId],
    transactions: selectTransactionsByTea(state, ownProps.teaId)
  }
}
```

3. Great, we are subscribing to those parts of state. But if this component cares about rendering those things, then it also needs to take responsibility for fetching them. That means we need `mapDispatchToProps`. Add it and export the component:

```js
const mapDispatchToProps = dispatch => {
  return {
    requestTea: teaId => dispatch(requestTea(teaId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeaDetail);
```

4. Rework `TeaIndexItem` to import and render the container instead of the presentational component. Refresh the page and try clicking on an index item. Oh no, we got an error! Undefined property map, hmm... This is tricky but we don't have `transactionIds` for our todo until we fetch them. That means the selector is going to break. Let's add logic to account for this edge case. Refactor the selector as follows:

```js
export const selectTransactionsByTea = (state, teaId) => {
  if (state.teas[teaId].transactionIds === undefined) return [];
  
  return state.teas[teaId].transactionIds
    .map(transactionId => state.transactions[transactionId]);
}
```

5. Great, it's no longer breaking, but now we need to actually fetch the info - `componentDidMount` is where this logic should go.

```js
componentDidMount() {
  this.props.requestTea(this.props.teaId);
}
```

Click on an index item, see that Redux state updates, and use ReactDevTools to inspect the props of the component you just rendered to make sure it looks right. We are super close now!

6. We have the data in! Now it's just a matter of rendering it. I know the process has seemed pretty crazy so far, but by being smart about how we've managed our data thus far, rendering the info is going to be a breeze. Write out this render (make sure to use the right class names so it styles nicely :)):

```js
render() {
    const { tea, transactions } = this.props;

    return (
      <div className="tea-detail">
        <div className="tea-description">
          {tea.description}
        </div>
        <ul className="tea-transactions">
          <div className="tea-transaction columns">
            <p>Customer</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>

          {transactions.map(transaction => {
            return (
              <div className="tea-transaction" key={transaction.id}>
                <p>{transaction.customer}</p>
                <p>{transaction.quantity}</p>
                <p>${tea.amount}</p>
                <p>${tea.amount * transaction.quantity}</p>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }
```

7. If you somehow have more time you can add some likers in and display below transactions (no built-in styling for that tho :().