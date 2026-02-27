import { useState, useRef, useEffect } from "react";

export default function SmoothForwardBackwardVideo({ forwardSrc, backwardSrc }) {
  const [isForward, setIsForward] = useState(true);
  const forwardRef = useRef(null);
  const backwardRef = useRef(null);

  useEffect(() => {
    const fVideo = forwardRef.current;
    const bVideo = backwardRef.current;

    fVideo.preload = "auto";
    bVideo.preload = "auto";

    const handleForwardEnded = () => {
      setIsForward(false);
      bVideo.currentTime = 0;
      bVideo.play().catch(e => console.log("Video play interrupted"));
    };

    const handleBackwardEnded = () => {
      setIsForward(true);
      fVideo.currentTime = 0;
      fVideo.play().catch(e => console.log("Video play interrupted"));
    };

    fVideo.addEventListener("ended", handleForwardEnded);
    bVideo.addEventListener("ended", handleBackwardEnded);

    fVideo.play().catch(e => console.log("Auto-play blocked"));

    return () => {
      fVideo.removeEventListener("ended", handleForwardEnded);
      bVideo.removeEventListener("ended", handleBackwardEnded);
    };
  }, []);

  return (
    /* 1. Added h-full and w-full to the container */
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={forwardRef}
        src={forwardSrc}
        muted
        playsInline // Important for iOS
        loop={false}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isForward ? 1 : 0,
          pointerEvents: "none",
        }}
      />
      <video
        ref={backwardRef}
        src={backwardSrc}
        muted
        playsInline // Important for iOS
        loop={false}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isForward ? 0 : 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}