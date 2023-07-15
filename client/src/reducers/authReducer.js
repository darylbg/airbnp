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
      image: '',
      listings: []
    },
  },
  reducers: {
    login_user(state, action) {
      console.log(action.payload);
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
          image: action.payload.image,
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
            image: '',
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
            image: action.payload.image,
            listings: action.payload.listings
        },
      };
    },
  },
});

export const { login_user, logout, register_user } = authReducer.actions;
export default authReducer.reducer;
