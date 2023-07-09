import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    // Initial state for user details
    firstName: "",
    lastName: "",
    email: "",
    // other user details...
  },
  reducers: {
    updateUserDetails(state, action) {
      // Handle updating specific user details based on action payload
      // For example:
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      // Update other user details as needed
    },
  },
});

export const { updateUserDetails } = userReducer.actions;
export default userReducer.reducer;
