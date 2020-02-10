# graphql-with-express

Create a GraphQL service with express-graphql

## Filter Data in Browser

### Get On User

Query Window

```js
query getUserById ($userId: Int!) {
  user(id: $userId) {
    id
    name
    phone
    address{
      city
      street
    }
  }
}
```

Query Variables Window

```js
{
  "userId": 7
}
```

### Get Two Users

Query Window

```js
query getTwoUsers($userId1: Int!, $secondUserId: Int!) {
  firstUser: user(id: $userId1) {
    ...userFields
  }
  user2: user(id: $secondUserId) {
    ...userFields
  }
}

fragment userFields on User {
  id
  name
  username
  phone
}
```

Query Variables Window

```js
{
  "userId1": 7,
  "secondUserId": 3
}
```

### Mutation on User

Mutation Window

```js
mutation updateUserName($userId1: Int!, $userName: String!) {
  newUser: updateUserName(id: $userId1, name: $userName) {
    ...userFields
  }

}

fragment userFields on User {
  id
  name
  username
  phone
}
```

Query Variables Window

```js
{
  "userId1": 7,
  "userName": "Obi Wan, Kenobi"
}
```