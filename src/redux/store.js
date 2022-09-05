import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import marketPost from "./modules/market/postSlice";
import user from "./modules/user/userSlice";
import mainFilter from "./modules/filter/mainFilterSlice";
import comment from "./modules/market/commentSlice";

const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  marketPost,
  user,
  comment,
  mainFilter,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
