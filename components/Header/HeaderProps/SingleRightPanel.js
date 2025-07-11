import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setThread } from "@/store/slices/threadSlice";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SingleRightPanel = ({ thread }) => {

  const dispatch = useDispatch();
  const currentThread = useSelector((state) => state.thread.thread?.thread_id);

  const user_id = useSelector((state) => state.user.user?._id);

  const handleClick = () => {

    axios.get(`${BASE_URL}/api/chat/one-thread/${user_id}/${thread.thread_id}`).then((res) => {
      const data = res.data;
      dispatch(setThread(data.thread));
    }
    ).catch(err => { throw new Error('An unexpected error occurred. Please try again.'); })

  }

  return (
    <>
      <li
        className={`history-box ${currentThread == thread.thread_id ? "active" : ""}`}
        onClick={handleClick}
      >
        {thread.messages[0].content}
      </li>
    </>
  );
};

export default SingleRightPanel;
