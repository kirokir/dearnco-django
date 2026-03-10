import { useState, useEffect } from "preact/hooks";

export default function AdminInterface() {
    const [activeTab, setActiveTab] = useState<"blog" | "home" | "ideas">("blog");
    const [posts, setPosts] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [ideas, setIdeas] = useState<any[]>([]);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [isNewPost, setIsNewPost] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        try {
            const [postsRes, configRes, ideasRes] = await Promise.all([
                fetch("/api/blog"),
                fetch("/api/config"),
                fetch("/api/ideas"),
            ]);
            const postsData = await postsRes.json();
            const configData = await configRes.json();
            const ideasData = await ideasRes.json();
            setPosts(Array.isArray(postsData) ? postsData : []);
            setConfig(configData);
            setIdeas(Array.isArray(ideasData) ? ideasData : []);
        } catch (e) {
            console.error("Fetch error:", e);
        }
        setLoading(false);
    }

    async function saveConfig() {
        setMessage("Saving config...");
        try {
            const res = await fetch("/api/config", {
                method: "POST",
                body: JSON.stringify(config),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) setMessage("Config saved successfully!");
        } catch (e) {
            setMessage("Error saving config.");
        }
        setTimeout(() => setMessage(""), 3000);
    }

    async function savePost(post: any) {
        setMessage("Saving post...");
        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                body: JSON.stringify(post),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                setMessage("Post saved successfully!");
                setEditingPost(null);
                setIsNewPost(false);
                fetchData();
            }
        } catch (e) {
            setMessage("Error saving post.");
        }
        setTimeout(() => setMessage(""), 3000);
    }

    async function deletePost(slug: string) {
        if (!confirm(`Delete post "${slug}"?`)) return;
        setMessage("Deleting...");
        try {
            const res = await fetch(`/api/blog?slug=${slug}`, { method: "DELETE" });
            if (res.ok) {
                setMessage("Post deleted.");
                fetchData();
            }
        } catch (e) {
            setMessage("Error deleting post.");
        }
        setTimeout(() => setMessage(""), 3000);
    }

    if (loading) return <div class="text-teal font-mono">INITIALIZING_SESSION...</div>;

    return (
        <div class="space-y-8">
            {message && (
                <div class="fixed bottom-8 right-8 bg-teal text-charcoal px-6 py-3 rounded-lg font-poppins text-sm font-bold shadow-xl z-[100] animate-bounce">
                    {message}
                </div>
            )}

            {/* Tabs */}
            <div class="flex gap-4 border-b border-charcoal-light/30 pb-4">
                <button
                    onClick={() => setActiveTab("blog")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "blog" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Blog Manager
                </button>
                <button
                    onClick={() => setActiveTab("home")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "home" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Homepage Editor
                </button>
                <button
                    onClick={() => setActiveTab("ideas")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "ideas" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Ideas ({ideas.length})
                </button>
            </div>

            {activeTab === "blog" && (
                <div class="space-y-6">
                    {!editingPost && !isNewPost ? (
                        <>
                            <div class="flex justify-between items-center">
                                <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Posts</h2>
                                <button
                                    onClick={() => setIsNewPost(true)}
                                    class="bg-teal text-charcoal px-4 py-2 rounded font-poppins text-xs font-bold uppercase tracking-widest hover:bg-teal-dark transition-all"
                                >
                                    + New Post
                                </button>
                            </div>
                            <div class="grid gap-4">
                                {posts.map((p) => (
                                    <div key={p.slug} class="p-4 bg-charcoal-light/20 border border-charcoal-light/30 rounded-lg flex justify-between items-center hover:border-teal/30 transition-all">
                                        <div>
                                            <h4 class="text-offwhite font-poppins font-medium">{p.slug}</h4>
                                            <p class="text-[10px] text-muted font-mono uppercase">MDX File Interface</p>
                                        </div>
                                        <div class="flex gap-4">
                                            <button onClick={() => setEditingPost(p)} class="text-teal font-mono text-[10px] uppercase hover:underline">[ EDIT ]</button>
                                            <button onClick={() => deletePost(p.slug)} class="text-red-400 font-mono text-[10px] uppercase hover:underline">[ DELETE ]</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <PostEditor
                            post={editingPost || { slug: "", title: "", category: "Software", date: new Date().toISOString().split('T')[0], excerpt: "", body: "" }}
                            onSave={savePost}
                            onCancel={() => { setEditingPost(null); setIsNewPost(false); }}
                        />
                    )}
                </div>
            )}

            {activeTab === "home" && config && (
                <div class="space-y-8 animate-fadeIn">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <h3 class="font-poppins text-xs uppercase tracking-[0.2em] text-teal">Hero Content</h3>
                            <div class="space-y-4">
                                <Input label="First Name" value={config.hero.firstName} onChange={(v: string) => setConfig({ ...config, hero: { ...config.hero, firstName: v } })} />
                                <Input label="Last Name" value={config.hero.lastName} onChange={(v: string) => setConfig({ ...config, hero: { ...config.hero, lastName: v } })} />
                                <Input label="Role Title" value={config.hero.role} onChange={(v: string) => setConfig({ ...config, hero: { ...config.hero, role: v } })} />
                                <div class="space-y-1">
                                    <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Bio Paragraph</label>
                                    <textarea
                                        value={config.hero.bio}
                                        onInput={(e) => setConfig({ ...config, hero: { ...config.hero, bio: (e.target as any).value } })}
                                        class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-3 text-offwhite font-lora text-sm focus:border-teal outline-none transition-all h-32"
                                    ></textarea>
                                </div>
                            </div>

                            <h3 class="font-poppins text-xs uppercase tracking-[0.2em] text-teal pt-4">Video Background</h3>
                            <div class="space-y-4">
                                <Input label="Video URL" value={config.hero.video.url} onChange={(v: string) => setConfig({ ...config, hero: { ...config.hero, video: { ...config.hero.video, url: v } } })} />
                                <Range label="Blur Intensity" value={config.hero.video.blur} min={0} max={20} step={1} unit="px" onChange={(v: number) => setConfig({ ...config, hero: { ...config.hero, video: { ...config.hero.video, blur: v } } })} />
                                <Range label="Video Opacity" value={config.hero.video.opacity} min={0} max={1} step={0.1} unit="" onChange={(v: number) => setConfig({ ...config, hero: { ...config.hero, video: { ...config.hero.video, opacity: v } } })} />
                                <Range label="Overlay Darkness" value={config.hero.video.overlayDarkness} min={0} max={1} step={0.1} unit="" onChange={(v: number) => setConfig({ ...config, hero: { ...config.hero, video: { ...config.hero.video, overlayDarkness: v } } })} />
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="font-poppins text-xs uppercase tracking-[0.2em] text-teal">System Stats</h3>
                            <div class="grid gap-4">
                                {config.stats.map((stat: any, i: number) => (
                                    <div key={i} class="grid grid-cols-2 gap-4">
                                        <Input label={`Stat ${i + 1} Label`} value={stat.label} onChange={(v: string) => {
                                            const newStats = [...config.stats];
                                            newStats[i].label = v;
                                            setConfig({ ...config, stats: newStats });
                                        }} />
                                        <Input label={`Stat ${i + 1} Value`} value={stat.value} onChange={(v: string) => {
                                            const newStats = [...config.stats];
                                            newStats[i].value = v;
                                            setConfig({ ...config, stats: newStats });
                                        }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={saveConfig}
                        class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all"
                    >
                        Update Production Site
                    </button>
                </div>
            )}

            {activeTab === "ideas" && (
                <IdeasViewer ideas={ideas} onRefresh={fetchData} />
            )}
        </div>
    );
}

function Input({ label, value, onChange }: any) {
    return (
        <div class="space-y-1">
            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
            <input
                type="text"
                value={value}
                onInput={(e) => onChange((e.target as any).value)}
                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all"
            />
        </div>
    );
}

function Range({ label, value, min, max, step, unit, onChange }: any) {
    return (
        <div class="space-y-1">
            <div class="flex justify-between items-center">
                <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
                <span class="text-[10px] font-mono text-teal">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onInput={(e) => onChange(parseFloat((e.target as any).value))}
                class="w-full h-1 bg-charcoal-dark border-none appearance-none cursor-pointer accent-teal"
            />
        </div>
    );
}

function PostEditor({ post, onSave, onCancel }: any) {
    const [data, setData] = useState(post.content ? parseMDX(post.content, post.slug) : post);

    return (
        <div class="space-y-6 animate-fadeIn">
            <div class="flex justify-between items-center bg-charcoal-light/10 p-4 rounded border-l-4 border-teal">
                <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">Editing: {data.slug || "New Post"}</h3>
                <button onClick={onCancel} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <Input label="Post Slug (Filename)" value={data.slug} onChange={(v: string) => setData({ ...data, slug: v })} />
                    <Input label="Title" value={data.title} onChange={(v: string) => setData({ ...data, title: v })} />
                    <div class="grid grid-cols-2 gap-4">
                        <Input label="Category" value={data.category} onChange={(v: string) => setData({ ...data, category: v })} />
                        <Input label="Date (YYYY-MM-DD)" value={data.date} onChange={(v: string) => setData({ ...data, date: v })} />
                    </div>
                    <Input label="Excerpt" value={data.excerpt} onChange={(v: string) => setData({ ...data, excerpt: v })} />
                </div>
                <div class="space-y-1">
                    <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">MDX Body Content</label>
                    <textarea
                        value={data.body}
                        onInput={(e) => setData({ ...data, body: (e.target as any).value })}
                        class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-4 text-offwhite font-mono text-xs focus:border-teal outline-none transition-all h-64 h-full min-h-[300px]"
                        placeholder="# Start writing..."
                    ></textarea>
                </div>
            </div>
            <button
                onClick={() => onSave(data)}
                class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all shadow-lg"
            >
                Save MDX Node
            </button>
        </div>
    );
}

// Simple Frontmatter Parser (very basic for this demo)
function parseMDX(content: string, slug: string) {
    const fmRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(fmRegex);
    const body = content.replace(fmRegex, "").trim();
    const fm: any = {};
    if (match) {
        match[1].split("\n").forEach(line => {
            const [key, ...val] = line.split(":");
            if (key && val) fm[key.trim()] = val.join(":").trim().replace(/^"|"$/g, '');
        });
    }
    return { slug, body, ...fm };
}

function IdeasViewer({ ideas, onRefresh }: { ideas: any[]; onRefresh: () => void }) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);

    async function handleDelete(id: number) {
        if (!confirm("Delete this idea submission?")) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/ideas?id=${id}`, { method: "DELETE" });
            if (res.ok) onRefresh();
        } catch (e) {
            console.error("Delete error:", e);
        }
        setDeleting(null);
    }

    const statusColors: Record<string, string> = {
        new: "bg-teal/20 text-teal border-teal/30",
        reviewed: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        accepted: "bg-green-500/20 text-green-400 border-green-500/30",
        rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    if (!ideas.length) {
        return (
            <div class="text-center py-16 space-y-4">
                <div class="text-5xl opacity-30">💡</div>
                <p class="font-mono text-sm text-muted">No idea submissions yet.</p>
            </div>
        );
    }

    return (
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">
                    Idea Submissions
                </h2>
                <span class="font-mono text-xs text-teal">{ideas.length} total</span>
            </div>

            {ideas.map((idea) => (
                <div
                    key={idea.id}
                    class="bg-charcoal-light/10 border border-charcoal-light/30 rounded-xl overflow-hidden hover:border-teal/30 transition-all"
                >
                    {/* Header */}
                    <div
                        class="p-4 flex justify-between items-start cursor-pointer"
                        onClick={() => setExpanded(expanded === idea.id ? null : idea.id)}
                    >
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-3 mb-1">
                                <h4 class="text-offwhite font-poppins font-medium truncate">
                                    {idea.idea_title}
                                </h4>
                                <span
                                    class={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase border ${statusColors[idea.status] || statusColors.new
                                        }`}
                                >
                                    {idea.status}
                                </span>
                            </div>
                            <div class="flex items-center gap-4 text-[10px] font-mono text-muted">
                                <span>{idea.name}</span>
                                <span>•</span>
                                <span>{idea.project_type?.replace("_", " ")}</span>
                                <span>•</span>
                                <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 ml-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(idea.id);
                                }}
                                disabled={deleting === idea.id}
                                class="text-red-400 font-mono text-[10px] uppercase hover:underline disabled:opacity-50"
                            >
                                {deleting === idea.id ? "..." : "[ DEL ]"}
                            </button>
                            <span class="text-muted text-xs">{expanded === idea.id ? "▲" : "▼"}</span>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {expanded === idea.id && (
                        <div class="border-t border-charcoal-light/20 p-4 space-y-4 animate-fadeIn">
                            <div class="grid md:grid-cols-2 gap-6">
                                {/* Contact Info */}
                                <div class="space-y-3">
                                    <h5 class="font-mono text-[10px] text-teal uppercase tracking-widest">Contact</h5>
                                    <InfoRow label="Name" value={idea.name} />
                                    <InfoRow label="Email" value={idea.email} link={`mailto:${idea.email}`} />
                                    {idea.phone && <InfoRow label="Phone" value={idea.phone} />}
                                    {idea.linkedin && <InfoRow label="LinkedIn" value={idea.linkedin} link={idea.linkedin} />}
                                    {idea.portfolio_url && <InfoRow label="Portfolio" value={idea.portfolio_url} link={idea.portfolio_url} />}
                                </div>

                                {/* Project Details */}
                                <div class="space-y-3">
                                    <h5 class="font-mono text-[10px] text-teal uppercase tracking-widest">Project</h5>
                                    <InfoRow label="Type" value={idea.project_type?.replace("_", " ")} />
                                    {idea.budget && <InfoRow label="Budget" value={idea.budget} />}
                                    {idea.timeline && <InfoRow label="Timeline" value={idea.timeline} />}
                                    {idea.target_audience && <InfoRow label="Audience" value={idea.target_audience} />}
                                </div>
                            </div>

                            {/* Description */}
                            <div class="space-y-1">
                                <h5 class="font-mono text-[10px] text-teal uppercase tracking-widest">Description</h5>
                                <p class="text-offwhite font-lora text-sm leading-relaxed whitespace-pre-wrap bg-charcoal-dark/50 p-4 rounded-lg">
                                    {idea.idea_description}
                                </p>
                            </div>

                            {/* Features */}
                            {idea.features && (
                                <div class="space-y-1">
                                    <h5 class="font-mono text-[10px] text-teal uppercase tracking-widest">Features</h5>
                                    <p class="text-muted font-lora text-sm leading-relaxed whitespace-pre-wrap bg-charcoal-dark/50 p-4 rounded-lg">
                                        {idea.features}
                                    </p>
                                </div>
                            )}

                            {/* Notes */}
                            {idea.additional_notes && (
                                <div class="space-y-1">
                                    <h5 class="font-mono text-[10px] text-teal uppercase tracking-widest">Additional Notes</h5>
                                    <p class="text-muted font-lora text-sm leading-relaxed whitespace-pre-wrap bg-charcoal-dark/50 p-4 rounded-lg">
                                        {idea.additional_notes}
                                    </p>
                                </div>
                            )}

                            <div class="text-right font-mono text-[9px] text-muted pt-2">
                                Submitted: {new Date(idea.created_at).toLocaleString()}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function InfoRow({ label, value, link }: { label: string; value: string; link?: string }) {
    return (
        <div class="flex items-start gap-2 text-sm">
            <span class="font-mono text-[10px] text-muted uppercase min-w-[70px]">{label}:</span>
            {link ? (
                <a href={link} target="_blank" rel="noopener" class="text-teal hover:underline truncate">{value}</a>
            ) : (
                <span class="text-offwhite capitalize">{value}</span>
            )}
        </div>
    );
}
