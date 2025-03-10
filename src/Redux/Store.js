import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";  // ✅ Named import
import { eventReducer } from "./eventSlice"; // ✅ Named import

const store = configureStore({
  reducer: {
    auth: authReducer, 
    events: eventReducer, 
  },
});

export default store;
