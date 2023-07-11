import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import listingsReducer from "./reducers/listingsReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    // listing: listingsReducer
  },
});
