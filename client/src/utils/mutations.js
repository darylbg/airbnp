import { gql } from '@apollo/client';

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
        rating
        title
        userId
      }
    }
  }
}`;


export const REGISTER = gql`
  mutation($userData: userInput!) {
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
  mutation updateUserDetails($firstName: String!, $lastName: String!, $username: String!, $image: String) {
    updateUserDetails(firstName: $firstName, lastName: $lastName, username: $username image: $image) {
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
      userId
      price
    }
  }
`;

