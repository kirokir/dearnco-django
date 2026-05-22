import { useState, useEffect } from "preact/hooks";

// Gorgeous high-performance native SVG chart for Clicks & Impressions
function ClicksImpressionsChart({ data }: { data: any[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return <div class="text-muted font-mono text-xs text-center py-12">No data available</div>;

  const width = 500;
  const height = 220;
  const paddingLeft = 45;
  const paddingRight = 45;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const clicks = data.map(d => d.clicks);
  const impressions = data.map(d => d.impressions);

  const maxClicks = Math.max(...clicks, 1);
  const maxImpressions = Math.max(...impressions, 1);

  // Generate points
  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const yClicks = paddingTop + chartHeight - (d.clicks / maxClicks) * chartHeight;
    const yImpressions = paddingTop + chartHeight - (d.impressions / maxImpressions) * chartHeight;
    return { x, yClicks, yImpressions, data: d };
  });

  const clickLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yClicks}`).join(' ');
  const clickArea = points.length > 0 
    ? `${clickLine} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : '';

  const impressionLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yImpressions}`).join(' ');

  return (
    <div class="relative w-full h-full">
      <div class="flex justify-end gap-4 mb-4 text-[10px] font-mono tracking-wider">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded bg-teal inline-block"></span>
          <span class="text-offwhite/85">CLICKS</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-0.5 border-b border-dashed border-purple-400 inline-block"></span>
          <span class="text-offwhite/85">IMPRESSIONS</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} class="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="gscClicksGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingTop + ratio * chartHeight;
          const clickVal = Math.round(maxClicks - ratio * maxClicks);
          const impVal = Math.round(maxImpressions - ratio * maxImpressions);
          return (
            <g key={ratio} class="opacity-15">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.2)" stroke-dasharray="3 3" />
              {/* Left Y Axis (Clicks) */}
              <text x={paddingLeft - 8} y={y + 3} fill="#2dd4bf" font-size="8" text-anchor="end" font-family="monospace">
                {clickVal}
              </text>
              {/* Right Y Axis (Impressions) */}
              <text x={width - paddingRight + 8} y={y + 3} fill="#a78bfa" font-size="8" text-anchor="start" font-family="monospace">
                {impVal}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.filter((_, i) => i % 6 === 0 || i === data.length - 1).map((d, i) => {
          const index = data.indexOf(d);
          const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
          const dateStr = d.date ? d.date.substring(5) : '';
          return (
            <text key={i} x={x} y={height - 8} fill="rgba(255,255,255,0.4)" font-size="8" text-anchor="middle" font-family="monospace" class="opacity-80">
              {dateStr}
            </text>
          );
        })}

        {/* Areas & Lines */}
        {clickArea && <path d={clickArea} fill="url(#gscClicksGradient)" />}
        {clickLine && <path d={clickLine} fill="none" stroke="#2dd4bf" stroke-width="1.5" stroke-linecap="round" />}
        {impressionLine && <path d={impressionLine} fill="none" stroke="#a78bfa" stroke-dasharray="3 3" stroke-width="1.5" stroke-linecap="round" />}

        {/* Vertical Highlight Line */}
        {hoverIdx !== null && (
          <line 
            x1={points[hoverIdx].x} 
            y1={paddingTop} 
            x2={points[hoverIdx].x} 
            y2={paddingTop + chartHeight} 
            stroke="rgba(255,255,255,0.15)" 
            stroke-width="1"
          />
        )}

        {/* Interactive hover overlays */}
        {points.map((p, i) => (
          <g key={i} 
             onMouseEnter={() => setHoverIdx(i)}
             onMouseLeave={() => setHoverIdx(null)}
          >
            {/* Transparent hover catcher */}
            <rect 
              x={p.x - (chartWidth / (data.length - 1)) / 2} 
              y={paddingTop} 
              width={chartWidth / (data.length - 1)} 
              height={chartHeight} 
              fill="transparent" 
              class="cursor-crosshair" 
            />
            {hoverIdx === i && (
              <g>
                <circle cx={p.x} cy={p.yClicks} r="3.5" fill="#2dd4bf" stroke="#0a0a0c" stroke-width="1.5" />
                <circle cx={p.x} cy={p.yImpressions} r="3.5" fill="#a78bfa" stroke="#0a0a0c" stroke-width="1.5" />
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Modern interactive floating tooltip */}
      {hoverIdx !== null && (
        <div 
          class="absolute bg-charcoal-dark border border-white/10 rounded-lg p-3 text-[10px] font-mono text-offwhite shadow-xl pointer-events-none z-10 space-y-1 backdrop-blur-md"
          style={{ 
            left: `${Math.min(Math.max((points[hoverIdx].x / width) * 100, 15), 85)}%`, 
            top: `${(Math.min(points[hoverIdx].yClicks, points[hoverIdx].yImpressions) / height) * 100 - 35}%`,
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div class="text-muted border-b border-white/5 pb-1 font-bold">{points[hoverIdx].data.date}</div>
          <div class="flex items-center gap-1.5 text-teal">
            <span class="w-1.5 h-1.5 rounded-full bg-teal"></span>
            <span class="font-bold">Clicks:</span>
            <span>{points[hoverIdx].data.clicks.toLocaleString()}</span>
          </div>
          <div class="flex items-center gap-1.5 text-purple-300">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span class="font-bold">Impressions:</span>
            <span>{points[hoverIdx].data.impressions.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Gorgeous native SVG chart for Average Position
function AvgPositionChart({ data }: { data: any[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return <div class="text-muted font-mono text-xs text-center py-12">No data available</div>;

  const width = 500;
  const height = 220;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const positions = data.map(d => parseFloat(d.position));
  const minPos = Math.max(Math.min(...positions) - 1, 1);
  const maxPos = Math.max(...positions) + 1;

  // Generate points (reversed scale, so smaller numbers are higher on y-axis)
  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + ((parseFloat(d.position) - minPos) / (maxPos - minPos)) * chartHeight;
    return { x, y, data: d };
  });

  const positionLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div class="relative w-full h-full">
      <div class="flex justify-end gap-4 mb-4 text-[10px] font-mono tracking-wider">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded bg-yellow-400 inline-block"></span>
          <span class="text-offwhite/85">AVERAGE POSITION</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} class="w-full h-auto overflow-visible select-none">
        {/* Grid lines (reversed labelling) */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingTop + ratio * chartHeight;
          const posVal = (minPos + ratio * (maxPos - minPos)).toFixed(1);
          return (
            <g key={ratio} class="opacity-15">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.2)" stroke-dasharray="3 3" />
              <text x={paddingLeft - 8} y={y + 3} fill="#fbbf24" font-size="8" text-anchor="end" font-family="monospace">
                {posVal}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.filter((_, i) => i % 6 === 0 || i === data.length - 1).map((d, i) => {
          const index = data.indexOf(d);
          const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
          const dateStr = d.date ? d.date.substring(5) : '';
          return (
            <text key={i} x={x} y={height - 8} fill="rgba(255,255,255,0.4)" font-size="8" text-anchor="middle" font-family="monospace" class="opacity-80">
              {dateStr}
            </text>
          );
        })}

        {/* Lines */}
        {positionLine && <path d={positionLine} fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" />}

        {/* Vertical Highlight Line */}
        {hoverIdx !== null && (
          <line 
            x1={points[hoverIdx].x} 
            y1={paddingTop} 
            x2={points[hoverIdx].x} 
            y2={paddingTop + chartHeight} 
            stroke="rgba(255,255,255,0.15)" 
            stroke-width="1"
          />
        )}

        {/* Interactive hover overlays */}
        {points.map((p, i) => (
          <g key={i} 
             onMouseEnter={() => setHoverIdx(i)}
             onMouseLeave={() => setHoverIdx(null)}
          >
            {/* Transparent hover catcher */}
            <rect 
              x={p.x - (chartWidth / (data.length - 1)) / 2} 
              y={paddingTop} 
              width={chartWidth / (data.length - 1)} 
              height={chartHeight} 
              fill="transparent" 
              class="cursor-crosshair" 
            />
            {hoverIdx === i && (
              <circle cx={p.x} cy={p.y} r="3.5" fill="#fbbf24" stroke="#0a0a0c" stroke-width="1.5" />
            )}
          </g>
        ))}
      </svg>

      {/* Floating tooltip */}
      {hoverIdx !== null && (
        <div 
          class="absolute bg-charcoal-dark border border-white/10 rounded-lg p-3 text-[10px] font-mono text-offwhite shadow-xl pointer-events-none z-10 space-y-1 backdrop-blur-md"
          style={{ 
            left: `${Math.min(Math.max((points[hoverIdx].x / width) * 100, 15), 85)}%`, 
            top: `${(points[hoverIdx].y / height) * 100 - 35}%`,
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div class="text-muted border-b border-white/5 pb-1 font-bold">{points[hoverIdx].data.date}</div>
          <div class="flex items-center gap-1.5 text-yellow-400">
            <span class="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            <span class="font-bold">Avg Position:</span>
            <span>{parseFloat(points[hoverIdx].data.position).toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SeoDashboard() {
  const [data, setData] = useState<any>(null);
  const [queries, setQueries] = useState<any>(null);
  const [pages, setPages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [overviewRes, queriesRes, pagesRes] = await Promise.all([
          fetch("/api/google/search-console?action=overview"),
          fetch("/api/google/search-console?action=queries"),
          fetch("/api/google/search-console?action=pages"),
        ]);
        
        setData(await overviewRes.json());
        setQueries(await queriesRes.json());
        setPages(await pagesRes.json());
      } catch (err) {
        console.error("Error fetching SEO data", err);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div class="flex items-center justify-center h-64 text-teal font-mono text-sm tracking-widest gap-3">
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        CONNECTING TO SEARCH CONSOLE...
      </div>
    );
  }

  const overviewData = data?.rows?.map((r: any) => ({
    date: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: (r.ctr * 100).toFixed(2),
    position: r.position
  })) || [];

  const totalClicks = overviewData.reduce((acc: number, curr: any) => acc + curr.clicks, 0);
  const totalImpressions = overviewData.reduce((acc: number, curr: any) => acc + curr.impressions, 0);
  const avgCtr = overviewData.length ? (totalClicks / totalImpressions * 100).toFixed(2) : 0;
  const avgPosition = overviewData.length ? (overviewData.reduce((acc: number, curr: any) => acc + parseFloat(curr.position), 0) / overviewData.length).toFixed(1) : 0;

  return (
    <div class="space-y-8 animate-fadeIn">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="font-poppins text-2xl font-bold text-offwhite uppercase tracking-wider">Search Console Analytics</h2>
          <p class="font-mono text-[10px] text-teal mt-1 uppercase tracking-widest">Last 30 Days Performance</p>
        </div>
        <div class="flex gap-2">
          <span class="bg-charcoal-light/30 px-3 py-1 rounded text-[10px] font-mono text-muted border border-charcoal-light/50">dear.is-a.dev</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Total Clicks" value={totalClicks.toLocaleString()} icon="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" color="teal" />
        <KpiCard title="Total Impressions" value={totalImpressions.toLocaleString()} icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" color="blue" />
        <KpiCard title="Average CTR" value={`${avgCtr}%`} icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" color="purple" />
        <KpiCard title="Avg Position" value={avgPosition} icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" color="yellow" />
      </div>

      {/* Main Charts */}
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-charcoal-light/10 border border-charcoal-light/30 p-6 rounded-xl">
          <h3 class="font-poppins text-xs font-bold text-offwhite uppercase tracking-widest mb-6">Clicks & Impressions</h3>
          <div class="h-64 flex items-center justify-center">
            <ClicksImpressionsChart data={overviewData} />
          </div>
        </div>

        <div class="bg-charcoal-light/10 border border-charcoal-light/30 p-6 rounded-xl">
          <h3 class="font-poppins text-xs font-bold text-offwhite uppercase tracking-widest mb-6">Average Position</h3>
          <div class="h-64 flex items-center justify-center">
            <AvgPositionChart data={overviewData} />
          </div>
        </div>
      </div>

      {/* AI Discoverability Panel */}
      <div class="bg-gradient-to-br from-teal/10 to-charcoal-light/10 border border-teal/20 p-6 rounded-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10">
           <svg class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h3 class="font-poppins text-sm font-bold text-teal uppercase tracking-widest mb-2 flex items-center gap-2">
           <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
           AI Discoverability & SEO Insights
        </h3>
        <p class="text-sm text-offwhite/70 mb-4 max-w-2xl font-lora">Automated insights based on your recent search performance and structured data coverage.</p>
        
        <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-charcoal-dark/50 p-4 rounded-lg border border-charcoal-light/30">
                <div class="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">Entity Mentions</div>
                <div class="text-lg text-offwhite font-poppins">High Coverage</div>
                <div class="text-[10px] text-teal mt-2">"Kinbo Technologies" is well-recognized</div>
            </div>
            <div class="bg-charcoal-dark/50 p-4 rounded-lg border border-charcoal-light/30">
                <div class="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">Structured Data</div>
                <div class="text-lg text-offwhite font-poppins">Optimized</div>
                <div class="text-[10px] text-teal mt-2">JSON-LD active on main pages</div>
            </div>
            <div class="bg-charcoal-dark/50 p-4 rounded-lg border border-charcoal-light/30">
                <div class="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">Semantic Clusters</div>
                <div class="text-lg text-offwhite font-poppins">3 Growing</div>
                <div class="text-[10px] text-teal mt-2">"Astro SSR", "Healthcare AI", "Showcase"</div>
            </div>
        </div>
      </div>

      {/* Tables */}
      <div class="grid lg:grid-cols-2 gap-6">
        <DataTable title="Top Search Queries" data={queries?.rows} type="query" />
        <DataTable title="Top Performing Pages" data={pages?.rows} type="page" />
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }: any) {
  const colors: Record<string, string> = {
    teal: "text-teal bg-teal/10",
    blue: "text-blue-400 bg-blue-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    yellow: "text-yellow-400 bg-yellow-400/10",
  };

  return (
    <div class="bg-charcoal-light/10 border border-charcoal-light/30 p-5 rounded-xl flex items-center gap-4">
      <div class={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colors[color]}`}>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={icon} /></svg>
      </div>
      <div>
        <h4 class="font-mono text-[10px] text-muted uppercase tracking-widest">{title}</h4>
        <div class="font-poppins text-2xl font-bold text-offwhite mt-1">{value}</div>
      </div>
    </div>
  );
}

