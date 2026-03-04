// import { useEffect, useState } from "react";

// export default function useScrollIdle(delay = 200) {
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [hasScrolled, setHasScrolled] = useState(false);

//   useEffect(() => {
//     let timeout;

//     const handleScroll = () => {
//       setHasScrolled(true); // user interacted
//       setIsScrolling(true);

//       clearTimeout(timeout);

//       timeout = setTimeout(() => {
//         setIsScrolling(false);
//       }, delay);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       clearTimeout(timeout);
//     };
//   }, [delay]);

//   return { isScrolling, hasScrolled };
// }