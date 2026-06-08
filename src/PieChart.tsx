import React, { useEffect, useRef } from 'react';
import { IGraphDataItem } from 'src/views/TaskHome/ITaskHomeProps';
import { STATUSES_OBJ } from 'src/helper/constants';
import "./PieChart.css";

const COLORS = { ADDED: '#5b8dee', STARTED: '#c8870a', COMPLETED: '#2e7d32' };
const PRI_COLORS: Record<string, string> = { high: '#c0392b', medium: '#c06a00', low: '#2e7d32' };

const PieChart: React.FC<IGraphDataItem> = ({ graphData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const all = graphData.flatMap(t => t.items);
  const completed = graphData.find(t => t.status === STATUSES_OBJ.COMPLETED)?.items?.length || 0;
  const started = graphData.find(t => t.status === STATUSES_OBJ.STARTED)?.items?.length || 0;
  const added = graphData.find(t => t.status === STATUSES_OBJ.ADDED)?.items?.length || 0;
  const total = all.length;
  const rate = total ? Math.round(completed / total * 100) : 0;
  const overdue = all.filter(i => { const d = new Date(i.dueDate); d.setHours(0,0,0,0); const t = new Date(); t.setHours(0,0,0,0); return d < t; }).length;
  const priCounts: Record<string, number> = { high: 0, medium: 0, low: 0 };
  all.forEach(i => { if (priCounts[i.priority] !== undefined) priCounts[i.priority]++; });
  const maxP = Math.max(...Object.values(priCounts), 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 130, 130);
    const segments = [
      { val: added, color: COLORS.ADDED },
      { val: started, color: COLORS.STARTED },
      { val: completed, color: COLORS.COMPLETED },
    ];
    const tot = segments.reduce((s, d) => s + d.val, 0) || 1;
    let angle = -Math.PI / 2;
    const cx = 65, cy = 65, ro = 55, ri = 32;
    segments.forEach(seg => {
      const sweep = (seg.val / tot) * 2 * Math.PI;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, ro, angle, angle + sweep);
      ctx.arc(cx, cy, ri, angle + sweep, angle, true);
      ctx.closePath(); ctx.fillStyle = seg.color; ctx.fill();
      angle += sweep;
    });
    ctx.beginPath(); ctx.arc(cx, cy, ri, 0, 2 * Math.PI); ctx.fillStyle = '#f7f5f0'; ctx.fill();
    ctx.fillStyle = '#0f0f0f'; ctx.font = '600 18px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(rate + '%', cx, cy - 4);
    ctx.font = '400 9px monospace'; ctx.fillStyle = '#7a7a7a';
    ctx.fillText('DONE', cx, cy + 10);
  }, [graphData]);

  return (
    <div>
      <div className="analyticsGrid">
        <div className="statCard"><div className="statNum">{total}</div><div className="statLbl">Total tasks</div></div>
        <div className="statCard"><div className="statNum">{rate}%</div><div className="statLbl">Completion</div><div className="statSub">{completed} done</div></div>
        <div className="statCard"><div className="statNum">{started}</div><div className="statLbl">In Progress</div></div>
        <div className="statCard"><div className="statNum" style={overdue ? { color: 'var(--red)' } : {}}>{overdue}</div><div className="statLbl">Overdue</div></div>
      </div>
      <div className="chartsRow">
        <div className="chartCard">
          <div className="chartTitle">Task distribution by status</div>
          <div className="donutWrap">
            <canvas ref={canvasRef} width={130} height={130} />
            <div className="donutLegend">
              {[['Added', added, COLORS.ADDED], ['Started', started, COLORS.STARTED], ['Done', completed, COLORS.COMPLETED]].map(([lbl, val, col]) => (
                <div key={lbl as string} className="legendItem">
                  <div className="legendDot" style={{ background: col as string }} />
                  <span>{lbl}: <strong>{val}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chartCard">
          <div className="chartTitle">Tasks by priority</div>
          <div className="barChart">
            {Object.entries(priCounts).map(([k, v]) => (
              <div key={k} className="barRow">
                <span className="barLabel">{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                <div className="barTrack">
                  <div className="barFill" style={{ width: `${Math.round(v / maxP * 100)}%`, background: PRI_COLORS[k] }}>
                    <span className="barVal">{v}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
