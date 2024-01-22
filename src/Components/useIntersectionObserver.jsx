// useIntersectionObserver.js
import { useEffect, useRef } from 'react';

const useIntersectionObserver = (refs, items, threshold = 1) => {
 useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { "threshold": threshold }
    );

    // Disconnect old observers
    refs.current.forEach((ref) => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    });

    // Observe each comment individually
    refs.current.forEach((ref, items) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Ensure to unobserve elements before disconnecting the observer
      refs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
 }, [refs, items]);
};

export default useIntersectionObserver;