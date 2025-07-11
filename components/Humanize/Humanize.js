"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Image from "next/image";

import sal from "sal.js";

import DocImg from "../../public/images/icons/document-file.png";

import Reaction from "../Common/Reaction";
import TopBar from "../Common/TopBar";

const userInfo = {
  name: 'Adam Milner',
  avatar: '/images/team/team-01sm.jpg',
  desc: "Website Roadmap title write me",
}
const botInfo = {
  name: 'AI',
  avatar: '/images/team/avater.png',
  badge: "Bot",
  desc: "Website Roadmap title write me",
}

const Humanize = () => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const messages = useSelector((state) => state.thread.thread?.messages);

  const handleEdit = (index) => {

  };

  const handleSave = (index) => {

  };

  const handleCancel = () => {
    setEditableIndex(null);
    setEditedText("");
  };

  useEffect(() => {
    sal();
  }, []);

  return (
    <>
      {
        (messages?.length > 0) && (
          <TopBar
            barImg={DocImg}
            title="Website roadmap title write me"
            wdt={14}
            htd={18}
          />
        )
      }
      {messages &&
        messages.map((message, index) => (
          <div className="chat-box-list pb-0" id="chatContainer" key={index}>
            {
              !message.isBot ? (
                <div className="chat-box author-speech">
                  <div className="inner">
                    <div className="chat-section">
                      <div className="author">
                        <Image
                          className="w-100"
                          width={40}
                          height={40}
                          src={userInfo.avatar}
                          alt="Author"
                        />
                      </div>
                      <div className="chat-content">
                        <h6 className="title">{userInfo.name}</h6>
                        {editableIndex === index ? (
                          <textarea
                            className="editable my-4"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                          />
                        ) : (
                          <p className="editable me-4">{message.content}</p>
                        )}

                        <div
                          className={`edit-actions ms-0 ${editableIndex !== null ? "d-inline-flex ms-0" : ""
                            }`}
                        >
                          <button
                            className="edit-btn btn-default btn-small btn-border"
                            onClick={() => handleEdit(index)}
                          >
                            <span className="text">Edit</span>
                          </button>
                          <button
                            className="save-regenerate-btn btn-default btn-small"
                            onClick={() => handleSave(index)}
                          >
                            <span className="text">Save &amp; Regenerate</span>
                          </button>
                          <button
                            className="cancel-btn btn-default btn-small btn-border"
                            onClick={handleCancel}
                          >
                            <span className="text">Cancel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                message.content && (
                  <div
                    className={`chat-box ai-speech chat-border-bottom`}
                  >
                    <div className="inner">
                      <div className="chat-section">
                        <div className="author">
                          <Image
                            className="w-100"
                            src={botInfo.avatar}
                            width={40}
                            height={40}
                            alt="AiWave"
                          />
                        </div>
                        <div className="chat-content">
                          <h6 className="title">
                            {botInfo.name}
                            <span className="rainbow-badge-card">
                              <i className="fa-sharp fa-regular fa-check"></i>
                              {botInfo.badge}
                            </span>
                          </h6>
                          {message.content ? (
                            <p className="">{message.content}</p>
                          ) : (
                            ""
                          )}
                          <Reaction />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            }

          </div>
        ))}
    </>
  );
};

export default Humanize;
