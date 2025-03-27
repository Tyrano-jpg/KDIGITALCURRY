import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  SvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

const Design = () => {
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const textRef = useRef(null);
  const secondTextRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      pinSpacing: false,
      onLeave: () => {
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

    tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.3);
    tl.to(secondTextRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8);

    return () => {
      scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const items = [
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
    "Service 5",
    "Service 6",
    "Service 7",
    "Service 8",
    "Service 9",
    "Service 10",
    "Service 11",
    "Service 12",
  ];

  const linesRef = useRef([]);

  useEffect(() => {
    linesRef.current.forEach((line, index) => {
      gsap.fromTo(
        line,
        { width: 0 },
        {
          width: "40px",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, []);

  const secondSectionRef = useRef(null);
  const secondCircleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      secondCircleRef.current,
      { y: -200, scale: 0, opacity: 0 },
      {
        y: 50,
        scale: 5,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top 80%", // Starts when 80% of the section is in view
          end: "center 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <section style={{ overflow: "hidden" }}>
        <Box ref={sectionRef} sx={{ height: "200vh" }}>
          <Box
            ref={contentRef}
            sx={{
              display: "flex",
              height: "100vh",
              position: "sticky",
              top: 0,
              flexDirection: "row",
              "@media (max-width: 320px)": {
                flexDirection: "row", // Keep horizontal layout
              },
            }}
          >
            {/* Left Side - SVG Animation */}
            <Box
              sx={{
                maxWidth: "100vw",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pl: 6,
                "@media (min-width: 320px)": {
                  flex: "70%", // 60% width on small screens
                  pl: 0, // Reduce padding further
                },
              }}
            >
              <svg
                viewBox="0 0 1200 1200"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: "100%", // Default for larger screens
                  height: "auto",
                  maxWidth: "600px", // Default max size
                }}
              >
                <path
                  id="dottedPath"
                  d="M600,200 a400,400 0 1,1 -0.1,0"
                  fill="none"
                  stroke="black"
                  strokeDasharray="0 12"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />

                <path
                  d="M99 13C99 13 70.9139 31.6874 59 48.9999C40.1494 76.3924 40 132 40 132L23 163L1 208H49C49 208 50 249 59 260C68 271 110 257 124 273C138 289 130 321 130 321H237C237 321 232 262 237 247C242 232 244.45 222.38 254 208C266.277 189.514 261.105 191.37 269 169C275 152 274 147 274 118C274 89 276.24 85.6568 269 67C261.54 47.7763 253.09 37.8958 237 25C215.026 7.38815 196.51 2.26742 169 0.999999C140.519 -0.312125 99 13 99 13Z"
                  fill="none"
                  stroke="black"
                  strokeWidth="0.7"
                  transform="translate(370, 350) scale(1.5)"
                />

                <image
                  href="src/images/blub.png"
                  x="520"
                  y="430"
                  width="180"
                  height="300"
                />

                <circle
                  ref={ball1Ref}
                  cx="600"
                  cy="200"
                  r="32"
                  fill="rgb(246, 86, 113)"
                />
                <circle
                  ref={ball2Ref}
                  cx="600"
                  cy="1000"
                  r="32"
                  fill="rgb(246, 86, 113)"
                />
              </svg>

              {/* CSS for media queries */}
              <style>
                {`
                @media (max-width: 480px) {
                  svg {
                    width: 130% !important; /* Increase size */
                    max-width: 900px !important; /* Expand max size */
                  }
                }
                @media (max-width: 320px) {
                  svg {
                    width: 140% !important; /* Further increase for 320px */
                    max-width: 950px !important;
                  }
                }
              `}
              </style>
            </Box>

            {/* Right Side - Text Content */}
            <Box
              sx={{
                maxWidth: "50vw",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media (min-width: 320px)": {
                  flex: "30%", // 40% width on small screens
                  pl: -1,
                },
              }}
            >
              {/* BreadCrumbs section  */}
              <Box
                sx={{
                  marginTop: { xs: "-250px", xl: "-450px" },
                  marginRight: { xs: "100px", xl: "250px" },
                  textAlign: "left",
                  gap: "40px",
                  width: { xs: "600px", sm: "800px", xl: "500px" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "rgb(255, 57, 104)",
                    fontWeight: "600",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  DESIGN
                  {/* Moving Dotted Line */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "2px",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        display: "block",
                        width: "200%",
                        height: "100%",
                        background:
                          "linear-gradient(to right, rgb(246, 86, 113) 50%, transparent 50%)",
                        backgroundSize: "20px 2px",
                        top: "-20px",
                        animation: "moveDots 2.5s linear infinite",
                      },
                      "@keyframes moveDots": {
                        "0%": { transform: "translateX(-50%)" },
                        "100%": { transform: "translateX(0%)" },
                      },
                    }}
                  />
                </Typography>

                <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "10px" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#ff4081")}
                    onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#ff4081")}
                    onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  >
                    Services
                  </Link>
                  <Typography color="text.primary">Design</Typography>
                </Breadcrumbs>
              </Box>

              <Box
                sx={{ height: "150px", display: "flex", alignItems: "center" }}
              >
                {/* First Text */}
                <Typography
                  ref={textRef}
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "10px",
                      lg: "40px",
                      xl: "60px",
                    },
                    textAlign: "left",
                    position: "absolute",
                    left: "50%",
                    maxWidth: "30%",
                    fontWeight: "750",
                  }}
                >
                  We create designs to augment User Experiences.
                </Typography>

                {/* Second Text */}
                <Typography
                  ref={secondTextRef}
                  variant="h5"
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "10px",
                      lg: "40px",
                      xl: "42px",
                    },
                    opacity: 0,
                    textAlign: "left",
                    position: "absolute",
                    fontWeight: "700",
                    left: "50%",
                    maxWidth: "35%",
                    marginTop: "20px",
                  }}
                >
                  <strong>
                    We analyze human behavioral patterns and blend them with
                    data science and information architecture to design a unique
                    'blended experience'.
                  </strong>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>

      <section
        ref={secondSectionRef}
        style={{
          position: "relative",
          padding: "20px 250px",
          overflow: "hidden",
        }}
      >
        {/* Animated Circle */}
        <div
          ref={secondCircleRef}
          style={{
            position: "absolute",
            left: "45%",
            top: "23%",
            transform: "translateX(-50%)",
            width: "70px",
            height: "70px",
            backgroundColor: "rgb(255, 130, 151)",
            borderRadius: "50%",
            zIndex: -1, // Ensures it stays behind the text
          }}
        />

        {/* Header Section */}
        <Box textAlign="left" mb={4}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              marginTop: "60px",
              marginBottom: "20px",
              color: "rgb(246, 86, 113)",
              fontSize: "23px",
              fontWeight: "770",
            }}
          >
            What do we serve?
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "50px", fontWeight: "bold" }}
          >
            We help you translate
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "50px", fontWeight: "bold" }}
          >
            a simple idea into an exotic
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "50px", fontWeight: "bold" }}
          >
            Digital design transformation vision.
          </Typography>
        </Box>

        {/* List Section */}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "23%",
                padding: "16px 0",
                textAlign: "left",
                marginBottom: "16px",
                "&:hover .hover-line": {
                  backgroundPosition: "40px 0",
                  transition: "background-position 2s linear",
                },
              }}
            >
              <Box
                ref={(el) => (linesRef.current[index] = el)}
                className="hover-line"
                sx={{
                  width: "40px",
                  height: "2px",
                  marginRight: "8px",
                  backgroundImage:
                    "repeating-linear-gradient(40deg, black, black 2.5px, transparent 3.5px, transparent 6px)",
                  backgroundSize: "40px 100%",
                  backgroundPosition: "0 0",
                }}
              />
              <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </section>
    </>
  );
};

export default Design;
