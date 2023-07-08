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
    login_user(state, action) {
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

    signup_user(state, action) {
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

export const { login_user, logout, signup_user } = authReducer.actions;
export default authReducer.reducer;
