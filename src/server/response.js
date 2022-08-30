const RESP = {
  //POST_APIS
  ADD_POST_SUCCESS: {
    message: "게시글 등록에 성공했습니다!",
    result: true,
    data: {
      member: {
        username: "crystal",
        userImg:
          "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      },
      id: 4,
      title: "게시글 테스트 등록 성공",
      content: "게시글 테스트 등록 성공",
      imgUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      isMine: true,
      isLike: false,
      isFollow: false,
      createdAt: "YYYY-MM-DD",
      modifiedAt: "YYYY-MM-DD",
    },
  },

  ADD_POST_FAIL: {
    message: "게시글 등록에 실패했습니다!",
    result: false,
    data: null,
  },
};
