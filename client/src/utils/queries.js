import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query GetUser {
    user {
      _id
      username
      email
      firstName
      lastName
      image
    }
  }
`;

export const QUERY_LISTINGS = gql`
  query GetAllListings {
    getAllListings {
      title
      description
      image
    }
  }
`;