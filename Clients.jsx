import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, List, ListItem } from "@mui/material";
import "animate.css"; // Import Animate.css

gsap.registerPlugin(ScrollTrigger);

const Client = () => {
  const designRef = useRef(null);
  const technologyRef = useRef(null);
  const designListRef = useRef(null);
  const marketingRef = useRef(null);
  const marketingListRef = useRef(null);

  useEffect(() => {
    // Cleanup previous instances before re-creating
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Fade-out effect for "Technology" text when scrolling to "Design"
    gsap.to(technologyRef.current, {
      opacity: 0,
      onStart: () => {
        technologyRef.current.classList.add("animate__fadeOutDown");
      },
      onReverseComplete: () => {
        technologyRef.current.classList.remove("animate__fadeOutDown");
      },
      scrollTrigger: {
        trigger: designRef.current,
        start: "top 36%",
        end: "top 30%",
        scrub: true,
      },
    });

    // Pin the Design section and ensure Marketing appears 5px below it
    ScrollTrigger.create({
      trigger: designRef.current,
      start: "top 30%",
      end: () => `+=${marketingRef.current.offsetTop - designRef.current.offsetTop - 5}`,
      pin: true,
      scrub: true,
    });

    // Staggered animation for Design list items
    gsap.fromTo(
      designListRef.current.children,
      { opacity: 0, x: -50 },
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

    // Pin the Marketing section separately for smooth transition
    ScrollTrigger.create({
      trigger: marketingRef.current,
      start: "top 30%",
      end: "+=250",
      pin: true,
      scrub: true,
    });

    // Staggered animation for Marketing list items
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

    // Cleanup function to remove ScrollTrigger instances on unmount
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
        <Box sx={{ height: "200vh", paddingTop: "30vh", textAlign: "center" }}>
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
              sx={{ fontSize: "70px", fontWeight: "bold", marginBottom: "5px" }}
            >
              Design
            </Typography>

            {/* TECHNOLOGY TEXT (5px below Design) */}
            <Typography
              ref={technologyRef}
              variant="h5"
              className="animate__animated animate__fadeIn"
              sx={{
                fontSize: "70px",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Technology
            </Typography>

            <List ref={designListRef} sx={{ listStyle: "none", padding: 0, fontSize: "30px" }}>
              <ListItem sx={{ padding: "2px 0" }}>Design one</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design two</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design three</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design four</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design five</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design six</ListItem>
            </List>
          </Box>

          {/* MARKETING SECTION (directly below Design) */}
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
              sx={{ fontSize: "70px", marginBottom: "2vh" }}
            >
              Marketing
            </Typography>
            <List ref={marketingListRef} sx={{ listStyle: "none", padding: 0, fontSize: "30px" }}>
              <ListItem sx={{ padding: "2px 0" }}>Marketing one</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Marketing two</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Marketing three</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Marketing four</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Marketing five</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Marketing six</ListItem>
            </List>
          </Box>
        </Box>
      </section>
    </div>
  );
};

export default Client;
