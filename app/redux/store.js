import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/Login/loginSlice";
import dataReducer from "./features/Data/datasSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    data: dataReducer,
  },
});
export default store;
