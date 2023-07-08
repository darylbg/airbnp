import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }

  mutation Mutation($userData: userInput!) {
    signup(userData: $userData) {
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
