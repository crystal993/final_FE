import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import RESP from "../../../server/response";
import { apis } from "../../../shared/axios";

const initialState = {
  list: [],
  singlePost: {},
  hasMoreTwits: null,
  isLoading: null,
};

export const __getPost = createAsyncThunk(
  "post/__getPost",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.get_market_posts();
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getSinglePost = createAsyncThunk(
  "post/__getSinglePost",
  async (arg, thunkAPI) => {
    try {
      console.log(arg.id);
      const { data } = await apis.get_market_post(arg.id);
      const datas = { ...data, imgLength: data.itemImgs.length };
      return thunkAPI.fulfillWithValue(datas);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "post/__addPost",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.create_market_post(arg.data, arg.files);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "post/__deletePost",
  async (arg, thunkAPI) => {
    try {
      const { data } = await apis.delete_market_post(arg.id);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __updatePost = createAsyncThunk(
  "post/__updatePost",
  async (arg, thunkAPI) => {
    console.log(arg);
    try {
      // const { data } = await apis.edit_market_post(arg.data, arg.files);
      // const { data } = await axios({
      //   method: "put",
      //   url: `http://54.180.143.106/api/post/${arg.id}`,
      //   data: arg.data,
      //   headers: config,
      // });
      // console.log(data);
      const { data } = RESP.UPDATE_POST_SUCCESS;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [__getPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    // get single post
    [__getSinglePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getSinglePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    },
    [__getSinglePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    // add post
    [__addPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    // delete post
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      const target = state.list.findIndex(
        (post) => post.itemId === action.payload
      );
      state.list.splice(target, 1);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    // update post
    [__updatePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
