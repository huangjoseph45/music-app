const checkIntersection = ({ rootElement, targetElement, onIntersect }) => {
  const options = {
    root: rootElement,
    rootMargin: "5px",
    threshold: 0,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (typeof onIntersect === "function") onIntersect(entry);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  if (targetElement) observer.observe(targetElement);
};

export default checkIntersection;
