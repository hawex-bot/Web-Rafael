export const EASE = [0.2, 0.7, 0.2, 1];

export function motionTransition(reduce, duration) {
  return reduce ? { duration: 0 } : { duration, ease: EASE };
}
