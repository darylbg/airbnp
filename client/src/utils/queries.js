import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      email
      firstName
      image
      lastName
      listings {
        _id
        address
        description
        image
        lat
        lng
        notifications {
          _id
          arrivingBy
          createdAt
          listingId
          userId
        }
        price
        ratings {
          _id
          comment
          createdAt
          listingId
          rating
          userId
        }
        title
      }
    }
  }
`;

export const QUERY_USER_LISTINGS = gql`
  query getListingByUserId {
    user { 
      _id
      listings {
        _id
        address
        description
        image
        lat
        lng
        price
        isAvailable
        title
        userId
        notifications {
          arrivingBy
          createdAt
          listingId
          userId
        }
        ratings {
          comment
          createdAt
          listingId
          rating
          userId
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_LISTINGS = gql`
  query getAllListings {
    getAllListings {
      _id
      address
      description
      image
      lat
      lng
      isAvailable
      notifications {
        _id
        arrivingBy
        createdAt
        listingId
        userId
      }
      price
      ratings {
        _id
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
`;
