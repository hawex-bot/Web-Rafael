import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTransition } from '@/lib/motion';

export default function IndexRow({ materi, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...motionTransition(reduce, 0.3), delay: reduce ? 0 : index * 0.04 }}
    >
      <Link
        to={`/materi/${materi.slug}`}
        className="group grid grid-cols-[64px_1fr_20px] items-center gap-x-6 border-b border-hairline py-6 md:grid-cols-[88px_1fr_20px]"
      >
        <span className="font-serif text-[40px] leading-none text-muted tabular-nums">
          {String(materi.nomor).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h2 className="font-serif text-[22px] font-medium leading-[1.25] text-ink transition-colors duration-[180ms] ease-soft group-hover:text-accent">
            {materi.judul}
          </h2>
          <p className="mt-1 truncate font-sans text-sm text-muted">{materi.deskripsi}</p>
        </div>
        <span
          aria-hidden="true"
          className="font-sans text-lg text-ink opacity-0 -translate-x-1 transition-[opacity,transform] duration-[180ms] ease-soft group-hover:translate-x-0 group-hover:opacity-100"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
