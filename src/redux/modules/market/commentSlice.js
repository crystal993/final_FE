import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const userToken = localStorage.getItem('access-token')
//   ? localStorage.getItem('access-token')
//   : null;

// const refreshToken = localStorage.getItem('refresh-token')
//   ? localStorage.getItem('refresh-token')
//   : null;

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
  userToken: localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : null,
  refreshToken: localStorage.getItem("refresh-token")
    ? localStorage.getItem("refresh-token")
    : null,
};

const api = "https://fabius-bk.shop";
// const api = 'http://3.35.47.137';

// postId -> 메인글의 id => useParams의 값
// id -> 댓글의 순번 , 댓글 리스트의 id

// 메인페이지 글에 해당하는 댓글 가져오기
// payload -> postId
export const getCommentData = createAsyncThunk(
  "comment/getData",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(
        `${api}/items/detail/comments/${payload.itemId}`
      );
      return thunkApi.fulfillWithValue(response.data.comments);
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 댓글 등록
// payload -> comment,postId,Id
export const postCommentData = createAsyncThunk(
  "comment/postData",
  async (payload, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      const response = await axios.post(
        `${api}/items/detail/comments/${payload.itemId}`,
        { content: payload.content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.userToken,
            RefreshToken: user.refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// 댓글 수정
// payload -> 수정할 comment,commentId
export const putCommentData = createAsyncThunk(
  "comment/putData",
  async ({ itemId, commentId, content }, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      const response = await axios.put(
        `${api}/items/detail/comments/${itemId}/${commentId}`,
        { content: content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.userToken,
            RefreshToken: user.refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 댓글 삭제
// payload-> 수정할 commentId -> id
export const deleteCommentData = createAsyncThunk(
  "comment/deleteData",
  async (arg, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      const response = await axios.delete(
        `${api}/items/detail/comments/${arg.itemId}/${arg.commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.userToken,
            RefreshToken: user.refreshToken,
          },
        }
      );
      return arg;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [getCommentData.pending]: (state) => {
      state.isLoading = true;
    },
    [getCommentData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [getCommentData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [postCommentData.pending]: (state) => {
      state.isLoading = true;
    },
    [postCommentData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = [...state.comment, action.payload];
    },
    [postCommentData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [putCommentData.pending]: (state) => {
      state.isLoading = true;
    },
    [putCommentData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.map((item) =>
        item.commentId === action.payload.commentId
          ? {
              ...item,
              content: action.payload.content,
            }
          : item
      );
    },
    [putCommentData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCommentData.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCommentData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.filter(
        (item) => item.commentId !== action.payload.commentId
      );
    },
    [deleteCommentData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
