"use client";

import React, { useState } from "react";

import SingleRightPanel from "./HeaderProps/SingleRightPanel";
import { useAppContext } from "@/context/Context";
import { useSelector, useDispatch } from "react-redux";
import { setThread } from "@/store/slices/threadSlice";

const RightDashboardSidebar = () => {

  const dispatch = useDispatch();

  const todayThreads = useSelector((state) => state.today.threads);
  const yesterdayThreads = useSelector((state) => state.yesterday.threads);
  const weekThreads = useSelector((state) => state.week.threads);
  const monthThreads = useSelector((state) => state.month.threads);

  const { shouldCollapseRightbar } = useAppContext();
  const [sectionStates, setSectionStates] = useState({
    previous: true,
    yesterday: true,
    older: true,
  });

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleNewChat = () => {

    dispatch(setThread(null));

  }

  return (
    <>
      <div
        className={`rbt-right-side-panel popup-dashboardright-section ${shouldCollapseRightbar ? "collapsed" : ""
          }`}
      >
        <div className="right-side-top"
          onClick={handleNewChat}
        >
          <button
            className="btn-default bg-solid-primary"
          >
            <span className="icon">
              <i className="feather-plus-circle"></i>
            </span>
            <span>New Chat</span>
          </button>
        </div>
        <div className="right-side-bottom">
          <div className="small-search search-section mb--20">
            <input type="search" placeholder="Search Here..." />
            <i className="feather-search"></i>
          </div>

          <div className="chat-history-section">
            <h6 className="title">Today</h6>
            <ul className="chat-history-list">
              {todayThreads &&
                todayThreads.slice().reverse().map((thread, index) => (
                  <SingleRightPanel
                    {...thread}
                    key={index}
                    thread={thread}
                  />
                ))}
            </ul>
          </div>

          <div
            className={`chat-history-section has-show-more ${!sectionStates.yesterday ? "active" : ""
              }`}
          >
            <h6 className="title">Yesterday</h6>
            <ul className="chat-history-list has-show-more-inner-content">
              {yesterdayThreads &&
                yesterdayThreads.slice().reverse().map((thread, index) => (
                  <SingleRightPanel
                    {...thread}
                    key={index}
                    thread={thread}
                  />
                ))}
            </ul>
            <div
              className={`rbt-show-more-btn ${!sectionStates.yesterday ? "active" : ""
                }`}
              onClick={() => toggleSection("yesterday")}
            >
              Show More
            </div>
          </div>

          <div
            className={`chat-history-section has-show-more ${!sectionStates.previous ? "active" : ""
              }`}
          >
            <h6 className="title">Previous 7 days</h6>
            <ul className="chat-history-list has-show-more-inner-content">
              {weekThreads &&
                weekThreads.slice().reverse().map((thread, index) => (
                  <SingleRightPanel
                    {...thread}
                    key={index}
                    thread={thread}
                  />
                ))}
            </ul>
            <div
              className={`rbt-show-more-btn ${!sectionStates.previous ? "active" : ""
                }`}
              onClick={() => toggleSection("previous")}
            >
              Show More
            </div>
          </div>

          <div
            className={`chat-history-section has-show-more ${!sectionStates.older ? "active" : ""
              }`}
          >
            <h6 className="title">November</h6>
            <ul className="chat-history-list has-show-more-inner-content">
              {monthThreads &&
                monthThreads.slice().reverse().map((thread, index) => (
                  <SingleRightPanel
                    {...thread}
                    key={index}
                    thread={thread}
                  />
                ))}
            </ul>
            <div
              className={`rbt-show-more-btn mb--100 ${!sectionStates.older ? "active" : ""
                }`}
              onClick={() => toggleSection("older")}
            >
              Show More
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightDashboardSidebar;
