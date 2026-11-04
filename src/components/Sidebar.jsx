import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { materi } from '@/data/materi';
import { motionTransition } from '@/lib/motion';

function SidebarNav({ indicatorId, onNavigate }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex h-full flex-col px-6 py-10">
      <Link to="/" onClick={onNavigate} className="font-serif text-[18px] font-medium leading-[1.3] text-ink">
        <span className="link-draw">Sistem Komputer &amp; TIK</span>
      </Link>

      <p className="label-ui mt-12">Materi</p>

      <nav aria-label="Daftar materi" className="mt-4">
        <ul>
          {materi.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={`/materi/${item.slug}`}
                onClick={onNavigate}
                className="relative flex items-baseline gap-3 py-2.5 pl-4 pr-2"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId={indicatorId}
                        className="absolute inset-y-0 left-0 w-[2px] bg-accent"
                        transition={motionTransition(reduce, 0.22)}
                      />
                    )}
                    <span
                      className={`font-sans text-[11px] tracking-[0.08em] tabular-nums transition-colors duration-[180ms] ease-soft ${
                        isActive ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {String(item.nomor).padStart(2, '0')}
                    </span>
                    <span
                      className={`link-draw font-serif text-[15px] leading-[1.4] transition-colors duration-[180ms] ease-soft ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {item.judul}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-hairline bg-paper px-6 py-4 md:hidden">
        <Link to="/" className="font-serif text-[17px] font-medium text-ink">
          Sistem Komputer &amp; TIK
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu materi"
          className="p-1 text-ink transition-colors duration-[180ms] ease-soft hover:text-accent"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[260px] border-r border-hairline bg-paper md:block">
        <SidebarNav indicatorId="active-desktop" />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-ink/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTransition(reduce, 0.2)}
              onClick={close}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-hairline bg-paper md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={motionTransition(reduce, 0.24)}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Tutup menu"
                className="absolute right-4 top-6 p-1 text-muted transition-colors duration-[180ms] ease-soft hover:text-accent"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              <SidebarNav indicatorId="active-drawer" onNavigate={close} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
