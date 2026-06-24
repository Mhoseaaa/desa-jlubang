import Badge from '@/components/ui/Badge';
import type { AgendaItem } from '@/types/content';

interface AgendaCardProps {
  item: AgendaItem;
}

const statusConfig = {
  upcoming: { label: 'Akan Datang', variant: 'info' as const },
  ongoing: { label: 'Berlangsung', variant: 'success' as const },
  completed: { label: 'Selesai', variant: 'secondary' as const },
};

export default function AgendaCard({ item }: AgendaCardProps) {
  const status = statusConfig[item.status];
  const dateObj = new Date(item.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('id-ID', { month: 'short' });

  return (
    <div
      className="flex gap-4 p-4 rounded-xl card-hover"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      id={`agenda-card-${item.id}`}
    >
      {/* Date Badge */}
      <div className="shrink-0 w-16 h-16 rounded-xl gradient-primary flex flex-col items-center justify-center text-white shadow-md">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        </div>

        <p className="text-xs line-clamp-2 mb-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
