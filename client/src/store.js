// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/authReducer";
// import listingsReducer from "./reducers/listingsReducer";

// export default configureStore({
//   reducer: {
//     auth: authReducer,
//     // listing: listingsReducer
//   },
// });

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
