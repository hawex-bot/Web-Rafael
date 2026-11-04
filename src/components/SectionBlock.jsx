import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { motionTransition } from '@/lib/motion';

export default function SectionBlock({ section, index }) {
  const reduce = useReducedMotion();
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { amount: 0.15, once: true });

  const revealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: motionTransition(reduce, 0.4) },
  };

  return (
    <section className="mt-16">
      <p className="label-ui">{String(index + 1).padStart(2, '0')} —</p>

      <motion.h2
        ref={headingRef}
        variants={revealVariants}
        initial={reduce ? false : 'hidden'}
        animate={reduce || inView ? 'visible' : 'hidden'}
        className="mt-3 font-serif text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-ink"
      >
        {section.judul}
      </motion.h2>

      <motion.div
        variants={revealVariants}
        initial={reduce ? false : 'hidden'}
        animate={reduce || inView ? 'visible' : 'hidden'}
        className="mt-5 border-t border-hairline"
      />

      <div>
        {section.items.map((item, i) =>
          typeof item === 'string' ? (
            <p key={i} className="border-b border-hairline py-4 font-serif text-[17px] leading-[1.7] text-ink">
              {item}
            </p>
          ) : (
            <dl key={i} className="border-b border-hairline py-4">
              <dt className="font-serif text-[17px] font-medium leading-[1.6] text-ink">{item.istilah}</dt>
              <dd className="mt-1 font-serif text-[16px] leading-[1.7] text-muted">{item.definisi}</dd>
            </dl>
          ),
        )}
      </div>
    </section>
  );
}
