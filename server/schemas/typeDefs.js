const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    listings: [Listing]
  }

  type Listing {
    title: String!
    lat: Float!
    lng: Float! 
    address: String
    description: String
    image: String
    userId: ID!
    price: Int
    rating: Int
    notifications: [Notification]
  }

  type Notification {
    listingId: ID!
    userId: ID!
    arrivingBy: String
    createdAt: String
  }

  type Rating {
    listingId: ID!
    userId: ID!
    createdAt: String
    rating: Int
    comment: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input listingInput {
    title: String
    lat: Float
    lng: Float
    address: String!
    description: String!
    image: String
    userId: ID!
    price: Int!
  }

  input userInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    user: User
    getAllListings: [Listing]
    getListingById(listingId: ID!): Listing
    searchUser(username: String!): [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(userData: userInput!): Auth
    createListing(listingData: listingInput!): Listing
    updateListing(listingId: ID!, listingData: listingInput!): Listing
    removeListing(listingId: ID!): User
    createNotification(listingId: ID!, userId: ID! arrivingBy: String!): Listing
    removeNotification(notificationId: ID!, listingId: ID!): Listing
    createRating(listingId: ID!, rating: Int, comment: String): Listing
  }
`;

module.exports = typeDefs;