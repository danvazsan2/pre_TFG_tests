"use client";

import React, { useEffect } from "react";
import Context from "@/context/Context";

import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "../backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import RightDashboardSidebar from "@/components/Header/RightDashboardSidebar";
import Modal from "@/components/Common/Modal";
import TextGenerator from "@/components/TextGenerator/TextGenerator";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

import { setThreads as setTodayThreads } from "@/store/slices/todaySlice";
import { setThreads as setYesterdayThreads } from "@/store/slices/yesterdaySlice";
import { setThreads as setWeekThreads } from "@/store/slices/weekSlice";
import { setThreads as setMonthThreads } from "@/store/slices/monthSlice";
import { setThread } from "@/store/slices/threadSlice";
import Humanize from "@/components/Humanize/Humanize";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HumanizePage = () => {

  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.user.user?._id);

  useEffect(() => {
    if (user_id) {
      axios.get(`${BASE_URL}/api/chat/all-threads/${user_id}`).then((res) => {
        const allThreads = res.data;
        dispatch(setTodayThreads(allThreads.todayThreads));
        dispatch(setThread(allThreads.todayThreads.slice().reverse()[0]));
        dispatch(setYesterdayThreads(allThreads.yesterdayThreads));
        dispatch(setWeekThreads(allThreads.oneWeekThreads));
        dispatch(setMonthThreads(allThreads.oneMonthThreads));
      }
      ).catch(err => console.log("===>error", err))
    }

  }, [user_id])

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <RightDashboardSidebar />
            <Modal />
            <PopupMobileMenu />

            <div className="rbt-main-content">
              <div className="rbt-daynamic-page-content">
                <div className="rbt-dashboard-content">
                  <div className="content-page">
                    <div className="chat-box-section">
                      <Humanize />
                      <StaticbarDashboard />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BackToTop />
          </Context>
        </div>
      </main>
    </>
  );
};

export default HumanizePage;
