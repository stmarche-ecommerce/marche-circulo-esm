import React from "react";
import Slider from "react-slick";
import SparkleOverlay from "../sparleoverlay";

const config = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function SlickBannerSlider() {
  return (
    <div className="slider-container" style={{ position: "relative", zIndex: 1 }}>
      <Slider {...config} />
    </div>
  );
}