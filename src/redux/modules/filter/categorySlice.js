import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import RESP from "../../../server/response";
import { apis } from "../../../shared/axios";

const initialState = {
  data: [],
  category: null,
  count: 0,
  isLoading: null,
  error: null,
};

export const __getItemCategories = createAsyncThunk(
  "category/__getItemCategories",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_market_category_posts(arg.itemCategory);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [__getItemCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getItemCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getItemCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
