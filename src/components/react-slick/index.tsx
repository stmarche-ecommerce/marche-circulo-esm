import React from "react";
import Slider from "react-slick";

const config = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function SlickBannerSlider() {
  return (
    <div className="slider-container">
      <Slider {...config} />
    </div>
  )
}