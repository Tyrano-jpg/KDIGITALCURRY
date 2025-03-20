import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import './Design.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const AnimatedSection = () => {
  const circle1 = useRef(null);
  const circle2 = useRef(null);
  const textSection = useRef(null);

  useEffect(() => {
    // Circle Animation
    gsap.to([circle1.current, circle2.current], {
      motionPath: {
        path: "M 100, 150 A 120,120 0 1,1 100, 149",
        align: "self",
        autoRotate: true,
      },
      scrollTrigger: {
        trigger: textSection.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      duration: 3,
      ease: "power1.inOut",
    });

    // Text Animation
    gsap.fromTo(
      ".text",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: textSection.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="animation-container">
      {/* Left Side Animation */}
      <div className="animation-section">
        <div className="circle" ref={circle1}></div>
        <div className="circle" ref={circle2}></div>
        <div className="head-outline">
          <img src="brain.svg" alt="Brain UI" />
        </div>
      </div>

      {/* Right Side Content */}
      <div className="text-section" ref={textSection}>
        <p className="text">We create designs to augment User Experiences.</p>
        <p className="text">Our innovation brings ideas to life.</p>
      </div>
    </div>
  );
};

export default AnimatedSection;
