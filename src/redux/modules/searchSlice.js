import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  popularKeywordList: [],
  recentKeywordList: [],
  searchResultList: [],
  toggle: false,
  isLoading: null,
  page: 0,
};

// 상품 검색(최신 순 정렬)
export const __itemSearch = createAsyncThunk(
  "search/__itemSearch",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.item_search(arg.keyword, arg.toggleState);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 상품 검색(인기 순 정렬)
export const __itemSearchSortByPopular = createAsyncThunk(
  "search/__itemSearchSortByPopular",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.item_search_sort_by_popular(
        arg.keyword,
        arg.toggleState
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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
  "search/__getRecentKeywords",
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
  "search/__deleteAllRecentKeywords",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.delete_all_keywords();
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 최근 검색어 개별 삭제
export const __deleteRecentKeyword = createAsyncThunk(
  "search/__deleteRecentKeyword",
  async (arg, thunkAPI) => {
    try {
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
  reducers: {
    toggleOn: (state) => {
      state.toggle = true;
    },
    toggleOff: (state) => {
      state.toggle = false;
    },
  },
  extraReducers: {
    // 상품 검색(최신 순 정렬)
    [__itemSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__itemSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchResultList = action.payload;
    },
    [__itemSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 상품 검색(인기 순 정렬)
    [__itemSearchSortByPopular.pending]: (state) => {
      state.isLoading = true;
    },
    [__itemSearchSortByPopular.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchResultList = action.payload;
    },
    [__itemSearchSortByPopular.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
      console.log(state.recentKeywordList);
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

export const { toggleOn, toggleOff } = searchSlice.actions;
export default searchSlice.reducer;
