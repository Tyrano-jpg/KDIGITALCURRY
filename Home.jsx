import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import huggieslogo from "../images/huggieslogo.png";
import bmwlogo from "../images/bmwlogo.png";
import PnGlogo from "../images/P&Glogo.png";
import sonylogo from "../images/sonylogo.jpg";
import starlogo from "../images/starlogo.png";
import tatalogo from "../images/tatalogo.png";
import { Box, Typography, List, ListItem } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        markers: true,
      },
    });

    // Pin the Design section
    ScrollTrigger.create({
      trigger: designRef.current,
      start: "top 10%",
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
              height: "100vh",
              border: "1px solid green",
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
            gap: 4,
            flexWrap: "wrap",
            padding: 2,
            border: "1px solid black",
          }}
        >
          <img src={huggieslogo} alt="huggies" style={{ height: "50px" }} />
          <img src={bmwlogo} alt="bmw" style={{ height: "50px" }} />
          <img src={PnGlogo} alt="P&G" style={{ height: "50px" }} />
          <img src={sonylogo} alt="sony" style={{ height: "50px" }} />
          <img src={starlogo} alt="star" style={{ height: "50px" }} />
          <img src={tatalogo} alt="tata" style={{ height: "50px" }} />
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
              width: { xs: "400px", sm: "500px", md: "600px", lg: "900px" },
              border: "1px solid blue",
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
        <Box sx={{ height: "200vh", paddingTop: "30vh", textAlign: "center" }}>
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
                <ListItem sx={{ padding: "2px 0" }}>Strategyr</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>Digital Marketing</ListItem>
                <ListItem sx={{ padding: "2px 0" }}>S.E.O.</ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </section>
    </div>
  );
};

export default Home;
