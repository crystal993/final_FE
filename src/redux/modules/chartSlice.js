import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  myPageChartData: [],
  isLoading: null,
  page: 0,
};

// 마이 페이지 차트
export const __myPageChart = createAsyncThunk(
  "chart/__myPageChart",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.my_page_chart();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const chartSlice = createSlice({
  name: "chartSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // 마이 페이지 차트
    [__myPageChart.pending]: (state) => {
      state.isLoading = true;
    },
    [__myPageChart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPageChartData = action.payload;
    },
    [__myPageChart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = chartSlice.actions;
export default chartSlice.reducer;
