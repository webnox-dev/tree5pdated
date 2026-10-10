  import { useGSAP } from "@gsap/react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { useEffect, useRef, useState } from "react";
  import PhotoViewer from "./PhotoViewer";

  gsap.registerPlugin(ScrollTrigger);

  const FamilyNode = ({ member, level, isRoot }) => {
    const nodeRef = useRef();
    const [isExpanded, setIsExpanded] = useState(true);
    const searchBgRef = useRef();

    // water drop effect
    // useEffect(() => {
    //   if (!isRoot || !searchBgRef.current) return;

    //   const tl = gsap.timeline();
    //   tl.set(searchBgRef.current, {
    //     background: "radial-gradient(circle at center bottom, rgba(255,255,0,0.8) 0%, rgba(255,165,0,0) 80%)",
    //     opacity: 1,
    //     backgroundSize: "100% 20%",
    //     backgroundPosition: "center 120%"
    //   })
    //   .to(searchBgRef.current, {
    //     background: "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,165,0,0.5) 70%, rgba(255,165,0,0) 100%)",
    //     backgroundSize: "150% 150%",
    //     backgroundPosition: "center center",
    //     duration: 2.5,
    //     ease: "power2.out"
    //   })
    //   .to(searchBgRef.current, {
    //     opacity: 0,
    //     duration: 0.8,
    //     onComplete: () => {
    //       // setIsReady(true);
    //       gsap.set(searchBgRef.current, { display: "none" });
    //     }
    //   });
    // }, [isRoot]);
    // water drop effect

    useGSAP(
      () => {
        const animation = gsap.from(nodeRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationX: -45,
          transformOrigin: "center center",
          duration: 1,
          delay: level * 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: nodeRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            gsap.to(nodeRef.current, {
              duration: 0.5,
            });
          },
        });

        return () => animation.kill();
      },
      { scope: nodeRef }
    );

      const [isOpen, setIsOpen] = useState(false);

      const [photo,setPhoto] = useState(null)

      // console.log(`actual data - `,photo);
      

      const handleOpen = (da) => {
        setPhoto(da)
        setIsOpen(true)
      }
      


    return (
      <>
        {/* {isRoot && <div className="search-bg absolute inset-0" ref={searchBgRef}></div>} */}

        <div
          className={`node ${isRoot ? "root-node" : ""} generation-${member?.generation} id-${member?.id} monisha-node-id-${member?.id} `}
          ref={nodeRef}
          //   onClick={() => setIsExpanded(!isExpanded)}
         
        >
          <div className="generation-label mb-3 font-extrabold text-yellow-300">
            Generation {member?.generation}
          </div>
          <div className={`node-content flex flex-col justify-center items-center set-${member?.id}`}  onClick={()=> {
            if(member?.photo || member?.description){
              handleOpen(member)
            }
          }}>

              {member?.description && (
                  <div className=" h-[10px] w-[10px] bg-yellow-400 absolute left-0 top-0 rounded-full"></div>
              )}

            <h3 className=" text-sm">{member?.name}</h3>
            {member?.spouse && <p className="spouse text-sm">{member?.spouse}</p>}
            {/* <div></div> */}
            {
              member?.photo && <img src={member?.photo} className=" w-10 h-10 rounded-2xl" alt="" />
            }
            
          </div>
          {member?.children && isExpanded && (
            <div className="children">
              {member?.children?.map((child) => (
                <FamilyNode key={child?.id} member={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>

        <PhotoViewer isOpen={isOpen} setIsOpen={setIsOpen}  data={photo}/>
      </>
    );
  };

  const FamilyTree = ({ actualData, activeTab }) => {
    const containerRef = useRef();

    useGSAP(() => {
      gsap.from(".main-title", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.from(".main-title2", {
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.utils.toArray(".node").forEach((node, i) => {
        gsap.from(node.querySelector(".generation-label"), {
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
        });
      });
    });

    return (
      <div className=" F">
        <div className="tree-container" ref={containerRef}>

          {
            (activeTab == "tab1" && (
              <>
                <h1 className="main-title">
                  Dr. R. S. Lal Mohan: A Life Rooted in Family and Purpose
                </h1>

                {/* <div className=" flex flex-row justify-end w-6/8 main-title2">
            <p style={{ fontFamily: "'Edu QLD Beginner', cursive" }}>
              M Dr. (Captain ) Richard (Grandfather of AJK)
            </p>
          </div> */}

                <h1 className="main-title">
                  Paternal lineage of Dr. R. S. Lal Mohan
                </h1>
              </>
            ))
          }

          {
            (activeTab == "tab2" && (
              <>
                <h1 className="main-title">
                  The Maternal Family lineage of Dr. R. S. Lal Mohan
                </h1>
              </>
            ))
          }

          {
            (activeTab == "tab3" && (
              <>
                <h1 className="main-title">
                  Paternal Lineage of Mrs. Grace Lal Mohan
                </h1>
              </>
            ))
          }

          {
            (activeTab == "tab4" && (
              <>
                <h1 className="main-title">
                  Maternal Lineage of Mrs. Grace Lal Mohan
                </h1>
              </>
            ))
          }

          <div className="tree-wrapper ">
            <FamilyNode member={actualData} level={0} isRoot={true} />
          </div>

          <div className=" h-[200px]"></div>

        </div>
      </div>
    );
  };

  export default FamilyTree; 