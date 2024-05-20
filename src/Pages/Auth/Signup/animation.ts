export const signupCheckVarients = {
  initial: { display: "none", opacity: 0, scale: 0.1 },
  animate: { display: "flex", opacity: 1, scale: 1 },
  exit: { display: "none", opacity: 0, scale: 0.1 },
};
export const signupCheckPathVarients = {
  initial: { pathLength: 0 },
  animateTrue: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: 0,
    opacity: 0,
  },
};
export const signupCheckPathTransition = {
  duration: 0.4,
  ease: "linear",
  delay: 0.1,
};
