import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop Component
// Automatically scrolls to top when route changes, preserves scroll position on refresh
const ScrollToTop = () => {
  const location = useLocation();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    // Only scroll to top if the actual pathname changed (not just query params/hash)
    const pathnameChanged = previousPathname.current !== location.pathname;
    
    if (pathnameChanged) {
      // Scroll to top instantly to avoid interfering with any smooth scrolling
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Update ref to track the new pathname
      previousPathname.current = location.pathname;
    }
  }, [location.pathname]);

  // This component renders nothing
  return null;
};

export default ScrollToTop;