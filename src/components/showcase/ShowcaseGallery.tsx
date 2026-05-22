import { useState, useEffect, useRef } from "preact/hooks";

const CATEGORIES = ["All", "Websites", "AI Platforms", "Dashboards", "Mobile Apps", "Healthcare Systems", "E-commerce", "Startup Platforms"];
const SUBCATEGORIES = ["Astro", "React", "Next.js", "Flutter", "Django", "AI", "IoT"];

export default function ShowcaseGallery({ initialProjects }: { initialProjects: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    let filtered = initialProjects;
    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    if (activeTech) {
      filtered = filtered.filter(p => {
        const stack = Array.isArray(p.tech_stack) ? p.tech_stack : (p.tech_stack || "").split(",");
        return stack.some((s: string) => s.trim().toLowerCase() === activeTech.toLowerCase());
      });
    }
    setProjects(filtered);
  }, [activeCategory, activeTech, initialProjects]);

  return (
    <div class="flex flex-col lg:flex-row gap-12 relative items-start">
      {/* Left Sidebar */}
      <aside class="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 space-y-8">
        <div>
          <h3 class="font-mono text-[10px] text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Domains</h3>
          <ul class="space-y-1">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  class={`w-full text-left px-3 py-2 rounded-lg font-inter text-sm transition-all duration-300 ${
                    activeCategory === cat 
                    ? 'bg-teal/10 text-teal font-medium border border-teal/20' 
                    : 'text-offwhite/70 hover:bg-white/5 hover:text-offwhite border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 class="font-mono text-[10px] text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Technologies</h3>
          <div class="flex flex-wrap gap-2">
            {SUBCATEGORIES.map(tech => (
              <button
                key={tech}
                onClick={() => setActiveTech(activeTech === tech ? null : tech)}
                class={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  activeTech === tech
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-charcoal-light/10 text-muted border border-charcoal-light/30 hover:border-white/20 hover:text-offwhite'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Grid */}
      <div class="flex-1 min-w-0">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <div key={project.id} class="showcase-card-wrapper animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
              <ShowcaseCard project={project} />
            </div>
          ))}
          {projects.length === 0 && (
            <div class="col-span-2 py-24 text-center border border-dashed border-charcoal-light/30 rounded-2xl">
              <p class="font-mono text-muted uppercase tracking-widest">No projects found in this combination.</p>
              <button onClick={() => { setActiveCategory("All"); setActiveTech(null); }} class="mt-4 text-teal hover:underline font-poppins text-sm font-bold uppercase tracking-widest">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({ project }: { project: any }) {
  const isApp = project.type === "app" || project.type === "mobile";
  
  return (
    <div class="group flex flex-col h-full bg-charcoal-light/5 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal/5 relative">
      
      {/* Featured Badge */}
      {project.featured && (
        <div class="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur border border-yellow-500/30 text-yellow-400 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
          Featured
        </div>
      )}

      {/* Media Container */}
      <div class="relative w-full overflow-hidden bg-[#0a0a0c] flex items-center justify-center p-6 border-b border-white/5" style={{ aspectRatio: isApp ? "3/4" : "16/10" }}>
        {/* Glow effect on hover */}
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-teal/20 via-transparent to-transparent"></div>

        {isApp ? (
          /* Mobile App Mockup Frame */
          <div class="relative w-[280px] h-[580px] bg-black rounded-[40px] border-[8px] border-[#1f1f22] shadow-2xl overflow-hidden shadow-black/80 transform group-hover:scale-[1.02] transition-transform duration-700 ease-out flex-shrink-0 mx-auto">
            {/* Notch */}
            <div class="absolute top-0 inset-x-0 h-6 bg-[#1f1f22] rounded-b-xl w-32 mx-auto z-10"></div>
            {project.youtube_url ? (
              <iframe
                class="w-[300%] h-[120%] -ml-[100%] -mt-[10%] pointer-events-none"
                src={`https://www.youtube.com/embed/${project.youtube_url}?autoplay=1&mute=1&loop=1&controls=0&playlist=${project.youtube_url}&playsinline=1`}
                title={project.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                loading="lazy"
              ></iframe>
            ) : project.thumbnail ? (
              <img src={project.thumbnail} alt={project.title} class="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div class="w-full h-full flex items-center justify-center text-muted font-mono text-[10px]">No Media</div>
            )}
          </div>
        ) : (
          /* Website Browser Mockup Frame */
          <div class="relative w-full h-full bg-[#111113] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transform group-hover:scale-[1.03] transition-transform duration-700 ease-out">
            {/* Browser Header */}
            <div class="h-8 bg-[#1a1a1c] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div class="mx-auto bg-black/40 rounded px-4 py-0.5 max-w-[200px] truncate w-full text-center">
                 <span class="font-mono text-[9px] text-white/30">{project.live_url ? new URL(project.live_url).hostname : 'localhost'}</span>
              </div>
            </div>
            {/* Browser Content */}
            <div class="flex-1 relative bg-black overflow-hidden group">
              {project.live_url ? (
                <>
                  <div class="absolute inset-0 z-10 bg-transparent"></div> {/* Overlay to prevent iframe hijacking clicks initially */}
                  <iframe 
                    src={project.live_url} 
                    title={project.title}
                    class="absolute top-0 left-0 w-full h-[200%] origin-top-left"
                    style={{ transform: "scale(1)", height: "100%" }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  ></iframe>
                </>
              ) : project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} class="w-full h-full object-cover origin-top" loading="lazy" />
              ) : (
                <div class="w-full h-full flex items-center justify-center text-muted font-mono text-[10px]">No Live Preview</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-poppins font-bold text-2xl text-offwhite group-hover:text-teal transition-colors duration-300">{project.title}</h4>
            <span class="font-mono text-[9px] uppercase tracking-widest text-muted border border-white/10 px-2 py-1 rounded bg-black/20 shrink-0">
              {project.type === 'app' ? 'Mobile App' : project.type === 'dashboard' ? 'Admin Panel' : project.type === 'ai_system' ? 'AI System' : 'Website'}
            </span>
          </div>
          <p class="font-lora text-muted text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>
        
        <div>
          <div class="flex flex-wrap gap-2 mb-6">
            {Array.isArray(project.tech_stack) ? project.tech_stack.map((tech: string, i: number) => (
              <span key={i} class="font-mono text-[10px] text-offwhite/80 bg-white/5 px-2 py-1 rounded">
                {tech}
              </span>
            )) : project.tech_stack?.split(',').map((tech: string, i: number) => (
              <span key={i} class="font-mono text-[10px] text-offwhite/80 bg-white/5 px-2 py-1 rounded">
                {tech.trim()}
              </span>
            ))}
          </div>

          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full py-3 bg-white/5 hover:bg-teal hover:text-charcoal text-offwhite font-poppins text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]">
              Visit Live Project
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
