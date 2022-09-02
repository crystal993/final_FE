import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Slider({ imgs, imgLength }) {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== imgLength) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imgLength) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(imgLength);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {imgs.map((obj, index) => {
        return (
          <div
            key={uuidv4()}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={obj} />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: imgLength }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}
