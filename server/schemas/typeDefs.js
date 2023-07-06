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
    userId: [User]
    price: Int
    rating: Int
    notifications: [Notification]
  }

  type Notification {
    listingId: [Listing]
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

 

  input listingInput {
    name: String
    description: String!
    toiletId: String!
    image: String
    link: String
    lat: Float!
    lng: Float! 
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(userData: userInput!): Auth
    createListing(userId: ID!, listingData: listingInput!): Listing
    updateListing(listingId: ID!, listingData: listingInput!): Listing
    removeListing(listingId: ID!): User
    createNotification(listingId: ID!): Notification
    removeNotification(listingId: ID!): Listing
  }
`;

module.exports = typeDefs;