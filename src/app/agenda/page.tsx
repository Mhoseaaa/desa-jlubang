import type { Metadata } from 'next';
import { getAgendaList } from '@/lib/api/wordpress';
import AgendaCard from '@/components/features/agenda/AgendaCard';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Agenda',
  description: 'Agenda kegiatan dan acara di Desa Jlubang — musyawarah, pelatihan, gotong royong, dan lainnya.',
  openGraph: {
    title: 'Agenda Desa Jlubang',
    description: 'Jadwal kegiatan dan acara di Desa Jlubang.',
  },
};

export default async function AgendaPage() {
  const agendaItems = await getAgendaList();
  const upcoming = agendaItems.filter((a) => a.status === 'upcoming' || a.status === 'ongoing');
  const past = agendaItems.filter((a) => a.status === 'completed');

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Agenda Kegiatan
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Jadwal kegiatan dan acara yang akan dan telah berlangsung di Desa Jlubang
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="container-custom py-12 lg:py-16" id="agenda-upcoming">
        <SectionHeading title="Agenda Mendatang" subtitle="Kegiatan yang akan segera berlangsung" gradient />
        <div className="max-w-3xl mx-auto space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map((item) => <AgendaCard key={item.id} item={item} />)
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Belum ada agenda mendatang.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }} id="agenda-past">
          <div className="container-custom">
            <SectionHeading title="Agenda Selesai" subtitle="Kegiatan yang telah selesai dilaksanakan" />
            <div className="max-w-3xl mx-auto space-y-4">
              {past.map((item) => <AgendaCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
