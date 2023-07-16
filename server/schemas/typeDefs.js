const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    listings: [Listing]
    image: String
  }

  type Listing {
    _id: ID!
    title: String!
    lat: Float!
    lng: Float! 
    address: String
    description: String
    image: String
    userId: ID!
    price: Float!
    isAvailable: Boolean
    ratings: [Rating]
    notifications: [Notification]
  }

  type Notification {
    _id: ID!
    listingId: ID!
    userId: ID!
    arrivingBy: String
    createdAt: String
  }

  type Rating {
    _id: ID!
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
    # userId: ID!
    price: Int!
    isAvailable: Boolean
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
    getListingByUserId: [Listing]
    searchUser(username: String!): [User]
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(userData: userInput!): Auth
    updateUserDetails(firstName: String!, lastName: String!, username: String!, image: String): User
    createListing( listingData: listingInput!): Listing
    updateListing(listingId: ID!, listingData: listingInput!): Listing
    removeListing(listingId: ID!): Listing
    createNotification(listingId: ID!, userId: ID! arrivingBy: String!): Listing
    removeNotification(notificationId: ID!, listingId: ID!): Listing
    createRating(listingId: ID!, rating: Int, comment: String): Listing
  }
`;

module.exports = typeDefs;