declare module "react-slick" {
  import type { ComponentType, ReactNode } from "react";

  export type ResponsiveObject = {
    breakpoint: number;
    settings: "unslick" | Settings;
  };

  export type CustomArrowProps = {
    className?: string;
    currentSlide?: number;
    onClick?: React.MouseEventHandler<HTMLElement>;
    slideCount?: number;
    style?: React.CSSProperties;
  };

  export type Settings = {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (currentSlide: number) => void;
    appendDots?: (dots: ReactNode) => ReactNode;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    customPaging?: (index: number) => ReactNode;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive";
    nextArrow?: ReactNode;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: ReactNode;
    responsive?: ResponsiveObject[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    waitForAnimate?: boolean;
  };

  const Slider: ComponentType<Settings>;

  export default Slider;
}
