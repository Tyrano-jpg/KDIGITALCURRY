import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import anime from "animejs";

const ComplexSvgAnimation = () => {
  const rectRef = useRef(null);
  const circleRef = useRef(null);
  const scaleRef = useRef(null);
  const containerRef = useRef(null);
  let scrollTriggerInstance = useRef(null); // Store ScrollTrigger instance

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rect = rectRef.current;
    const circle = circleRef.current;
    const scale = scaleRef.current;

    if (!rect || !circle || !scale) return; // Prevent errors

    const rectLength = rect.getTotalLength();
    const circleLength = circle.getTotalLength();
    const scaleLength = scale.getTotalLength();

    rect.style.strokeDasharray = rectLength;
    rect.style.strokeDashoffset = rectLength;

    circle.style.strokeDasharray = "2 25"; // More spaced-out dots
    circle.style.strokeDashoffset = circleLength;

    scale.style.strokeDasharray = scaleLength;
    scale.style.strokeDashoffset = scaleLength;

    // Cleanup any existing ScrollTriggers before creating a new one
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        anime({
          targets: rect,
          strokeDashoffset: [anime.setDashoffset(rect), 0],
          duration: 3000, 
          easing: "easeInOutSine",
          complete: () => {
            gsap.to(rect, { rotate: 90, transformOrigin: "50% 50%", duration: 2 });
          },
        });

        anime({
          targets: circle,
          strokeDashoffset: [anime.setDashoffset(circle), 0],
          duration: 3000,
          easing: "easeInOutSine",
        });

        gsap.to(circle, {
          rotate: 360,
          transformOrigin: "50% 50%",
          duration: 6,
          repeat: -1,
          ease: "linear",
        });

        anime({
          targets: scale,
          strokeDashoffset: [anime.setDashoffset(scale), 0],
          duration: 3500,
          delay: 1200,
          easing: "easeInOutSine",
        });
      },
    });

    // Cleanup function to prevent memory leaks when unmounting
    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }
    };
  }, []);

  return (
    <div>
      <div style={{ height: "100vh", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Dummy</h1>
      </div>

      <div ref={containerRef} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#ffffff" }}>
        <svg width="800" height="900" viewBox="0 0 800 900">
          <rect ref={rectRef} x="180" y="50" width="400" height="600" stroke="black" strokeWidth="1" fill="none" />

          <circle ref={circleRef} cx="380" cy="400" r="180" stroke="black" strokeWidth="2" fill="none" strokeDasharray="2 25" />

          <rect x="420" y="250" width="50" height="400" fill="white" />

          <path
            ref={scaleRef}
            d="M41 18V1H1V336H41V280M41 18H27M41 18V39M41 39H18M41 39V54M41 54H27M41 54V70M41 70H18M41 70V90M41 90H27M41 90V108M41 108H18M41 108V126M41 126H27M41 126V150M41 150H18M41 150V174M41 174H27M41 174V196M41 196H18M41 196V226M41 226H27M41 226V253M41 253H18M41 253V280M41 280H27"
            stroke="black"
            strokeWidth="1"
            fill="none"
            transform="translate(430, 270)"
          />
        </svg>
      </div>
    </div>
  );
};

export default ComplexSvgAnimation;
