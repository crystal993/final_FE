import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  userLogin,
  existMemberId,
  kakaoLogin,
} from './userActions';

// initialize userToken from local storage

const initialState = {
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem('access-token')
    ? localStorage.getItem('access-token')
    : null,
  error: null,
  success: false,
  idMsg: null, // 중복체크 메시지
  idErrorMsg: null, // 중복체크 아이디 메시지
  duplicateSuccess: false, // 중복 감지 체크 (감지이면 true 아니면 false)
  loginSuccess: false,
  profileImg: '',
  kakaoToken: localStorage.getItem('kakao-token')
    ? localStorage.getItem('kakao-token')
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access-token');
      localStorage.removeItem('kakao-token');
      localStorage.removeItem('user-info');
      localStorage.removeItem('user-profile');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // 유저 로그인
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data;
      state.profileImg = payload.data.profileImg;
      localStorage.setItem('user-profile', payload.data.profileImg);
      localStorage.setItem('user-info', payload.data);
      state.userToken = payload.headers.authorization;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // 유저 회원가입
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // 아이디 중복 체크
    [existMemberId.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [existMemberId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.idMsg = payload.data.data;
      if (payload.data.data === null) {
        state.idErrorMsg = payload.data.error.message;
      }
      state.duplicateSuccess = payload.data.success;
    },
    [existMemberId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [kakaoLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [kakaoLogin.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.userInfo = payload.data;
      state.profileImg = payload.data.profileImg;
      localStorage.setItem('user-profile', payload.data.profileImg);
      localStorage.setItem('user-info', payload.data);
      state.userToken = payload.headers.authorization;
    },
    [kakaoLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
