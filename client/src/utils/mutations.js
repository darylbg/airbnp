import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  `;


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
  mutation UpdateUserDetails($firstName: String!, $lastName: String!, $email: String!) {
    updateUserDetails(firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
      email
    }
  }
`;

