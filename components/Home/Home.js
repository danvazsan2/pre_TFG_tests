"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sal from "sal.js";



import bannerImg from "../../public/images/bg/slider-main-image.png";
import bannerWhiteImg from "../../public/images/light/bg/slider-main-image.png";
import shapeOne from "../../public/images/bg/icon-shape/icon-shape-one.png";
import shapeTwo from "../../public/images/bg/icon-shape/icon-shape-two.png";
import shapeThree from "../../public/images/bg/icon-shape/icon-shape-three.png";
import shapeFour from "../../public/images/bg/icon-shape/icon-shape-four.png";
import bgShapeOne from "../../public/images/bg/bg-shape-four.png";
import bgShapeTwo from "../../public/images/bg/bg-shape-five.png";

import TabStyleOne from "../TabStyles/TabStyle-One";
import { useAppContext } from "@/context/Context";

const Home = () => {
  const { isLightTheme } = useAppContext();
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    Sal();

    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Hero/Banner Section */}
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape"
        data-black-overlay="1"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="inner text-center mt--140">
                <h1 className="title display-one">
                  Examine the Potential of
                  <br />{" "}
                  <span className="header-caption">
                    <span className="cd-headline rotate-1">
                      <span className="cd-words-wrapper">
                        <b
                          className={
                            visibleIndex === 0
                              ? "is-visible theme-gradient"
                              : "is-hidden theme-gradient"
                          }
                        >
                          AI Chating
                        </b>
                        <b
                          className={
                            visibleIndex === 1
                              ? "is-visible theme-gradient"
                              : "is-hidden theme-gradient"
                          }
                        >
                          AI Writing
                        </b>
                        <b
                          className={
                            visibleIndex === 2
                              ? "is-visible theme-gradient"
                              : "is-hidden theme-gradient"
                          }
                        >
                          AI Chating
                        </b>
                      </span>
                    </span>
                  </span>{" "}
                  AI Hack
                </h1>
                <p className="description">
                  Unleash Brainwave's AI potential. Use the open AI <br />{" "}
                  conversation app Rainbow theme
                </p>
                <div className="form-group">
                  <textarea
                    name="text"
                    id="slider-text-area"
                    cols="30"
                    rows="2"
                    placeholder="Enter a prompt, for example: a fundraising deck to a mobile finance app called Intuitive"
                  ></textarea>
                  <Link className="btn-default " href="/text-generator">
                    Start with AI
                  </Link>
                </div>
                <div className="inner-shape">
                  <Image
                    src={shapeOne}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-one"
                  />
                  <Image
                    src={shapeTwo}
                    width={60}
                    height={57}
                    alt="Icon Shape"
                    className="iconshape iconshape-two"
                  />
                  <Image
                    src={shapeThree}
                    width={42}
                    height={31}
                    alt="Icon Shape"
                    className="iconshape iconshape-three"
                  />
                  <Image
                    src={shapeFour}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-four"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-11 col-xl-11 justify-content-center">
              <div className="slider-frame">
                <Image
                  className="slider-image-effect"
                  src={isLightTheme ? bannerImg : bannerWhiteImg}
                  width={1055}
                  height={898}
                  alt="Banner Images"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-shape">
          <Image
            className="bg-shape-one"
            width={640}
            height={949}
            src={bgShapeOne}
            alt="Bg Shape"
          />
          <Image
            className="bg-shape-two"
            src={bgShapeTwo}
            width={626}
            height={1004}
            alt="Bg Shape"
          />
        </div>
      </div>

      {/* Service Section with Tabs */}
      <div className="rainbow-service-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center pb--60"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">
                    RAINBOW UNLOCKS THE POTENTIAL ai
                  </span>
                </h4>
                <h2 className="title mb--0">
                  Generative AI made for <br /> creators.
                </h2>
              </div>
            </div>
          </div>
          <TabStyleOne />
        </div>
      </div>
    </>
  );
};

export default Home;
