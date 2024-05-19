export const loginCardVarients = {
  initial: { width: 20, height: 20, backgroundColor: "white" },
  animate: {
    rotate: 360,
    width: 400,
    height: 400,
    x: 0,
    boxShadow: "inset 0 0 20px 10px rgba(255,255,255,0)",
  },
  animateWrong: {
    rotate: 360,
    width: 400,
    height: 400,
    x: 0,
    boxShadow: "inset 0 0 20px 10px rgba(239,68,68,0.6)",
  },
  animateTrue: {
    rotate: 360,
    width: 400,
    height: 400,
    x: -400,
    boxShadow: "inset 0 0 20px 10px rgba(255,255,255,0)",
  },
};
export const loginCardTRansitions = {
  width: {
    type: "spring",
    stiffness: 100,
    duration: 0.3,
  },
  height: {
    type: "spring",
    stiffness: 100,
    duration: 0.3,
  },
  rotate: {
    duration: 0.4,
    ease: "linear",
  },
  x: {
    duration: 0.4,
    type: "spring",
    stiffness: 50,
  },
};

export const loginHidingCardVarients = {
  animate: {
    opacity: 0,
    display: "none",
  },
};
export const loginHidingCardTransition = { duration: 0.3, delay: 0.5 };

export const loginSuccessfulMessageVarients = {
  initial: { opacity: 0, display: "none" },
  animate: {
    opacity: 0,
    color: "#3B82F6",
    display: "none",
  },
  animateTrue: {
    opacity: 1,
    color: "grey",
    display: "inline",
  },
};
export const loginSuccessfulMessageTransition = {
  opacity: { duration: 0.2, delay: 0.8 },
  color: { duration: 1, delay: 1.3, ease: "linear" },
};

export const loginSuccessfulMessageStrokeVarients = {
  animate: {
    width: 0,
    borderColor: "#3B82F6",
  },
  animateTrue: {
    width: `100%`,
    borderColor: "grey",
  },
};
export const loginSuccessfulMessageStrokeTransition = {
  width: { duration: 0.6, delay: 1.2 },
  borderColor: { duration: 0.6, delay: 1.3, ease: "linear" },
};
