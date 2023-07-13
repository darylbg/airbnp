import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
        firstName
        image
        lastName
        listings {
          description
          image
          address
          lat
          lng
          notifications {
            arrivingBy
            createdAt
            listingId
            userId
          }
          price
          ratings {
            comment
            createdAt
            listingId
            rating
            userId
          }
          title
          userId
        }
      }
    }
  }
`;

export const REGISTER = gql`
  mutation ($userData: userInput!) {
    register(userData: $userData) {
      token
      user {
        email
        firstName
        lastName
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserDetails(
    $firstName: String!
    $lastName: String!
    $username: String!
    $image: String
  ) {
    updateUserDetails(
      firstName: $firstName
      lastName: $lastName
      username: $username
      image: $image
    ) {
      firstName
      lastName
      username
      image
    }
  }
`;

export const CREATE_LISTING = gql`
  mutation createListing($listingData: listingInput!) {
    createListing(listingData: $listingData) {
      title
      lat
      lng
      address
      description
      image
      # userId
      price
    }
  }
`;

export const UPDATE_LISTING = gql`
  mutation updateListing($listingId: ID!, $listingData: listingInput!) {
    updateListing(listingId: $listingId, listingData: $listingData) {
      _id
      title
      address
      lat
      lng
      description
      image
      price
      # userId
    }
  }
`;

export const DELETE_LISTING = gql`
  mutation removeListing($listingId: ID!) {
    removeListing(listingId: $listingId) {
      _id
    }
  }
`;
