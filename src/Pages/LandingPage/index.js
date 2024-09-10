import React, { useState, useEffect,useRef } from "react";
import classes from "./LandingPage.module.css";

import { FaPersonWalking } from "react-icons/fa6";
import { FiArrowRightCircle } from "react-icons/fi";
import { img1, img2, img3, img4, img5, img6, img7 } from "../../images";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isToggled, setIsToggled] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsToggled(prev => !prev);
  };

  useEffect(() => {
    if (isToggled) {
      const button = buttonRef.current;

      // Define the transition end event listener
      const handleTransitionEnd = () => {
        // Perform navigation
        navigate('/Map');  // Adjust the route to your needs

        // Clean up by removing the event listener
        button.removeEventListener('transitionend', handleTransitionEnd);
      };

      // Add the event listener
      button.addEventListener('transitionend', handleTransitionEnd);

      // Clean up event listener on component unmount
      return () => {
        button.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [isToggled, navigate]);

  return (
    <section className={classes.wrapper}>
      <img src={img1} alt="#" className={classes.img1} />
      <img src={img2} alt="#" className={classes.img2} />
      <img src={img3} alt="#" className={classes.img3} />
      <img src={img4} alt="#" className={classes.img4} />
      <img src={img5} alt="#" className={classes.img5} />
      <img src={img6} alt="#" className={classes.img6} />
      <img src={img7} alt="#" className={classes.img7} />
      <div className={classes.infoContainer}>
        {" "}
        <h1 className={classes.heading}>Public Art Walk</h1>
        <div
          ref={buttonRef}
          onClick={handleClick}
          className={[classes.switch, isToggled && classes.toggled].join(" ")}
        >
          <FiArrowRightCircle className={classes.arrow} />
          <FaPersonWalking className={classes.walk} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
