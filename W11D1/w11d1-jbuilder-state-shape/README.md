# Normalized State w/ Jbuilder

Note:
**Before going into slides review the code demo and changes made since the last
time they have seen it (see demo README for more info)**

---

## Agenda

+ Today's Material
  + Using Jbuilder
  + Normalizing State Shape
  + Common Bugs
+ Quiz

---

## Learning Objectives

1) Use `Jbuilder` to curate normalized JSON response from server
1) Be able to describe normalization and its benefits
1) Implement a normalized Redux state properly mapping associations between data
1) Debug your application

---


## Jbuilder

---

## Jbuilder Basics

+ `Jbuilder` is a simple DSL tool to declare JSON structures
+ This will replace the `render json: @variable` of a controller's action
  + Instead, we will be rendering a `.json.jbuilder` file
+ We can sculpt response objects to have the same shape as our state

---

## Code Demo Part 1 - Refactor Existing Code to use Jbuilder

---

#### The way you organize your store in Redux changes the way you access data later on in your components and reducers. If you don't organize your store well, you end up doing more work.

---

## What is normalization?

---

## Bad State

```js
const posts = [
  {
    id : 1,
    author : { id: 1, username : "user1", name : "User 1" },
    body : "......",
    comments : [
      {
        id : 1,
        author : { id: 2, username : "user2", name : "User 2" },
        body : ".....",
      },
      {
        id : 2,
        author : { id: 3, username : "user3", name : "User 3" },
        body : ".....",
      }
    ],
    likers : [
      {
        id : 1,
        username : "user2", 
        name : "User 2"
      },
      {
        id : 2,
        username : "user3",
        name : "User 3"
      }
    ]
  }
]
```

---

