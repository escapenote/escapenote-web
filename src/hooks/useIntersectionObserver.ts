import { useEffect } from 'react';

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: any) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;
    if (!el) return;

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [root, target, onIntersect, threshold, rootMargin, enabled]);
};

export default useIntersectionObserver;
