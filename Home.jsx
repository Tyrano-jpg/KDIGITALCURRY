import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import huggieslogo from "../images/huggieslogo.png";
import bmwlogo from "../images/bmwlogo.png";
import PnGlogo from "../images/P&Glogo.png";
import sonylogo from "../images/sonylogo.jpg";
import starlogo from "../images/starlogo.png";
import tatalogo from "../images/tatalogo.png";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
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

  const designServices = [
    "UI Design",
    "UX Design",
    "UX Consultancy",
    "Design System",
    "Animation",
    "Illustrations",
  ];
  
  const marketingServices = [
    "Branding",
    "Brand Name",
    "Brand GuideLines",
    "Strategy",
    "Digital Marketing",
    "SEO",
  ];

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
              width: "50%",
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              Innovate
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              Elevate
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              Accelerate
            </Typography>
            <Typography variant="h5" sx={{ width: "450px" }}>
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
              width: "900px",
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

      
    </div>
  );
};

export default Home;
