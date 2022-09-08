import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import RESP from '../../../server/response';
import { apis } from '../../../shared/axios';

const initialState = {
  list: [],
  dogList: [],
  catList: [],
  foodList: [],
  snackList: [],
  clothesList: [],
  beautyList: [],
  toyList: [],
  etcList: [],
  doubleList: [],
  singlePost: {},
  hasMoreTwits: null,
  isLoading: null,
  page: 0,
};

// 고양이 , 강아지 필터링
export const getData = createAsyncThunk(
  'mainFilter/getData',
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(
        `http://43.200.1.214/items/petcategory?petCategory=${payload.state}&page=${payload.page}&size=10`
      );
      console.log(response);
      if (!response.data) {
        return;
      }
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 전체 데이터 조회
export const __getPost = createAsyncThunk(
  'post/__getPost',
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://43.200.1.214/items?page=${arg.page}&size=10`
      );
      if (!data) {
        return;
      }
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 카테고리 필터링
export const __getItemCategories = createAsyncThunk(
  'category/__getItemCategories',
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://43.200.1.214/items/itemcategory?itemCategory=${arg.itemCategory}&page=${arg.page}&size=10`
      );
      if (!data) {
        return;
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 중복 카테고리 필터링
export const getTwoCategory = createAsyncThunk(
  'category/getTwoCategories',
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://43.200.1.214/items/twocategory?petCategory=${arg.petCategory}&itemCategory=${arg.itemCategory}&page=${arg.page}`
      );
      console.log(response.data);
      // localStorage.removeItem('petCategory');
      // localStorage.removeItem('itemCategory');
      if (response.data.length === 0) {
        console.log('remove');
        localStorage.removeItem('petCategory');
        localStorage.removeItem('itemCategory');
        return;
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getSinglePost = createAsyncThunk(
  'post/__getSinglePost',
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
  'post/__addPost',
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
  'post/__deletePost',
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
  'post/__updatePost',
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
  name: 'postSlice',
  initialState,
  reducers: {
    addPage: (state) => {
      state.page = state.page + 1;
    },
    pageToZero: (state) => {
      state.page = 0;
    },
    doubleListToZero: (state) => {
      state.list = [];
      state.doubleList = [];
      state.beautyList = [];
      state.catList = [];
      state.clothesList = [];
      state.dogList = [];
      state.etcList = [];
      state.foodList = [];
    },
  },
  extraReducers: {
    // 고양이 , 강아지 필터
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = [];
      if (action.payload[0].petCategory.includes('강아지')) {
        state.catList = [];
        state.dogList = state.dogList.concat(action.payload);
      }
      if (action.payload[0].petCategory.includes('고양이')) {
        state.dogList = [];
        state.catList = state.catList.concat(action.payload);
      }
    },
    [getData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get post list (전체 필터)
    [__getPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dogList = [];
      state.catList = [];
      state.list = state.list.concat(action.payload);
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
    // item category filter (아이템 카테고리 필터)
    [__getItemCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getItemCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.itemCategory = action.payload[0].itemCategory;
      if (state.itemCategory === '사료' && action.payload !== []) {
        state.list = [];
        state.snackList = [];
        state.clothesList = [];
        state.beautyList = [];
        state.toyList = [];
        state.etcList = [];
        state.foodList = state.foodList.concat(action.payload);
      }
      if (state.itemCategory === '간식' && action.payload !== []) {
        state.list = [];
        state.foodList = [];
        state.clothesList = [];
        state.beautyList = [];
        state.toyList = [];
        state.etcList = [];
        state.snackList = state.snackList.concat(action.payload);
      }
      if (state.itemCategory === '의류' && action.payload !== []) {
        state.list = [];
        state.foodList = [];
        state.snackList = [];
        state.beautyList = [];
        state.toyList = [];
        state.etcList = [];
        state.clothesList = state.clothesList.concat(action.payload);
      }
      if (state.itemCategory === '미용' && action.payload !== []) {
        state.list = [];
        state.foodList = [];
        state.snackList = [];
        state.clothesList = [];
        state.toyList = [];
        state.etcList = [];
        state.beautyList = state.beautyList.concat(action.payload);
      }
      if (state.itemCategory === '장난감' && action.payload !== []) {
        state.list = [];
        state.foodList = [];
        state.snackList = [];
        state.beautyList = [];
        state.clothesList = [];
        state.etcList = [];
        state.toyList = state.toyList.concat(action.payload);
      }
      if (state.itemCategory === '기타용품' && action.payload !== []) {
        state.list = [];
        state.foodList = [];
        state.snackList = [];
        state.beautyList = [];
        state.toyList = [];
        state.clothesList = [];
        state.etcList = state.etcList.concat(action.payload);
      }
    },
    [__getItemCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    }, // 두 가지 아이템 카테고리 필터
    [getTwoCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTwoCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = [];
      state.doubleList = state.doubleList.concat(action.payload);
    },
    [getTwoCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {
  addPage,
  pageToZero,
  doubleListToZero,
  petCategory,
  itemCategory,
} = postSlice.actions;
export default postSlice.reducer;
