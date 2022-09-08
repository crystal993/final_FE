import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  popularKeywordList: [],
  recentKeywordList: [],
  isLoading: null,
  page: 0,
};

// 인기 검색어 조회
export const __getPopularKeywords = createAsyncThunk(
  "search/__getPopularKeywords",
  async (arg, thunkApi) => {
    try {
      const { data } = await apis.get_popular_keywords();
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 최근 검색어 조회
export const __getRecentKeywords = createAsyncThunk(
  "post/__getRecentKeywords",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_recent_keywords();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // 인기 검색어
    [__getPopularKeywords.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPopularKeywords.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.popularKeywordList = action.payload;
    },
    [__getPopularKeywords.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 최근 검색어
    [__getRecentKeywords.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getRecentKeywords.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.recentKeywordList = action.payload;
    },
    [__getRecentKeywords.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
