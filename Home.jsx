import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import huggieslogo from "../images/huggieslogo.png";
import bmwlogo from "../images/bmwlogo.png";
import PnGlogo from "../images/P&Glogo.png";
import sonylogo from "../images/sonylogo.jpg";
import starlogo from "../images/starlogo.png";
import tatalogo from "../images/tatalogo.png";
import { Box, Typography, List, ListItem } from "@mui/material";
import "./Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Home = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    triggerOnce: true,
    margin: "-100px",
  });

  const sections = [
    { title: "Title 1", content: ["Item 1", "Item 2", "Item 3"] },
    { title: "Title 2", content: ["Item A", "Item B", "Item C"] },
    { title: "Title 3", content: ["Item X", "Item Y", "Item Z"] },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // When 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      });
    };

    const observers = sectionRefs.current.map((section, index) => {
      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      if (section) observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  //animation section of texts
  const designRef = useRef(null);
  const technologyRef = useRef(null);
  const designListRef = useRef(null);
  const marketingRef = useRef(null);
  const marketingListRef = useRef(null);

  useEffect(() => {
    // Cleanup previous instances before re-creating
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Fade-in Technology text
    gsap.fromTo(
      technologyRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: technologyRef.current,
          start: "top 100%", // Start fading in when 80% of the viewport reaches the element
          end: "top 50%",
          scrub: true,
        },
      }
    );

    // Fade-out Technology text when scrolling to Design
    gsap.to(technologyRef.current, {
      opacity: 0,
      y: -50,
      duration: 3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: designRef.current,
        start: "top 30%",
        end: "top 30%",
        scrub: true,
      },
    });

    // Pin the Design section
    ScrollTrigger.create({
      trigger: designRef.current,
      start: "top 20%",
      end: () =>
        `+=${marketingRef.current.offsetTop - designRef.current.offsetTop - 5}`,
      pin: true,
      scrub: true,
    });

    // Stagger animation for Design list items
    gsap.fromTo(
      designListRef.current.children,
      { opacity: 0, y: -80, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: { each: 0.2, from: "start" },
        ease: "power2.out",
        scrollTrigger: {
          trigger: designListRef.current,
          start: "top 45%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );

    // Pin the Marketing section
    ScrollTrigger.create({
      trigger: marketingRef.current,
      start: "top 10%",
      end: "+=250",
      pin: true,
      scrub: true,
    });

    // Stagger animation for Marketing list items
    gsap.fromTo(
      marketingListRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: { each: 0.2, from: "start" },
        ease: "power2.out",
        scrollTrigger: {
          trigger: marketingListRef.current,
          start: "top 45%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const pathRefs = [useRef(null), useRef(null), useRef(null)];
  const circleRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    pathRefs.forEach((pathRef, index) => {
      const path = pathRef.current;
      const circle = circleRefs[index].current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body, // Trigger on body to sync with full page scroll
          start: "top top",
          end: () => `${totalHeight}px`,
          scrub: true,
          pin: false,
          anticipatePin: 1,
        },
      });

      // Move from 0% to 50%
      tl.to(circle, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0.5,
        },
        ease: "none",
      });

      // Hide other circles at 50%
      if (index !== 1) {
        tl.to(
          circle,
          {
            opacity: 0,
            duration: 0.1,
          },
          "-=0.1"
        );
      }

      // Pause at 50%
      tl.to({}, { duration: 0.1 });

      // Show all circles after the pause
      tl.to(circleRefs, {
        opacity: 1,
        duration: 0.1,
      });

      // Move from 50% to 100%
      tl.to(circle, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 1,
        },
        ease: "none",
      });
    });
  }, []);

  return (
    <div>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: { xs: "50%", sm: "50%", md: "50%", lg: "50%", xl: "50%" },
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "30px", sm: "35px", md: "40px", lg: "55px" },
              }}
            >
              Innovate
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "30px", sm: "35px", md: "40px", lg: "55px" },
              }}
            >
              Elevate
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "30px", sm: "35px", md: "40px", lg: "55px" },
              }}
            >
              Accelerate
            </Typography>
            <Typography
              variant="h5"
              sx={{
                width: { xs: "200px", sm: "250px", md: "300px", lg: "450px" },
                marginTop: "15px",
                fontSize: { xs: "15px", sm: "20px", md: "25px", lg: "20px" },
              }}
            >
              We Redefine User Experiences Through the Power of Behavioral
              Science.
            </Typography>
          </Box>
        </motion.div>
      </section>

      <section>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 7,
            flexWrap: "wrap",
            padding: 2,
          }}
        >
          <img src={huggieslogo} alt="huggies" style={{ height: "30px" }} />
          <img src={tatalogo} alt="tata" style={{ height: "50px" }} />
          <img src={sonylogo} alt="sony" style={{ height: "50px" }} />
          <img src={starlogo} alt="star" style={{ height: "50px" }} />
          <img src={bmwlogo} alt="bmw" style={{ height: "50px" }} />
          <img src={PnGlogo} alt="P&G" style={{ height: "50px" }} />
        </Box>
      </section>

      <section
        ref={sectionRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            sx={{
              marginTop: "80px",
              padding: 2,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: { xs: "200px", sm: "500px", md: "600px", lg: "900px" },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, fontSize: "35px", textAlign: "left" }}
            >
              We are a global creative agency that seamlessly blends design
              excellence, cutting-edge technology, and strategic intelligence to
              craft impactful experiences.
            </Typography>
          </Box>
        </motion.div>
      </section>

      <section>
        <Box
          sx={{
            height: "200vh",
            paddingTop: "40vh",
            textAlign: "center",
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100",
            },
          }}
        >
          <Box
            sx={{
              width: "25%",
              paddingLeft: {
                xs: "150px",
                sm: "200px",
                md: "250px",
                lg: "300px",
              },
            }}
          >
            {/* DESIGN SECTION */}
            <Box
              ref={designRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "40px", lg: "70px" },
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Design
              </Typography>

              {/* TECHNOLOGY TEXT WITH GSAP FADE IN/OUT */}
              <Typography
                ref={technologyRef}
                variant="h5"
                sx={{
                  fontSize: "70px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  paddingLeft: "90px",
                  opacity: 0, // Initially hidden
                }}
              >
                Marketing
              </Typography>

              <List
                ref={designListRef}
                sx={{ listStyle: "none", padding: 0, fontSize: "30px" }}
              >
                <ListItem sx={{ padding: "2px 0" }}>UI Design</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>UX Design</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>UX Consultancy</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Design System</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Animations</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Illustrations</ListItem>
              </List>
            </Box>

            {/* MARKETING SECTION */}
            <Box
              ref={marketingRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "70px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  paddingLeft: "90px",
                }}
              >
                Marketing
              </Typography>
              <List
                ref={marketingListRef}
                sx={{ listStyle: "none", padding: 0, fontSize: "30px" }}
              >
                <ListItem sx={{ padding: "2px 0" }}>Branding</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Brand Name</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Brand Guidelines</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Strategy</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Digital Marketing</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>S.E.O.</ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </section>

      <section>
        <Box
          sx={{
            marginTop: "100px",
            marginBottom: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "bold",
              width: "990px",
            }}
          >
            We are a global creative agency that seamlessly blends design
            excellence, cutting-edge technology, and strategic intelligence to
            craft impactful experiences.
          </Typography>
        </Box>
      </section>

      <section>
      <div className="wrapper">
      {/* Fixed SVG (Circles Move Along Paths) */}
      <div className="svg-overlay">
        <svg viewBox="0 0 900 700" width="900" height="700">
          {/* First Path - Red Circle */}
          <path
            ref={pathRefs[0]}
            d="M50 100 C 150 0, 350 0, 450 100 S 850 300, 900 100"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
          <circle ref={circleRefs[0]} cx="0" cy="0" r="20" fill="red" />

          {/* Second Path - Blue Circle */}
          <path
            ref={pathRefs[1]}
            d="M 122.741 1 C 122.741 1 73 125 122.741 183.5 C 171 145 137 13 263 97 C 326.242 166.5 58.1637 200.847 116 235 C 30.3074 363.22 213 179 309 153 C 420 328 10.2843 382.041 1 471 C -8.6117 582.553 286.799 475.332 252.241 574.5 C 234.88 624.319 65.7422 506 149.741 662.5"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
          <circle ref={circleRefs[1]} cx="0" cy="0" r="20" fill="blue" />

          {/* Third Path - Green Circle */}
          <path
            ref={pathRefs[2]}
            d="M50 300 C 150 200, 350 200, 450 300 S 850 500, 900 300"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
          <circle ref={circleRefs[2]} cx="0" cy="0" r="20" fill="green" />
        </svg>
      </div>
    </div>
      </section>
    </div>
  );
};

export default Home;
