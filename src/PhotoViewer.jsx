import React, { useEffect, useRef } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/all';


const PhotoViewer = ({ isOpen, setIsOpen, data }) => {

  if (!isOpen) return null;

  const panelRef = useRef();

  const containerRef = useRef();

  useEffect(() => {
    if (isOpen && panelRef.current) {
      // Set initial transform style to enable 3D effect
      containerRef.current.style.perspective = '1200px';

      gsap.fromTo(
        panelRef.current,
        {
          rotateY: -90,
          scale: 0.8,
          opacity: 0,
          filter: 'blur(10px)',
          transformOrigin: 'center',
        },
        {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power3.out'
        }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      rotateY: 90,
      scale: 0.8,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => setIsOpen(false)
    });
  };


  return (
    <>

<Dialog open={isOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto" ref={containerRef}>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            ref={panelRef}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {data?.photo && (
                <div className="flex flex-row justify-center">
                  <img
                    src={data?.photo}
                    alt="AJK Family photo"
                    className="w-[300px] h-[300px] object-contain rounded mb-4"
                  />
                </div>
              )}

              {data?.description && (
                <p className="text-gray-800 text-center mt-2 px-4 pb-2">
                  {data.description}
                </p>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-red-600 cursor-pointer px-3 py-2 text-sm font-semibold text-red-600 hover:text-white shadow-xs border sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>


      {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 p-4">
        <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 z-10"
            aria-label="Close photo viewer"
          >
            <IoMdCloseCircleOutline size={24} />
          </button>

          <div className="p-4 flex flex-col items-center">



          </div>
        </div>
      </div> */}


    </>
  );
};

export default PhotoViewer;