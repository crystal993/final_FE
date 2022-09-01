import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import user from './modules/user/userSlice';

const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  user,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
