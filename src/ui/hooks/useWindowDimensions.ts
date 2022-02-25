import { useEffect, useState } from 'react';

function getWindowDimensions() {
  let width = undefined;
  let height = undefined;

  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
