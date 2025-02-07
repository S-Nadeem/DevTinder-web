import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import feedReducer from "./Slices/feedSlice";
import connectionsReducer from "./Slices/connectionsSlice";
import requestReducer from "./Slices/requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    request: requestReducer,
  },
});

export default appStore;
