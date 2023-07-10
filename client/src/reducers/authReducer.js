import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: {
      token: "",
      userId: "",
      username: "",
      firstName: '',
      lastName: '',
      email: '',
      listings: []
    },
  },
  reducers: {
    // login_user(state, action) {
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     user: {
    //       token: action.payload.token,
    //       userId: action.payload.userId,
    //       username: action.payload.username,
    //       firstName: action.payload.firstName,
    //       lastName: action.payload.lastName,
    //       email: action.payload.email,
    //       listings: action.payload.listings
    //     },
    //   };
    // },

    login_user(state, action) {
      const { token, userId, username, firstName, lastName, email, listings } = action.payload;
      const selectedNotifications = notifications.map(notification => ({
        id: notification.id,
        listingId: notification.listingId,
        arrivingBy: notification.arrivingBy,
        createdAt: notification.createdAt
      }));
      const selectedListings = listings.map(listing => ({
        id: listing.id,
        userId: listing.userId,
        title: listing.title,
        lat: listing.lat,
        lng: listing.lng,
        address: listing.address,
        description: listing.description,
        image: listing.image,
        price: listing.price,
        notifications: selectedNotifications,
        ratings: selectedRatings
      }));
    
      return {
        ...state,
        isLoggedIn: true,
        user: {
          token,
          userId,
          username,
          firstName,
          lastName,
          email,
          listings: selectedListings
        },
      };
    },

    logout(state) {
      return {
        ...state,
        isLoggedIn: false,
        user: {
            token: "",
            userId: "",
            username: "",
            firstName: '',
            lastName: '',
            email: '',
            listings: []
        },
      };
    },

    register_user(state, action) {
      return {
        ...state,
        isLoggedIn: true,
        user: {
            token: action.payload.token,
            userId: action.payload.userId,
            username: action.payload.username,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            listings: action.payload.listings
        },
      };
    },
  },
});

export const { login_user, logout, register_user } = authReducer.actions;
export default authReducer.reducer;
