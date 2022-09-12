import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  myWritings: [],
  myZzims: [],
  myProducts: [],
  isLoading: null,
  page: 0,
};

// 내가 쓴 글 조회
export const __getMyWritings = createAsyncThunk(
  "mypage/__getMyWritings",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_my_writings();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//내가 찜한 목록 조회
export const __getMyZzims = createAsyncThunk(
  "mypage/__getMyZzims",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_my_zzims();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//최근 본 상품 목록 조회
export const __getMyViewedProducts = createAsyncThunk(
  "mypage/__getMyViewedProducts",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_my_viewed_products();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const myPageSlice = createSlice({
  name: "myPageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // 내가 쓴 글 조회
    [__getMyWritings.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyWritings.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myWritings = action.payload;
    },
    [__getMyWritings.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //내가 찜한 목록 조회
    [__getMyZzims.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyZzims.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myZzims = action.payload;
    },
    [__getMyZzims.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //최근 본 상품 목록 조회
    [__getMyViewedProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyViewedProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myProducts = action.payload;
    },
    [__getMyViewedProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = myPageSlice.actions;
export default myPageSlice.reducer;
