import { useState, useEffect } from "preact/hooks";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

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
    position: r.position.toFixed(1)
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
          <div class="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} tickFormatter={(val) => val.substring(5)} />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                <Tooltip contentStyle={{backgroundColor: '#0a0a0c', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#2dd4bf'}} />
                <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div class="bg-charcoal-light/10 border border-charcoal-light/30 p-6 rounded-xl">
          <h3 class="font-poppins text-xs font-bold text-offwhite uppercase tracking-widest mb-6">Average Position</h3>
          <div class="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} tickFormatter={(val) => val.substring(5)} />
                <YAxis reversed domain={['dataMin - 1', 'dataMax + 1']} stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                <Tooltip contentStyle={{backgroundColor: '#0a0a0c', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fbbf24'}} />
                <Line type="monotone" dataKey="position" stroke="#fbbf24" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
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