function DataTable({ title, data, type }: { title: string; data: any[]; type: string }) {
  return (
    <div class="bg-charcoal-light/10 border border-charcoal-light/30 rounded-xl overflow-hidden flex flex-col">
      <div class="p-4 border-b border-charcoal-light/30 bg-charcoal-dark/30">
        <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">{title}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-charcoal-dark/50">
              <th class="p-3 font-mono text-[10px] text-muted uppercase tracking-widest">{type === 'query' ? 'Search Query' : 'URL path'}</th>
              <th class="p-3 font-mono text-[10px] text-muted uppercase tracking-widest text-right">Clicks</th>
              <th class="p-3 font-mono text-[10px] text-muted uppercase tracking-widest text-right">Impr.</th>
              <th class="p-3 font-mono text-[10px] text-muted uppercase tracking-widest text-right">Pos.</th>
            </tr>
          </thead>
          <tbody>
            {data?.slice(0, 10).map((row: any, i: number) => {
              const label = row.keys[0];
              const displayLabel = type === 'page' ? label.replace('https://dear.is-a.dev', '') || '/' : label;
              return (
                <tr key={i} class="border-b border-charcoal-light/10 hover:bg-white/5 transition-colors">
                  <td class="p-3 text-sm text-offwhite font-inter truncate max-w-[200px]" title={label}>{displayLabel}</td>
                  <td class="p-3 text-sm text-teal font-mono text-right">{row.clicks}</td>
                  <td class="p-3 text-sm text-muted font-mono text-right">{row.impressions}</td>
                  <td class="p-3 text-sm text-yellow-400/80 font-mono text-right">{row.position.toFixed(1)}</td>
                </tr>
              );
            })}
            {(!data || data.length === 0) && (
              <tr><td colSpan={4} class="p-8 text-center text-muted font-mono text-xs">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
