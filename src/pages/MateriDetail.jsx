import { Link, useParams } from 'react-router-dom';
import { materi } from '@/data/materi';
import ReadingProgress from '@/components/ReadingProgress';
import SectionBlock from '@/components/SectionBlock';

export default function MateriDetail() {
  const { slug } = useParams();
  const item = materi.find((entry) => entry.slug === slug);

  if (!item) {
    return (
      <>
        <p className="label-ui">Materi</p>
        <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-ink md:text-[48px]">
          Materi tidak ditemukan
        </h1>
        <p className="mt-6 font-serif text-muted">Materi yang Anda cari belum tersedia.</p>
        <Link to="/" className="link-draw mt-8 inline-block font-sans text-sm text-ink">
          Kembali ke beranda
        </Link>
      </>
    );
  }

  return (
    <>
      <ReadingProgress />

      <header className="border-b border-hairline pb-10">
        <p className="label-ui">Materi {String(item.nomor).padStart(2, '0')}</p>
        <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-ink md:text-[48px]">
          {item.judul}
        </h1>
        <p className="mt-4 font-serif text-[18px] leading-[1.6] text-muted">{item.deskripsi}</p>
      </header>

      {item.sections.length === 0 ? (
        <p className="mt-16 font-serif text-muted">Materi ini segera hadir.</p>
      ) : (
        item.sections.map((section, index) => (
          <SectionBlock key={section.judul} section={section} index={index} />
        ))
      )}
    </>
  );
}
