import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useSpring, animated } from "@react-spring/web";
import "../../styles/TypedAnimation.css";

const AnimatedTypeAnimation = () => {
  // React Spring animation for fading and scaling the text
  const springProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 180, friction: 12 }, // Controls the animation speed
  });

  return (
    <animated.div style={springProps} className="type-animation-wrapper">
      <TypeAnimation
        sequence={[
          "Welcome to Heka, your gateway to unlocking the power of your data!",
          2000,
          "Welcome back! Let’s get you started right where you left off.",
          2000,
          "Chat with your data, bring it to life, and make smarter decisions with Heka.",
          2000,
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        className="type-animation-text"
        speed={50} // Increased speed for faster typing
      />
    </animated.div>
  );
};

export default AnimatedTypeAnimation;
