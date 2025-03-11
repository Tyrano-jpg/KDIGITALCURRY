import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, List, ListItem } from "@mui/material";

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
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: designRef.current,
        start: "top 36%",
        end: "top 30%",
        scrub: true,
        markers: true,
      },
    });

    // Pin the Design section
    ScrollTrigger.create({
      trigger: designRef.current,
      start: "top 10%",
      end: () => `+=${marketingRef.current.offsetTop - designRef.current.offsetTop - 5}`,
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
      </section>

      <section>
        <Box sx={{ height: "200vh", paddingTop: "30vh", textAlign: "center" }}>
          <Box sx={{width: "25%", paddingLeft: "200px"}}>
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

            <List ref={designListRef} sx={{ listStyle: "none", padding: 0, fontSize: "30px" }}>
              <ListItem sx={{ padding: "2px 0" }}>Design one</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design two</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design three</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design four</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design five</ListItem>
              <ListItem sx={{ padding: "2px 0" }}>Design six</ListItem>
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
              sx={{ fontSize: "70px", fontWeight: "bold", marginBottom: "5px" }}
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
        </Box>
      </section>
    </div>
  );
};

export default Client;
