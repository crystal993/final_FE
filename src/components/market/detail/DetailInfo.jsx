import React, { useEffect } from "react";
import { __getSinglePost } from "../../../redux/modules/market/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.marketPost.singlePost);
  console.log(item);
  useEffect(() => {
    dispatch(__getSinglePost({ itemId: id }));
  }, []);
  return <div>안녕</div>;
};

export default DetailInfo;
