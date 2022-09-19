import axios from "axios";

const base = {
  server_http: process.env.REACT_APP_HTTP_URI,
  server_https: process.env.REACT_APP_HTTPS_URI,
};

const api = axios.create({
  baseURL: base.server_https,
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
    withCredentials: true,
  },
});

api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("access-token");
  const auth2 = localStorage.getItem("refresh-token");
  config.headers.common["Authorization"] = auth;
  config.headers.common["RefreshToken"] = auth2;

  return config;
});

export const apis = {
  // market : CRUD
  create_market_post: (form, files) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("nickname", form.nickname);
    formData.append("petCategory", form.petCategory);
    formData.append("itemCategory", form.itemCategory);
    formData.append("location", form.location);
    formData.append("purchasePrice", form.purchasePrice);
    formData.append("sellingPrice", form.sellingPrice);
    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFileList", files[i]);
    }

    return api.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // pageNum, pageLimit
  // get_market_posts: () => api.get(`/items?page=0&size=10`),
  get_market_post: (id) =>
    api.get(`/items/detail/${id}`, {
      headers: {
        withCredentials: true,
      },
    }),
  edit_market_post: (id, form, files) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("nickname", form.nickname);
    formData.append("petCategory", form.petCategory);
    formData.append("itemCategory", form.itemCategory);
    formData.append("location", form.location);
    formData.append("purchasePrice", form.purchasePrice);
    formData.append("sellingPrice", form.sellingPrice);
    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFileList", files[i]);
    }
    return api.put(`/items/detail/${id}`, formData);
  },
  delete_market_post: (id) => api.delete(`/items/detail/${id}`),

  // like, unlike
  like_post: (id) => api.post(`/items/detail/zzim/${id}`),
  unlike_post: (id) => api.delete(`/items/detail/zzim/${id}`),

  //category filter
  get_market_category_posts: (itemCategory) =>
    api.get(`/items/itemcategory?itemCategory=${itemCategory}`),

  //logout
  logout: () => api.post(`/members/logout`),

  //search
  item_search: (keyword, toggleState) =>
    api.post(`/items/search?keyword=${keyword}&toggle=${toggleState}`),
  item_search_sort_by_popular: (keyword, toggleState) =>
    api.post(
      `/items/search/popularity?keyword=${keyword}&toggle=${toggleState}`
    ),
  get_popular_keywords: () => api.get(`/items/search/popularity`),
  get_recent_keywords: () => api.get(`/items/search`),
  delete_all_keywords: () => api.delete(`/items/search/all`),
  delete_keyword: (searchWord) =>
    api.delete(`/items/search/?searchWord=${searchWord}`),
  get_toggle_state: () => api.get("/items/search/toggle"),
  put_toggle_state: () => api.put("/items/search/toggle"),
  get_auto_complete: (keyword) =>
    api.get(`/items/search/auto?keyword=${keyword}`),

  // mypage chart
  my_page_chart: () => api.get(`/items/mypage/charts`),

  // mypage
  get_my_writings: () => api.get(`/items/mypage`),
  get_my_zzims: () => api.get(`/items/mypage/zzim`),
  get_my_viewed_products: (cookies) =>
    api.get(`/items/mypage/list`, {
      headers: { cookies },
    }),
};
