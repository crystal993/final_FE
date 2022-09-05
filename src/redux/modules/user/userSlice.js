import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  logoutUser,
  existMemberId,
  kakaoLogin,
  existMemberNickname,
} from "./userActions";

// initialize userToken from local storage

const initialState = {
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : null,
  refreshToken: localStorage.getItem("refresh-token")
    ? localStorage.getItem("refresh-token")
    : null,
  error: null,
  success: false,
  idMsg: null, // 중복체크 메시지
  idErrorMsg: null, // 중복체크 아이디 메시지
  duplicateSuccess: false, // 중복 감지 체크 (감지이면 true 아니면 false)
  nickMsg: null, // 닉네임 중복체크 메시지
  nickErrorMsg: null, // 닉네임 중복체크 에러 메시지
  duplicateNickSuccess: false, // 닉네임 중복 감지 체크
  loginSuccess: false,
  profileImg: "",
  kakaoToken: localStorage.getItem("kakao-token")
    ? localStorage.getItem("kakao-token")
    : null,
  logoutInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      localStorage.setItem(
        "user-profile",
        JSON.stringify(payload.data.profileImg)
      );
      localStorage.setItem("user-info", JSON.stringify(payload.data));
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
    // 유저 로그아웃
    [logoutUser.pending]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("kakao-token");
      localStorage.removeItem("user-info");
      state.loading = false;
      state.logoutInfo = payload;
      state.userToken = null;
      state.error = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {
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
    // 카카오 로그인
    [kakaoLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [kakaoLogin.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.userInfo = payload.data;
      state.profileImg = payload.data.profileImg;
      localStorage.setItem("user-profile", payload.data.profileImg);
      localStorage.setItem("user-info", payload.data);
      state.userToken = payload.headers.authorization;
    },
    [kakaoLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [existMemberNickname.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [existMemberNickname.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.nickMsg = payload.data.data;
      if (payload.data.data === null) {
        state.nickErrorMsg = payload.data.error.message;
      }
      state.duplicateSuccess = payload.data.success;
    },
    [existMemberNickname.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
