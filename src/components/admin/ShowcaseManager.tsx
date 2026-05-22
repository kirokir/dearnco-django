import { useState, useEffect } from "preact/hooks";

export default function ShowcaseManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/showcase");
      if (res.ok) setProjects(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const saveProject = async (data: any) => {
    setMessage("Saving project...");
    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/showcase" : `/api/showcase?id=${data.id}`;
      const payload = { ...data };
      if (typeof payload.tech_stack === "string") {
        payload.tech_stack = payload.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean);
      }
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setMessage("Project saved!");
        setEditing(null);
        setIsNew(false);
        fetchProjects();
      } else {
        setMessage("Error saving project.");
      }
    } catch (e) {
      setMessage("Error saving project.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase item?")) return;
    setMessage("Deleting...");
    try {
      const res = await fetch(`/api/showcase?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Project deleted.");
        fetchProjects();
      }
    } catch (e) {
      setMessage("Error deleting project.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div class="flex items-center justify-center h-64 text-teal font-mono text-sm tracking-widest gap-3">
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        LOADING SHOWCASE ITEMS...
      </div>
    );
  }

  if (editing || isNew) {
    const data = editing || {
      title: "", type: "website", category: "Dashboards", tech_stack: "", description: "", live_url: "", youtube_url: "", thumbnail: "", featured: false, order_index: 0
    };
    return (
      <ShowcaseEditor 
        project={data} 
        onSave={saveProject} 
        onCancel={() => { setEditing(null); setIsNew(false); }} 
      />
    );
  }

  return (
    <div class="space-y-6 animate-fadeIn">
      {message && (
        <div class="fixed top-8 right-8 bg-teal text-charcoal px-6 py-3 rounded-lg font-inter text-sm font-bold shadow-xl shadow-teal/20 z-[100]">
          {message}
        </div>
      )}

      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Showcase Manager</h2>
          <p class="font-mono text-[10px] text-muted mt-1 uppercase tracking-widest">Manage your portfolio of Websites and Apps</p>
        </div>
        <button
          onClick={() => setIsNew(true)}
          class="bg-teal text-charcoal px-4 py-2 rounded font-poppins text-xs font-bold uppercase tracking-widest hover:bg-teal-dark transition-all"
        >
          + Add Project
        </button>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} class="bg-charcoal-light/10 border border-charcoal-light/30 rounded-xl overflow-hidden flex flex-col hover:border-teal/30 transition-all">
            <div class="h-32 bg-charcoal-dark/50 relative">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} class="w-full h-full object-cover opacity-60" />}
              <div class="absolute top-2 left-2 bg-charcoal text-offwhite text-[9px] font-mono uppercase px-2 py-1 rounded border border-white/10">
                {p.type}
              </div>
              {p.featured && (
                <div class="absolute top-2 right-2 text-yellow-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
              )}
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-offwhite font-poppins font-bold text-lg leading-tight">{p.title}</h4>
                <div class="font-mono text-[10px] text-teal mt-1">{p.category}</div>
                <p class="text-xs text-muted mt-2 line-clamp-2 font-inter">{p.description}</p>
              </div>
              <div class="flex gap-4 mt-4 pt-4 border-t border-charcoal-light/10">
                <button onClick={() => setEditing(p)} class="text-teal font-mono text-[10px] uppercase hover:underline flex-1">[ EDIT ]</button>
                <button onClick={() => deleteProject(p.id)} class="text-red-400 font-mono text-[10px] uppercase hover:underline flex-1 text-right">[ DELETE ]</button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div class="col-span-2 p-12 text-center text-muted font-mono border border-dashed border-charcoal-light/30 rounded-xl">
            No projects found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}

function ShowcaseEditor({ project, onSave, onCancel }: any) {
  const [data, setData] = useState({
    ...project,
    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : (project.tech_stack || "")
  });

  return (
    <div class="space-y-6 animate-fadeIn bg-charcoal-light/10 p-6 rounded-xl border border-charcoal-light/30">
      <div class="flex justify-between items-center pb-4 border-b border-charcoal-light/20">
        <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">{data.id ? "Edit Project" : "New Project"}</h3>
        <button onClick={onCancel} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <Input label="Title" value={data.title} onChange={(v: string) => setData({ ...data, title: v })} />
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Type</label>
              <select 
                value={data.type} 
                onChange={(e) => setData({ ...data, type: (e.target as any).value })}
                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none"
              >
                <option value="website">Website / Web App</option>
                <option value="app">Mobile App</option>
                <option value="dashboard">Admin Dashboard</option>
                <option value="ai_system">AI System</option>
              </select>
            </div>
            <Input label="Category" value={data.category} onChange={(v: string) => setData({ ...data, category: v })} />
          </div>
          <Input label="Tech Stack (comma separated)" value={data.tech_stack} onChange={(v: string) => setData({ ...data, tech_stack: v })} />
          <div class="flex items-center gap-2 mt-4">
            <input 
              type="checkbox" 
              id="featured"
              checked={data.featured} 
              onChange={(e) => setData({ ...data, featured: (e.target as any).checked })}
              class="accent-teal w-4 h-4"
            />
            <label for="featured" class="font-mono text-[10px] text-offwhite uppercase tracking-widest">Feature on top</label>
          </div>
        </div>
        
        <div class="space-y-4">
          <Input label="Live URL (for Web Iframes)" value={data.live_url} onChange={(v: string) => setData({ ...data, live_url: v })} />
          <Input label="YouTube Video ID (for Apps)" value={data.youtube_url} onChange={(v: string) => setData({ ...data, youtube_url: v })} />
          <Input label="Thumbnail Image URL" value={data.thumbnail} onChange={(v: string) => setData({ ...data, thumbnail: v })} uploadable={true} />
          
          <div class="space-y-1">
            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Description</label>
            <textarea
              value={data.description}
              onInput={(e) => setData({ ...data, description: (e.target as any).value })}
              class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-3 text-offwhite font-inter text-sm focus:border-teal outline-none transition-all h-24 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSave(data)}
        class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all shadow-lg"
      >
        Save Project
      </button>
    </div>
  );
}

// Minimal Input wrapper for the form
function Input({ label, value, onChange, uploadable = false }: any) {
  return (
    <div class="space-y-1">
        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
        <input
            type="text"
            value={value || ""}
            onInput={(e) => onChange((e.target as any).value)}
            class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all"
        />
    </div>
  );
}
