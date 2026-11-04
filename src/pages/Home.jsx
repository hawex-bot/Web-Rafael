import { Link } from 'react-router-dom';
import { materi } from '@/data/materi';
import IndexRow from '@/components/IndexRow';

export default function Home() {
  return (
    <>
      <header>
        <h1 className="font-serif text-[44px] font-medium leading-[1.12] tracking-[-0.02em] text-ink md:text-[52px]">
          Sistem Komputer &amp; TIK
        </h1>
        <p className="mt-4 font-sans text-sm text-muted">Rangkuman Materi Kuliah — Farrelaldo</p>
      </header>

      <div className="mt-12 border-t border-hairline">
        {materi.map((item, index) => (
          <IndexRow key={item.slug} materi={item} index={index} />
        ))}
      </div>
    </>
  );
}
