import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import marketPost from "./modules/market/postSlice";

const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  marketPost,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
