import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

const AnimatedSection = () => {
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const textRef = useRef(null);
  const secondTextRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Pin only the inner content, not the whole section
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      pinSpacing: false,
      onLeave: () => {
        // Auto-scroll when animation completes
        gsap.to(window, {
          duration: 1,
          scrollTo: sectionRef.current.offsetHeight,
        });
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Ball Animations
    tl.to(ball1Ref.current, {
      motionPath: {
        path: "#dottedPath",
        align: "#dottedPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0,
        end: 1,
      },
      duration: 1,
    });

    tl.to(
      ball2Ref.current,
      {
        motionPath: {
          path: "#dottedPath",
          align: "#dottedPath",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0.5,
          end: 1.5,
        },
        duration: 1,
      },
      0
    );

    // Text Animation
    tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.3);
    tl.to(secondTextRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8);
  }, []);

  return (
    <>
      {/* Animated Section */}
      <div ref={sectionRef} style={{ height: "200vh" }}>
        {/* Pin only this section to prevent duplication */}
        <div
          ref={contentRef}
          style={{
            display: "flex",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          {/* Left Side: Animation */}
          <div
            style={{
              maxWidth: "50vw",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "50px", // Adjust this value as needed
            }}
          >
            {/* SVG - Always Visible */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 1200"
              aria-hidden="true"
            >
              {/* Circular Dotted Path */}
              <path
                id="dottedPath"
                d="M600,200 a400,400 0 1,1 -0.1,0"
                fill="none"
                stroke="black"
                strokeDasharray="0 12"
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Face Path */}
              <path
                d="M99 13C99 13 70.9139 31.6874 59 48.9999C40.1494 76.3924 40 132 40 132L23 163L1 208H49C49 208 50 249 59 260C68 271 110 257 124 273C138 289 130 321 130 321H237C237 321 232 262 237 247C242 232 244.45 222.38 254 208C266.277 189.514 261.105 191.37 269 169C275 152 274 147 274 118C274 89 276.24 85.6568 269 67C261.54 47.7763 253.09 37.8958 237 25C215.026 7.38815 196.51 2.26742 169 0.999999C140.519 -0.312125 99 13 99 13Z"
                fill="none"
                stroke="black"
                strokeWidth="0.7"
                transform="translate(370, 350) scale(1.5)" // Moved slightly down
              />

              {/* Moving Balls */}
              <circle
                ref={ball1Ref}
                cx="600"
                cy="200"
                r="24"
                fill="rgb(246, 86, 113)"
              />
              <circle
                ref={ball2Ref}
                cx="600"
                cy="1000"
                r="24"
                fill="rgb(246, 86, 113)"
              />
            </svg>
          </div>

          {/* Right Side: Text */}
          <div
            style={{
              maxWidth: "50vw",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Fixed height container for consistent vertical alignment */}
            <div
              style={{ height: "150px", display: "flex", alignItems: "center" }}
            >
              {/* First Text */}
              {/* First Text */}
              <div
                ref={textRef}
                style={{
                  fontSize: "2rem",
                  marginBottom: "20px",
                  textAlign: "left",
                  position: "absolute",
                  left: "50%",
                  maxWidth: "45%", // Prevent overflow
                }}
              >
                <h1>
                  <strong>
                    We create designs to augment User Experiences.
                  </strong>
                </h1>
              </div>

              {/* Second Text */}
              <div
                ref={secondTextRef}
                style={{
                  fontSize: "2rem",
                  opacity: 0,
                  textAlign: "left",
                  position: "absolute",
                  left: "50%", // Align to the 50% mark of the screen
                  maxWidth: "45%",
                }}
              >
                <h2>
                  <strong>
                    We analyze human behavioral patterns and blend them with
                    data science and information architecture to design a unique
                    'blended experience'.
                  </strong>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dummy Content Below */}
      <div
        style={{
          height: "100vh",
          background: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        <strong>Dummy Content 1</strong>
      </div>

      <div
        style={{
          height: "100vh",
          background: "#d0d0d0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        <strong>Dummy Content 2</strong>
      </div>

      <div
        style={{
          height: "100vh",
          background: "#b0b0b0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        <strong>Dummy Content 3</strong>
      </div>
    </>
  );
};

export default AnimatedSection;
