const RESP = {
  //POST_APIS
  ADD_POST_SUCCESS: {
    data: {
      itemId: 1,
      title: "간식팔아요",
      content: "남은 간식 팔아요",
      nickname: "멍냥이",
      petCategory: "강아지",
      itemCategory: "식품",
      location: "서울시 강동구~",
      itemImgs: [],
      commentCnt: 12,
      viewCnt: 10,
      zzimCNT: 5,
      purchasePrice: "100,000",
      sellingPrice: "50,000",
      isCompleted: false,
      createdAt: "작성시간",
      modifiedAt: "수정시간",
    },
  },

  ADD_POST_FAIL: {
    message: "게시글 등록에 실패했습니다!",
    result: false,
    data: null,
  },

  GET_POSTS_SUCCESS: {
    message: "게시글 리스트 가져오기에 성공했습니다",
    result: true,
    data: [
      {
        itemId: 1,
        title: "간식팔아요",
        content: "남은 간식 팔아요",
        nickname: "멍냥이",
        petCategory: "강아지",
        itemCategory: "식품",
        location: "서울시 강동구~",
        itemImgs: [],
        commentCnt: 12,
        viewCnt: 10,
        zzimCNT: 5,
        purchasePrice: "100,000",
        sellingPrice: "50,000",
        isCompleted: false,
        createdAt: "작성시간",
        modifiedAt: "수정시간",
      },
      {
        itemId: 2,
        title: "간식팔아요222",
        content: "남은 간식 팔아요222",
        nickname: "멍냥이",
        petCategory: "강아지",
        itemCategory: "식품",
        location: "서울시 강동구~",
        itemImgs: [],
        commentCnt: 12,
        viewCnt: 10,
        zzimCNT: 5,
        purchasePrice: "100,000",
        sellingPrice: "50,000",
        isCompleted: false,
        createdAt: "작성시간",
        modifiedAt: "수정시간",
      },
    ],
  },
};

export default RESP;
