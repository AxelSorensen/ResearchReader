import React from 'react';
const useMousePos = () => {

  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: null, y: null });
  React.useEffect(() => {
    let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
    const updateMousePosition = ev => {
      if(isMobile) {

        setMousePosition({ x: ev.touches?.[0].clientX, y: ev.touches?.[0].clientY });
      } else {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      }

    }
    if(isMobile) {
      window.addEventListener('touchstart', updateMousePosition);
    } else {
      window.addEventListener('mousemove', updateMousePosition);
    }
    

    return () => {
      if(isMobile) {
        window.removeEventListener('touchstart', updateMousePosition);
      } else {
        window.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);
  return mousePosition;
};
export default useMousePos;