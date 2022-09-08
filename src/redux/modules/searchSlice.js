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

// 최근 검색어 전체 삭제
export const __deleteAllRecentKeywords = createAsyncThunk(
  "post/__deleteAllRecentKeywords",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.delete_all_keywords(arg.searchWord);
      console.log(data);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 최근 검색어 개별 삭제
export const __deleteRecentKeyword = createAsyncThunk(
  "post/__deleteRecentKeyword",
  async (arg, thunkAPI) => {
    try {
      console.log(arg);
      const { data } = await apis.delete_keyword(arg.searchWord);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
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
    // 최근 검색어 전체 삭제
    [__deleteAllRecentKeywords.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteAllRecentKeywords.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.recentKeywordList = [];
      console.log(state.recentKeywordList);
    },
    [__deleteAllRecentKeywords.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    // 최근 검색어 개별 삭제
    [__deleteRecentKeyword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteRecentKeyword.fulfilled]: (state, action) => {
      state.isLoading = false;
      const target = state.recentKeywordList.findIndex(
        (recentKeyword) => recentKeyword.searchWord === action.payload
      );
      state.recentKeywordList.splice(target, 1);
    },
    [__deleteRecentKeyword.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
