const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    ToiletsCount: Int
    savedToilets: [Toilet]
  }

  type Toilet {
    toiletId: ID!
    name: String
    description: String
    image: String
    link: String
    lat: Number!
    lng: Number!
  }

  type Auth {
    token: ID!
    user: User
  }

  input toiletInput {
    name: String
    description: String!
    toiletId: String!
    image: String
    link: String
    lat: Number!
    lng: Number!
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveMyToilet(toiletData: ToiletInput!): User
    removeMyToilet(toiletId: String!): User
    
  }
`;

module.exports = typeDefs;