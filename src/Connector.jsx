import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const Connector = ({ parentRef, childRef }) => {
  const pathRef = useRef();
  const svgRef = useRef();

  useGSAP(() => {
    const updatePath = () => {
      if (!parentRef?.current || !childRef?.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const childRect = childRef.current.getBoundingClientRect();
      
      const startX = parentRect.left + parentRect.width/2;
      const startY = parentRect.top + parentRect.height;
      const endX = childRect.left + childRect.width/2;
      const endY = childRect.top;

      const path = `M ${startX} ${startY} Q ${startX} ${startY + 50}, ${(startX + endX)/2} ${(startY + endY)/2} T ${endX} ${endY}`;
      
      pathRef.current?.setAttribute("d", path);
    };

    updatePath();
    const resizeObserver = new ResizeObserver(updatePath);
    resizeObserver.observe(document.body);

    gsap.fromTo(pathRef.current,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: childRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => resizeObserver.disconnect();
  });

  return (
    <svg ref={svgRef} className="connector-svg">
      <path
        ref={pathRef}
        stroke="url(#connectorGradient)"
        fill="none"
        strokeWidth="2"
        strokeDasharray="1000"
      />
      <defs>
        <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Connector;