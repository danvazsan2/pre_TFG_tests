"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setThread, addMessage, updateLastMessage } from "@/store/slices/threadSlice";
import { addThreads } from "@/store/slices/todaySlice";

import { Tooltip } from "react-tooltip";
import axios from "axios";

const PRIV_ENDPOINT = process.env.NEXT_PUBLIC_PRIV_ENDPOINT;
const PRIV_KEY = process.env.NEXT_PUBLIC_PRIV_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Form = () => {

  const [userPrompt, setUserPrompt] = useState("");
  const dispatch = useDispatch();
  const threadId = useSelector((state) => state.thread.thread?.thread_id);
  const user_id = useSelector((state) => state.user.user?._id);

  const sendPrompt = async () => {
    let thread_id;

    if (threadId) {
      thread_id = threadId;
    }
    else {
      thread_id = uuidv4();
      dispatch(setThread({
        thread_id,
        messages: []
      }))
    }
    //     ## Request Body (JSON)
    // - content (string): Text to paraphrase
    // - level (number): Complexity level (1-3)
    // - tone (string, optional): Desired output tone
    // - purpose (string, optional): Intended output purpose
    // - uid (string): User identifier
    const userMessage = { content: userPrompt, isBot: false };
    const botMessage = { content: '', isBot: true };

    dispatch(addMessage(userMessage));
    dispatch(addMessage(botMessage));

    const jsonData = {
      content: userPrompt,
      level: 1,
      uid: PRIV_KEY
    }
    const response = await fetch(PRIV_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      }
    );
    if (!response.body) return;

    let decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader();
    let accumulatedAnswer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      accumulatedAnswer += value;
      dispatch(
        updateLastMessage({
          content: accumulatedAnswer,
          isBot: true,
        })
      );
    }
    axios.post(`${BASE_URL}/api/chat/insert/${user_id}`,
      {
        thread_id,
        user_msg: userPrompt,
        bot_msg: accumulatedAnswer
      }
    ).then((res) => {
      if (!threadId) {
        dispatch(addThreads(res.data.newThread));
      }
    }
    ).catch(err => { throw new Error('An unexpected error occurred. Please try again.'); })

  }

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form className="new-chat-form border-gradient">
        <textarea rows="1" placeholder="Send a message..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              sendPrompt();
              setUserPrompt("");
            }
          }}
        ></textarea>
        <div className="left-icons">
          <div title="AiWave" className="form-icon icon-gpt">
            <i className="fa-sharp fa-regular fa-aperture"></i>
          </div>
        </div>
        <div className="right-icons">
          <div
            className="form-icon icon-plus"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Choose File"
          >
            <input type="file" className="input-file" name="myfile" multiple />
            <i className="fa-sharp fa-regular fa-plus"></i>
          </div>
          <a
            className="form-icon icon-mic"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voice Search"
          >
            <i className="fa-regular fa-waveform-lines"></i>
          </a>
          <a
            className="form-icon icon-send"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Send message"
            onClick={sendPrompt}
          >
            <i className="fa-sharp fa-solid fa-paper-plane-top"></i>
          </a>
        </div>
      </form>
    </>
  );
};

export default Form;
