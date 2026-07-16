import React from "react";
import Slider from "react-slick";

const config = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
};

export default function SlickBannerSlider() {
  return (
    <div className="slider-container" >
      <Slider {...config} />
    </div>
  );
}