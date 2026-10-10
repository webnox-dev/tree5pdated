import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Connector from "./src/Connector";

const FamilyNode = ({ member, level = 0, parentRef }) => {
  const nodeRef = useRef();
  const [isExpanded, setIsExpanded] = useState(true);

  useGSAP(() => {
    gsap.from(nodeRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotationX: -15,
      transformOrigin: "center top",
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: nodeRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.to(nodeRef.current, {
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
      paused: true,
      overwrite: true
    });
  });

  const handleHover = (hover) => {
    gsap.to(nodeRef.current, {
      scale: hover ? 1.05 : 1,
      y: hover ? -5 : 0,
      duration: 0.3
    });
  };

  return (
    <div 
      className="node"
      ref={nodeRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {parentRef && <Connector parentRef={parentRef} childRef={nodeRef} />}
      
      <div className="generation-badge">Gen {member.generation}</div>
      <div className="node-content">
        <h3>{member.name}</h3>
        {member.spouse && <p className="spouse">❤ {member.spouse}</p>}
      </div>

      {member.children && isExpanded && (
        <div className="children">
          {member.children.map((child) => (
            <FamilyNode
              key={child.id}
              member={child}
              level={level + 1}
              parentRef={nodeRef}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyNode;