import React from 'react';
import { IGraphDataItem } from 'src/views/TaskHome/ITaskHomeProps';
import { STATUSES_OBJ } from 'src/helper/constants';
import { getDaysLeft } from 'src/helper/helperFunc';

const PRI_COLORS: Record<string, string> = { high: '#c0392b', medium: '#c06a00', low: '#2e7d32' };

const styles: Record<string, React.CSSProperties> = {
  card: { background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '1.25rem', marginBottom: '1rem' },
  title: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink3)', marginBottom: '0.75rem' },
  tlRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
  tlName: { fontSize: 11, color: 'var(--ink2)', width: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'capitalize', fontFamily: 'var(--font-ui)' },
  tlTrack: { flex: 1, height: 18, background: 'var(--paper3)', borderRadius: 3, position: 'relative' as const, overflow: 'hidden' },
  priRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
  priName: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', width: 60, flexShrink: 0 },
  priTrack: { flex: 1, height: 26, background: 'var(--paper3)', borderRadius: 3, overflow: 'hidden' },
  empty: { fontSize: 12, color: 'var(--ink3)', fontFamily: 'var(--font-mono)', textAlign: 'center', padding: '1rem' },
};

const BarGraph: React.FC<IGraphDataItem> = ({ graphData }) => {
  const all = graphData.flatMap(t => t.items);
  const completedItems = graphData.find(t => t.status === STATUSES_OBJ.COMPLETED)?.items || [];

  // Timeline
  const tlItems = all.filter(i => i.dueDate)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 12);
  const maxDays = Math.max(...tlItems.map(i => Math.abs(getDaysLeft(i.dueDate) as number)), 1);

  // Priority completion breakdown
  const priStats: Record<string, { done: number; total: number }> = { high: { done: 0, total: 0 }, medium: { done: 0, total: 0 }, low: { done: 0, total: 0 } };
  all.forEach(i => { if (priStats[i.priority]) priStats[i.priority].total++; });
  completedItems.forEach(i => { if (priStats[i.priority]) priStats[i.priority].done++; });

  return (
    <div>
      {/* Timeline */}
      <div style={styles.card}>
        <div style={styles.title as React.CSSProperties}>Task Timeline — Days Remaining</div>
        {tlItems.length === 0 ? (
          <div style={styles.empty as React.CSSProperties}>No tasks with due dates</div>
        ) : tlItems.map(item => {
          const d = getDaysLeft(item.dueDate) as number;
          const pct = Math.max(Math.round(Math.abs(d) / maxDays * 100), 8);
          const color = d < 0 ? '#c0392b' : d === 0 ? '#c06a00' : d <= 3 ? '#e65100' : PRI_COLORS[item.priority] || '#5b8dee';
          const label = d < 0 ? `${Math.abs(d)}d overdue` : d === 0 ? 'Today' : `${d}d left`;
          return (
            <div key={item.id} style={styles.tlRow}>
              <span style={styles.tlName} title={item.name}>{item.name}</span>
              <div style={styles.tlTrack}>
                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', padding: '0 4px' }}>{label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority completion breakdown */}
      <div style={styles.card}>
        <div style={styles.title as React.CSSProperties}>Priority Completion Breakdown</div>
        {Object.values(priStats).every(p => p.total === 0) ? (
          <div style={styles.empty as React.CSSProperties}>No task data yet</div>
        ) : Object.entries(priStats).map(([k, v]) => {
          const pct = v.total ? Math.round(v.done / v.total * 100) : 0;
          return (
            <div key={k} style={styles.priRow}>
              <span style={{ ...styles.priName, color: PRI_COLORS[k] } as React.CSSProperties}>{k}</span>
              <div style={styles.priTrack}>
                <div style={{ width: `${Math.max(pct, 4)}%`, height: '100%', background: PRI_COLORS[k], borderRadius: 3, display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px' }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#fff' }}>{pct}%</span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.75)' }}>{v.done}/{v.total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarGraph;
