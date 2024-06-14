import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // const { pathname } = useLocation();
  console.log('ScrollToTop----');

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const location = useLocation(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Scroll to top if path changes
  useLayoutEffect(() => {
    // document.body.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo(0, 0);
    // document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