![drake-nah](https://img2.thejournal.ie/answer/56053/rectangle/?width=260&version=53089)

---

## Good State

```js
{
  posts : {
    1 : {
      id : 1,
      authorId : 1,
      body : "......",
      commentIds : [1, 2]
    }
  },
  comments : {
    1 : {
      id : 1,
      authorId : 2,
      body : ".....",
    },
    2 : {
      id : 2,
      authorId : 3,
      body : ".....",
    },
  },
  users : {
    1 : {
      id: 1,
      username : "user1",
      name : "User 1",
    },
    2 : {
      id: 2,
      username : "user2",
      name : "User 2",
    },
    3 : {
      id: 3,
      username : "user3",
      name : "User 3",
    }
  }, 
  likes : {
    1 : {
      id: 1,
      postId: 2,
      userId: 1
    },
    2 : {
      id: 2,
      postId: 1,
      userId: 2
    },
    3 : {
      id: 3,
      postId: 3,
      userId: 2
    }
  }
}
```

---

![drake-yah](https://img2.thejournal.ie/answer/56054/rectangle/?width=260&version=53090)

---

## Why Normalize State Shape
* Duplicated data is hard to manage
* Given an item's ID, we can access it instantenously 
  * Think back to Big O day
* Avoid complex logic in reducers to handle deeply nested objects
* Avoid unnecessary re-renders of connected components 

Note:
+ When we don't normalize state:
  + When data is duplicated in several places ==> it becomes harder to make sure that it is updated appropriately.
  + Nested data ==> corresponding reducer logic has to be more nested (therefore more complex). In particular, trying to update a deeply nested field can become very ugly very fast.
	+ Example: dont want to do comments logic in the post reducer.
  + Nested data leads to unneccessary re-renders of connected components
+ What are the cons of normalization?
  + Technically slower read time - with denormalization all of the information is right there and we don't need to look anywhere else for it.
  + But... keying into a hash is an O(1) operation - the difference in read time is negligible/infinitesimally small where it hardly makes a difference.
  

  [Source](https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)

---

### When you realize your state shape is bad

![sad-panda](https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif)

### 2 days before your project is due

---

## How to Normalize State Shape

+ Each type of data gets its "table" in the state.
  + POJO where keys are IDs of items, and values are item objects themselves.
  + Generally, for each table in DB there should be a corresponding slice of state.
+ Any references to other individual items should be done by storing the item's ID.
  + Arrays of IDs should be used to indicate ordering.

Note:

+ Because each item is only defined in one place, we don't have to try to make changes in multiple places if that item is updated.
  + The logic for retrieving or updating a given item is now fairly simple and consistent.  Given an item's type and its ID, we can directly look it up in a couple simple steps, without having to dig through other objects to find it.
  + The reducer logic doesn't have to deal with deep levels of nesting, so it will probably be much simpler.
  + Since each data type is separated, an update like changing the text of a comment would only require new copies of the "comments > byId > comment" portion of the tree.  This will generally mean fewer portions of the UI that need to update because their data has changed.  In contrast, updating a comment in the original nested shape would have required updating the comment object, the parent post object, the array of all post objects, and likely have caused all of the Post components and Comment components in the UI to re-render themselves.

---

## Normalizing associated data

* Data with `belongs_to` relationship stores ID of associated data
* Data with `has_many` relationship stores array of IDs of associated data
  * Does not apply to `has_many through` (i.e. joins)
* Joins tables occupy their own slice of state

Note:
Operations like "Look up all books by this author", can be accomplished easily with a single loop over the join table. Given the typical amounts of data in a client application and the speed of Javascript engines, this kind of operation is likely to have sufficiently fast performance for most use cases.

---

```js
{
  posts : {
    1 : {
      id : 1,
      authorId : 1, // posts belong to an author
      body : "......",
      commentIds : [1, 2] // posts have many comments
    }
  },
  comments : {
    1 : {
      id : 1,
      authorId : 2, // comments belong to an author
      body : ".....",
    },
    2 : {
      id : 2,
      authorId : 3, // comments belong to an author
      body : ".....",
    },
  },
  users : {
    1 : {
      id: 1,
      username : "user1",
      name : "User 1",
    },
    2 : {
      id: 2,
      username : "user2",
      name : "User 2",
    },
    3 : {
      id: 3,
      username : "user3",
      name : "User 3",
    }
  },
  likes : { // joins table occupies own slice of state
    1 : {
      id: 1,
      postId: 2,
      userId: 1
    },
    2 : {
      id: 2,
      postId: 1,
      userId: 2
    },
    3 : {
      id: 3,
      postId: 3,
      userId: 2
    }
  }
}
```

---

## Code Demo Part 2 - Normalized State with Associated Data

Note: 
We will be adding to our Tea Shop and creating normalized state as we go

---

## Wireframe of Finished Product

---

## State Shape

```js
{
  teas : {
    1 : {
      id : 1,
      flavor : "Green",
      amount : 1.75,
      transactionIds : [1, 2] // teas have many transactions
    }
  },
  transactions : {
    1 : {
      id : 1,
      quantity: 2,
      teaId : 1, // transactions belong to a tea
      customer : "RoRo"
    },
    2 : {
      id : 2,
      quantity: 1,
      teaId : 3, // transactions belong to a tea
      customer : "MishMosh"
    },
  },
  users : {
    1 : {
      id: 1,
      username : "RoRo",
    },
    2 : {
      id: 2,
      username : "MishMosh",
    },
    3 : {
      id: 3,
      username : "JenKen"
    }
  },
  likes : { // joins table occupies own slice of state
    1 : {
      id: 1,
      teaId: 2,
      userId: 1
    },
    2 : {
      id: 2,
      teaId: 1,
      userId: 2
    },
    3 : {
      id: 3,
      teaId: 3,
      userId: 2
    }
  }
}
```

Note: Switch to code demo after this slide

---

# Jbuilder Review

Note: 
This should come after the code demo is completely finished and should take about 30 minutes

---

## Jbuilder Common Methods

+ `extract!`
+ `set!`
+ `array!`
+ `partial!`

Fun Fact:
"!" means its a json method, not a key of a pojo.

---

## `extract!`

`extract!` is best when you want the object's key to match the column name.

```ruby
# @pupper = { id: 10, name: 'Phil', age: 2 }

json.extract! @pupper, :name, :age
```

```json
{"name": "Phil", "age": "2"}
```

---

## `set!`

`set!` is best used when you need to dynamically create a key

```rb
# @dog = { id: 10, name: 'Phil' }

json.set! @dog.id do
  json.extract! @dog, :name
end
```

```json
{ '10' : { "name": "Phil" } }
```

---

## `array!`

You can also extract attributes from array directly.


```rb
# @puppinos = [
#    { id: 10, name: 'Phil', fluffy: true},
#    { id: 15, name: 'Niko', fluffy: false }
#    ]

json.array! @puppinos, :fluffy, :name
```

```json
[
    {"name": "Phil", "fluffy": true}, 
    {"name": "Niko", "fluffy": false}
]
```

Note:

```ruby
#pure ruby
json.pup_ids @puppinos.map(&:name)
```

---

## `partial!`

```rb
#partial in `api/puppers/_pupper.json.jbuilder`

json.partial! 'api/pupper/pupper', pupper: @pupper
```

```json
{"name": "Phil", "age": "2"}
```

---

## Jbuilder case sensitivity

+ ruby to javascript
  + user_id ==> userId
+ Your redux state follows javascript convention.

```ruby
# environment.rb
Jbuilder.key_format camelize: :lower
```

---

## [Kahoot!](https://play.kahoot.it/v2/?quizId=e5e638fb-5857-4e04-9774-0906dfcaf5ce)

---

## Future State Shape

```js
{
  entities: {
    stocks: {
      1: {
        id: 1,
        name: "Starbucks",
        ticker: "SBUX",
        price: 52.00
      },
      2: {
        id: 2,
        name: "Twitter",
        ticker: "TWTR",
        price: 31.96
      },
      3: {
        id: 3,
        name: "Microsoft",
        ticker: "MSFT",
        price: 106.43
      },
    },
    users: {
      1: {
        id: 1,
        username: "Warren Buffett",
        imgUrl: "https://s3.amazonaws.com/easytrade/filename"
      },
      2: {
        id: 2,
        username: "Jordan Belfort",
        imgUrl: "https://s3.amazonaws.com/easytrade/filename"
      }
    },
    watches: { // joins table between stocks and users
      1: {
        id: 1,
        stockId: 3,
        userId: 1
      },
      2: {
        id: 2,
        stockId: 1,
        userId: 3
      },
      3: {
        id: 3,
        stockId: 3,
        userId: 2
      }
    },
  },
  ui: {
    loading: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"],
    tradeForm: ["Not enough buying power"],
  },
  session: { currentUserId: 1 }
}
```

Note:

While there is no single rule for exactly how those different types of data should be organized, one common pattern is to put the relational "tables" under a common parent key, such as "entities".

---

## Common Debugging Techniques

---

## When you hit a bug

1) Refresh again
1) Check if webpack is running
1) Check webpack's output
1) Check rails server logs

---

## Backend Errors

+ 404 Not Found
  + Check server log. Check routes.
+ 500 Internal
  + Check server log. Check params. Check controller.
  + Maybe coming from your database (missing validations)

---

## Frontend Errors

+ Importing (curly braces or no curly braces?)
+ Forgetting to export JSX components

Note:

+ View: Can't read property *x* of undefined (need default state in reducer)
