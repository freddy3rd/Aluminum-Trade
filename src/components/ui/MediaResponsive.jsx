import { useMediaQuery } from "react-responsive";

export default function  useDevice (){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isLaptopOrDesktop: isLaptop || isDesktop,
  };
};