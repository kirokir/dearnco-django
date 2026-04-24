import { useState, useEffect, useRef } from "preact/hooks";

// ─── Cloudinary Upload Helper ───
async function uploadToCloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.url || null;
    } catch {
        return null;
    }
}

// ─── Universal DragDrop Zone ───
function DragDropZone({ onUpload, accept = 'image/*,video/*,.gif', multiple = false, children, className = '' }: {
    onUpload: (urls: string[]) => void;
    accept?: string;
    multiple?: boolean;
    children?: any;
    className?: string;
}) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFiles = async (files: File[]) => {
        if (!files.length) return;
        setUploading(true);
        const urls: string[] = [];
        for (const file of files) {
            const url = await uploadToCloudinary(file);
            if (url) urls.push(url);
        }
        if (urls.length) onUpload(urls);
        setUploading(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const files = Array.from(e.dataTransfer?.files || []);
        processFiles(multiple ? files : files.slice(0, 1));
    };

    const handleDragOver = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
    const handleDragLeave = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragging(false); };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            class={`relative cursor-pointer transition-all duration-200 ${
                dragging ? 'border-teal bg-teal/10 scale-[1.01]' : 'border-charcoal-light/30 hover:border-teal/40'
            } ${className}`}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                class="hidden"
                onChange={(e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    processFiles(files);
                    (e.target as HTMLInputElement).value = '';
                }}
            />
            {uploading ? (
                <div class="flex items-center justify-center gap-2 py-4">
                    <div class="w-4 h-4 border-2 border-teal border-t-transparent rounded-full animate-spin"></div>
                    <span class="font-mono text-[10px] text-teal uppercase tracking-widest">Uploading to Cloud...</span>
                </div>
            ) : children ? children : (
                <div class="flex flex-col items-center justify-center gap-2 py-6 text-center">
                    <svg class="w-8 h-8 text-teal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <span class="font-mono text-[10px] text-muted uppercase tracking-widest">
                        {dragging ? 'Drop files here' : 'Drag & drop or click to upload'}
                    </span>
                    <span class="font-mono text-[8px] text-muted/60">Images, Videos, GIFs</span>
                </div>
            )}
        </div>
    );
}

export default function AdminInterface() {
    const [activeTab, setActiveTab] = useState<"blog" | "home" | "ideas" | "products" | "enterprise" | "redirects" | "models">("blog");
    const [posts, setPosts] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [ideas, setIdeas] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [redirects, setRedirects] = useState<any[]>([]);
    const [models, setModels] = useState<any[]>([]);
    const [enterprise, setEnterprise] = useState<any>({ hero_video_url: "", locations: "INDIA | CHINA | GCC", company_name: "KINBO TECHNOLOGIES PRIVATE LIMITED" });
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
            const [postsRes, configRes, enterpriseRes, ideasRes, productsRes, redirectsRes, modelsRes] = await Promise.all([
                fetch("/api/blog"),
                fetch("/api/config"),
                fetch("/api/config?key=enterprise_assets"),
                fetch("/api/ideas"),
                fetch("/api/products"),
                fetch("/api/redirects"),
                fetch("/api/models"),
            ]);
            const postsData = await postsRes.json();
            const configData = await configRes.json();
            const enterpriseData = await enterpriseRes.json();
            const ideasData = await ideasRes.json();
            const productsData = await productsRes.json();
            const redirectsData = await redirectsRes.json();
            const modelsData = await modelsRes.json();

            setPosts(Array.isArray(postsData) ? postsData : []);
            setConfig(configData);
            setEnterprise(enterpriseData || { hero_video_url: "", locations: "INDIA | CHINA | GCC", company_name: "KINBO TECHNOLOGIES PRIVATE LIMITED" });
            setIdeas(Array.isArray(ideasData) ? ideasData : []);
            setProducts(Array.isArray(productsData) ? productsData : []);
            setRedirects(Array.isArray(redirectsData) ? redirectsData : []);
            setModels(Array.isArray(modelsData) ? modelsData : []);
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
                <button
                    onClick={() => setActiveTab("products")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "products" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Products ({products.length})
                </button>
                <button
                    onClick={() => setActiveTab("enterprise")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "enterprise" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Enterprise Assets
                </button>
                <button
                    onClick={() => setActiveTab("redirects")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "redirects" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Redirects ({redirects.length})
                </button>
                <button
                    onClick={() => setActiveTab("models")}
                    class={`font-poppins text-xs uppercase tracking-widest pb-2 px-4 transition-all ${activeTab === "models" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-offwhite"
                        }`}
                >
                    Models ({models.length})
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

            {activeTab === "products" && (
                <ProductsManager products={products} onRefresh={fetchData} />
            )}

            {activeTab === "enterprise" && (
                <EnterpriseManager assets={enterprise} onRefresh={fetchData} />
            )}

            {activeTab === "redirects" && (
                <RedirectsManager redirects={redirects} onRefresh={fetchData} />
            )}

            {activeTab === "models" && (
                <ModelsManager models={models} onRefresh={fetchData} />
            )}
        </div>
    );
}

function Input({ label, value, onChange, type = "text", required = false, uploadable = false }: any) {
    // Auto-detect if this field should support uploads (any URL, logo, image, video, media field)
    const isMediaField = uploadable || label.toLowerCase().includes('logo') || label.toLowerCase().includes('image') || label.toLowerCase().includes('url') || label.toLowerCase().includes('video') || label.toLowerCase().includes('photo') || label.toLowerCase().includes('gif');

    const acceptType = label.toLowerCase().includes('video') ? 'video/*' : 'image/*,video/*,.gif';

    return (
        <div class="space-y-1">
            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
            {isMediaField ? (
                <DragDropZone
                    accept={acceptType}
                    className="border border-dashed rounded-lg"
                    onUpload={(urls) => { if (urls[0]) onChange(urls[0]); }}
                >
                    <div class="px-3 py-2">
                        <input
                            type={type}
                            value={value}
                            required={required}
                            onInput={(e) => { e.stopPropagation(); onChange((e.target as any).value); }}
                            onClick={(e) => e.stopPropagation()}
                            class="w-full bg-transparent text-offwhite font-poppins text-sm focus:outline-none placeholder-muted/40"
                            placeholder="Paste URL or drag & drop a file here..."
                        />
                        {value && (
                            <div class="mt-2 flex items-center gap-2">
                                {(value.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) || value.includes('cloudinary')) && !value.match(/\.(mp4|webm|mov)/i) ? (
                                    <img src={value} alt="preview" class="w-10 h-10 object-cover rounded border border-charcoal-light/30" />
                                ) : value.match(/\.(mp4|webm|mov)/i) ? (
                                    <div class="w-10 h-10 rounded bg-teal/10 flex items-center justify-center">
                                        <svg class="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                ) : null}
                                <span class="font-mono text-[8px] text-teal/60 truncate flex-1">{value.split('/').pop()}</span>
                            </div>
                        )}
                    </div>
                </DragDropZone>
            ) : (
                <input
                    type={type}
                    value={value}
                    required={required}
                    onInput={(e) => onChange((e.target as any).value)}
                    class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all"
                />
            )}
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

function ProductsManager({ products, onRefresh }: { products: any[]; onRefresh: () => void }) {
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);

    async function handleSave(e: Event) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(editingProduct),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                setEditingProduct(null);
                setIsNew(false);
                onRefresh();
            }
        } catch (e) {
            console.error("Save error:", e);
        }
        setSaving(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this product?")) return;
        try {
            const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            if (res.ok) onRefresh();
        } catch (e) {
            console.error("Delete error:", e);
        }
    }

    if (editingProduct || isNew) {
        const prod = editingProduct || { name: "", tagline: "", description: "", features: "", category: "", status: "active", sort_order: 0 };
        return (
            <div class="space-y-6 animate-fadeIn">
                <div class="flex justify-between items-center bg-teal/5 p-4 rounded border-l-4 border-teal">
                    <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">
                        {isNew ? "New Product" : `Editing: ${prod.name}`}
                    </h3>
                    <button onClick={() => { setEditingProduct(null); setIsNew(false); }} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
                </div>

                <form onSubmit={handleSave} class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input label="Product Name *" value={prod.name} onChange={(v: string) => setEditingProduct({ ...prod, name: v })} required />
                        <Input label="Tagline" value={prod.tagline} onChange={(v: string) => setEditingProduct({ ...prod, tagline: v })} />
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input label="Logo URL" value={prod.logo_url} onChange={(v: string) => setEditingProduct({ ...prod, logo_url: v })} />
                        <Input label="Category" value={prod.category} onChange={(v: string) => setEditingProduct({ ...prod, category: v })} />
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input label="Play Store Link" value={prod.play_store_link} onChange={(v: string) => setEditingProduct({ ...prod, play_store_link: v })} />
                        <Input label="App Store Link" value={prod.app_store_link} onChange={(v: string) => setEditingProduct({ ...prod, app_store_link: v })} />
                    </div>
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Screenshots (drag & drop multiple)</label>
                        <DragDropZone
                            accept="image/*"
                            multiple={true}
                            className="border border-dashed rounded-xl p-4 min-h-[100px]"
                            onUpload={(urls) => {
                                const existing = Array.isArray(prod.screenshots) ? prod.screenshots : [];
                                setEditingProduct({ ...prod, screenshots: [...existing, ...urls] });
                            }}
                        >
                            {Array.isArray(prod.screenshots) && prod.screenshots.length > 0 ? (
                                <div onClick={(e) => e.stopPropagation()} class="space-y-3">
                                    <div class="flex flex-wrap gap-2">
                                        {prod.screenshots.map((url: string, i: number) => (
                                            <div key={i} class="relative group">
                                                <img src={url} alt={`shot-${i}`} class="w-16 h-16 object-cover rounded border border-charcoal-light/30" />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newShots = prod.screenshots.filter((_: any, idx: number) => idx !== i);
                                                        setEditingProduct({ ...prod, screenshots: newShots });
                                                    }}
                                                    class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >×</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div class="text-center font-mono text-[9px] text-muted/60">Drop more files or click to add</div>
                                </div>
                            ) : undefined}
                        </DragDropZone>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Status</label>
                            <select
                                value={prod.status}
                                onChange={(e) => setEditingProduct({ ...prod, status: (e.target as any).value })}
                                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all"
                            >
                                <option value="active">Active</option>
                                <option value="coming-soon">Coming Soon</option>
                                <option value="deprecated">Deprecated</option>
                            </select>
                        </div>
                        <Input label="Sort Order" type="number" value={prod.sort_order} onChange={(v: string) => setEditingProduct({ ...prod, sort_order: parseInt(v) })} />
                    </div>
                    <div class="space-y-1">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Description *</label>
                        <textarea
                            value={prod.description}
                            onInput={(e) => setEditingProduct({ ...prod, description: (e.target as any).value })}
                            class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-4 text-offwhite font-lora text-sm focus:border-teal outline-none transition-all h-32"
                            required
                        ></textarea>
                    </div>
                    <div class="space-y-1">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Features (one per line)</label>
                        <textarea
                            value={prod.features}
                            onInput={(e) => setEditingProduct({ ...prod, features: (e.target as any).value })}
                            class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-4 text-offwhite font-mono text-xs focus:border-teal outline-none transition-all h-32"
                            placeholder="Dynamic Progress Tracking&#10;In-depth Image Analysis"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all"
                    >
                        {saving ? "SAVING..." : "[ Save Product Node ]"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Products</h2>
                <button
                    onClick={() => setIsNew(true)}
                    class="bg-teal text-charcoal px-4 py-2 rounded font-poppins text-xs font-bold uppercase tracking-widest hover:bg-teal-dark transition-all"
                >
                    + Add Product
                </button>
            </div>

            <div class="grid gap-4">
                {products.map((p) => (
                    <div key={p.id} class="p-4 bg-charcoal-light/20 border border-charcoal-light/30 rounded-lg flex justify-between items-center hover:border-teal/30 transition-all">
                        <div>
                            <h4 class="text-offwhite font-poppins font-medium">{p.name}</h4>
                            <div class="flex gap-2 items-center">
                                <p class="text-[9px] text-muted font-mono uppercase tracking-widest">{p.category || "General"}</p>
                                <span class={`text-[8px] px-1.5 py-0.5 rounded border ${p.status === 'active' ? 'border-teal/30 text-teal bg-teal/5' : 'border-muted/30 text-muted'}`}>{p.status}</span>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <button onClick={() => setEditingProduct(p)} class="text-teal font-mono text-[10px] uppercase hover:underline">[ EDIT ]</button>
                            <button onClick={() => handleDelete(p.id)} class="text-red-400 font-mono text-[10px] uppercase hover:underline">[ DELETE ]</button>
                        </div>
                    </div>
                ))}
                {products.length === 0 && <p class="text-center py-12 text-muted font-mono text-xs">No dynamic products found.</p>}
            </div>
        </div>
    );
}

function EnterpriseManager({ assets, onRefresh }: { assets: any; onRefresh: () => void }) {
    const defaultHero = {
        hero_video_url: '',
        hero_bg_type: 'video', // 'video' | 'image' | 'gif'
        hero_bg_opacity: 0.4,
        hero_bg_darkness: 0.6,
        hero_bg_blur: 2,
        hero_parallax_intensity: 20,
        logo_url: '',
        locations: 'INDIA | CHINA | GCC',
        company_name: 'KINBO TECHNOLOGIES PRIVATE LIMITED',
        founder_photo_url: '/arjun-portrait.png',
    };
    const [localAssets, setLocalAssets] = useState({ ...defaultHero, ...assets });
    const [saving, setSaving] = useState(false);

    async function handleSave(e: Event) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/config", {
                method: "POST",
                body: JSON.stringify({ key: "enterprise_assets", value: localAssets }),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) onRefresh();
        } catch (e) {
            console.error("Save error:", e);
        }
        setSaving(false);
    }

    const bgType = localAssets.hero_bg_type || 'video';

    return (
        <div class="space-y-8 animate-fadeIn">
            <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Enterprise Assets & Hero Editor</h2>
            <form onSubmit={handleSave} class="space-y-8">

                {/* Company & Founder Info */}
                <div class="bg-charcoal-light/5 p-6 rounded-2xl border border-charcoal-light/20 space-y-6">
                    <h3 class="font-poppins text-xs uppercase tracking-[0.2em] text-teal">Company & Founder</h3>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <Input label="Company Name" value={localAssets.company_name} onChange={(v: string) => setLocalAssets({ ...localAssets, company_name: v })} />
                            <Input label="Locations (separator |)" value={localAssets.locations} onChange={(v: string) => setLocalAssets({ ...localAssets, locations: v })} />
                            <Input label="Global Logo URL" value={localAssets.logo_url} onChange={(v: string) => setLocalAssets({ ...localAssets, logo_url: v })} />
                        </div>

                        {/* Dedicated Founder Portrait Upload */}
                        <div class="space-y-3">
                            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Founder Portrait PNG</label>
                            <div class="flex items-center gap-6">
                                <div class="relative group">
                                    <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-teal/20 group-hover:border-teal/50 transition-all bg-charcoal-dark">
                                        {localAssets.founder_photo_url ? (
                                            <img src={localAssets.founder_photo_url} alt="Founder" class="w-full h-full object-cover" />
                                        ) : (
                                            <div class="w-full h-full flex items-center justify-center text-teal/20">
                                                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 bg-teal text-charcoal p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <DragDropZone
                                        accept="image/png,image/webp,image/jpeg"
                                        className="border border-dashed rounded-xl py-4 px-6 text-center"
                                        onUpload={(urls) => { if (urls[0]) setLocalAssets({ ...localAssets, founder_photo_url: urls[0] }); }}
                                    >
                                        <p class="font-mono text-[9px] text-teal/80 uppercase tracking-widest">Drop Portrait PNG here</p>
                                        <p class="font-mono text-[8px] text-muted/60 mt-1 italic">Click or drag & drop</p>
                                    </DragDropZone>
                                    <input 
                                        type="text" 
                                        value={localAssets.founder_photo_url} 
                                        onInput={(e) => setLocalAssets({ ...localAssets, founder_photo_url: (e.target as any).value })}
                                        placeholder="Or paste URL here..."
                                        class="w-full mt-2 bg-charcoal-dark/50 border border-charcoal-light/20 rounded px-2 py-1.5 text-offwhite font-mono text-[9px] focus:border-teal outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KINBO HOME HERO EDITOR */}
                <div class="bg-charcoal-light/5 p-6 rounded-2xl border border-teal/20 space-y-6">
                    <h3 class="font-poppins text-xs uppercase tracking-[0.2em] text-teal flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        KINBO Home Hero Editor
                    </h3>

                    {/* Background Type Selector */}
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Background Type</label>
                        <div class="flex gap-2">
                            {['video', 'image', 'gif'].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setLocalAssets({ ...localAssets, hero_bg_type: t })}
                                    class={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest border transition-all ${
                                        bgType === t
                                            ? 'bg-teal text-charcoal border-teal font-bold'
                                            : 'border-charcoal-light/30 text-muted hover:border-teal/40'
                                    }`}
                                >{t}</button>
                            ))}
                        </div>
                    </div>

                    {/* Background Media Upload */}
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">
                            Hero {bgType === 'video' ? 'Video' : bgType === 'gif' ? 'GIF' : 'Image'} — Drag & Drop
                        </label>
                        <DragDropZone
                            accept={bgType === 'video' ? 'video/*' : bgType === 'gif' ? '.gif,image/gif' : 'image/*'}
                            className="border border-dashed rounded-xl overflow-hidden"
                            onUpload={(urls) => { if (urls[0]) setLocalAssets({ ...localAssets, hero_video_url: urls[0] }); }}
                        >
                            {localAssets.hero_video_url ? (
                                <div onClick={(e) => e.stopPropagation()} class="relative">
                                    {bgType === 'video' ? (
                                        <video src={localAssets.hero_video_url} muted autoPlay loop playsinline class="w-full h-40 object-cover" />
                                    ) : (
                                        <img src={localAssets.hero_video_url} alt="Hero BG" class="w-full h-40 object-cover" />
                                    )}
                                    <div class="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                                        <span class="font-mono text-[10px] text-teal uppercase tracking-widest bg-charcoal/80 px-3 py-1 rounded">Drop new media to replace</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={localAssets.hero_video_url}
                                        onInput={(e) => { e.stopPropagation(); setLocalAssets({ ...localAssets, hero_video_url: (e.target as any).value }); }}
                                        onClick={(e) => e.stopPropagation()}
                                        class="w-full bg-charcoal-dark/90 px-3 py-2 text-offwhite font-mono text-[10px] focus:outline-none border-t border-charcoal-light/20"
                                        placeholder="Or paste a URL..."
                                    />
                                </div>
                            ) : undefined}
                        </DragDropZone>
                    </div>

                    {/* Visual Controls */}
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <Range label="Background Opacity" value={localAssets.hero_bg_opacity ?? 0.4} min={0} max={1} step={0.05} unit="" onChange={(v: number) => setLocalAssets({ ...localAssets, hero_bg_opacity: v })} />
                            <Range label="Overlay Darkness" value={localAssets.hero_bg_darkness ?? 0.6} min={0} max={1} step={0.05} unit="" onChange={(v: number) => setLocalAssets({ ...localAssets, hero_bg_darkness: v })} />
                        </div>
                        <div class="space-y-4">
                            <Range label="Blur Intensity" value={localAssets.hero_bg_blur ?? 2} min={0} max={30} step={1} unit="px" onChange={(v: number) => setLocalAssets({ ...localAssets, hero_bg_blur: v })} />
                            <Range label="Parallax Intensity" value={localAssets.hero_parallax_intensity ?? 20} min={0} max={50} step={5} unit="%" onChange={(v: number) => setLocalAssets({ ...localAssets, hero_parallax_intensity: v })} />
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Live Preview</label>
                        <div class="relative h-48 rounded-xl overflow-hidden border border-charcoal-light/20">
                            {localAssets.hero_video_url && (
                                <>
                                    {bgType === 'video' ? (
                                        <video
                                            src={localAssets.hero_video_url}
                                            muted autoPlay loop playsinline
                                            class="absolute inset-0 w-full h-full object-cover"
                                            style={`filter: blur(${localAssets.hero_bg_blur ?? 2}px); opacity: ${localAssets.hero_bg_opacity ?? 0.4};`}
                                        />
                                    ) : (
                                        <img
                                            src={localAssets.hero_video_url}
                                            alt="Preview"
                                            class="absolute inset-0 w-full h-full object-cover"
                                            style={`filter: blur(${localAssets.hero_bg_blur ?? 2}px); opacity: ${localAssets.hero_bg_opacity ?? 0.4};`}
                                        />
                                    )}
                                    <div
                                        class="absolute inset-0 bg-charcoal-dark"
                                        style={`opacity: ${localAssets.hero_bg_darkness ?? 0.6};`}
                                    ></div>
                                </>
                            )}
                            <div class="absolute inset-0 flex items-center justify-center z-10">
                                <div class="text-center">
                                    <p class="font-mono text-[8px] text-teal uppercase tracking-[0.5em]">KINBO TECHNOLOGIES</p>
                                    <h4 class="font-poppins text-xl font-bold text-offwhite">Intelligent technology</h4>
                                    <p class="font-mono text-[8px] text-muted mt-1">Parallax: {localAssets.hero_parallax_intensity ?? 20}% | Blur: {localAssets.hero_bg_blur ?? 2}px | Dark: {((localAssets.hero_bg_darkness ?? 0.6) * 100).toFixed(0)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all"
                >
                    {saving ? "SAVING..." : "[ Update Enterprise Core ]"}
                </button>
            </form>
        </div>
    );
}

function RedirectsManager({ redirects, onRefresh }: { redirects: any[]; onRefresh: () => void }) {
    const [isNew, setIsNew] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [dnsError, setDnsError] = useState<any>(null);

    async function handleSave(e: Event) {
        e.preventDefault();
        setSaving(true);
        setDnsError(null);
        const data = editing || { fqdn: "", target_url: "" };
        try {
            const res = await fetch("/api/redirects", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            
            if (res.status === 422) {
                const errorData = await res.json();
                setDnsError(errorData);
                setSaving(false);
                return;
            }

            if (res.ok) {
                setEditing(null);
                setIsNew(false);
                onRefresh();
            }
        } catch (e) {
            console.error("Save error:", e);
        }
        setSaving(false);
    }

    async function handleDelete(id: any) {
        if (!confirm("Delete this redirection rule?")) return;
        try {
            const res = await fetch(`/api/redirects?id=${id}`, { method: "DELETE" });
            if (res.ok) onRefresh();
        } catch (e) {
            console.error("Delete error:", e);
        }
    }

    if (isNew || editing) {
        const item = editing || { fqdn: "", target_url: "" };

        if (dnsError) {
            return (
                <div class="space-y-6 animate-fadeIn">
                    <div class="flex justify-between items-center bg-red-500/10 p-4 rounded border-l-4 border-red-500">
                        <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">
                            Failed to Create Redirector
                        </h3>
                        <button onClick={() => setDnsError(null)} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
                    </div>

                    <div class="p-6 bg-charcoal-light/10 border border-red-500/20 rounded-xl space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div class="space-y-2">
                                <p class="text-offwhite font-poppins text-sm font-semibold">DNS failure for <span class="text-red-400">{dnsError.fqdn}</span>, the A record does not resolve to 18.133.72.105</p>
                                <p class="text-muted font-mono text-xs leading-relaxed">
                                    You may need to wait for DNS propagation to complete which can sometimes take a few minutes or hours.
                                </p>
                            </div>
                        </div>

                        <div class="pt-6 border-t border-charcoal-light/20">
                            <h4 class="font-poppins text-[10px] font-bold text-teal uppercase tracking-[0.2em] mb-4">Advanced DNS Information</h4>
                            <p class="text-[10px] text-muted font-mono mb-4 leading-relaxed">
                                The following results were returned as part of the DNS query for your domain <span class="text-offwhite">{dnsError.fqdn}</span>. If you are having trouble setting up a redirector the most likely cause is DNS propagation, which in some cases can take up to 72 hours. Review the TTL values below, if you have recently transferred your domain or updated your name servers the SOA TTL will also impact DNS propagation.
                            </p>
                            
                            <div class="bg-charcoal-dark/50 rounded-lg overflow-hidden border border-charcoal-light/20">
                                <table class="w-full text-left font-mono text-[9px]">
                                    <thead class="bg-charcoal-light/10 text-teal uppercase tracking-widest">
                                        <tr>
                                            <th class="px-3 py-2">Type</th>
                                            <th class="px-3 py-2">Value / Result</th>
                                            <th class="px-3 py-2 text-right">TTL</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-charcoal-light/10 text-offwhite/70">
                                        {Array.isArray(dnsError.diagnostics) && dnsError.diagnostics.length > 0 ? (
                                            dnsError.diagnostics.map((d: any, i: number) => (
                                                <tr key={i} class="hover:bg-white/5 transition-colors">
                                                    <td class="px-3 py-2 font-bold text-teal">{d.type}</td>
                                                    <td class="px-3 py-2 truncate max-w-[200px]">{d.address || d.value || d.ns || JSON.stringify(d)}</td>
                                                    <td class="px-3 py-2 text-right text-muted">{d.ttl || '-'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} class="px-3 py-4 text-center text-muted italic">No public records found yet. Propagation pending.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="flex gap-4 pt-4">
                            <button 
                                onClick={() => handleSave(new Event('submit') as any)} 
                                class="flex-1 py-3 bg-teal/10 border border-teal/30 text-teal font-mono text-[10px] uppercase tracking-widest hover:bg-teal hover:text-charcoal transition-all rounded"
                            >
                                [ RETRY VALIDATION ]
                            </button>
                            <button 
                                onClick={() => setDnsError(null)} 
                                class="flex-1 py-3 bg-charcoal-light/10 border border-charcoal-light/30 text-muted font-mono text-[10px] uppercase tracking-widest hover:text-offwhite transition-all rounded"
                            >
                                [ BACK TO EDITOR ]
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div class="space-y-6 animate-fadeIn">
                <div class="flex justify-between items-center bg-teal/5 p-4 rounded border-l-4 border-teal">
                    <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">
                        {isNew ? "New Redirector" : "Edit Redirector"}
                    </h3>
                    <button onClick={() => { setIsNew(false); setEditing(null); }} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
                </div>

                {/* DNS Configuration Alert */}
                <div class="p-6 bg-charcoal-light/10 border border-teal/20 rounded-xl relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full bg-teal"></div>
                    <h4 class="font-poppins text-sm font-bold text-teal mb-3 uppercase tracking-widest flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        DNS Configuration
                    </h4>
                    <p class="font-mono text-xs text-offwhite/80 leading-relaxed italic">
                        Before creating a redirector please navigate to your DNS provider and add an A record for your FQDN pointing to <span class="text-teal font-bold px-1.5 py-0.5 bg-teal/10 rounded">18.133.72.105</span> allowing time for DNS propagation.
                    </p>
                </div>

                <form onSubmit={handleSave} class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input 
                            label="FQDN (Full Domain)" 
                            value={item.fqdn} 
                            onChange={(v: string) => setEditing({ ...item, fqdn: v })} 
                            placeholder="e.g. link.arjunjayesh.com"
                            required 
                        />
                        <Input 
                            label="Target URL" 
                            value={item.target_url} 
                            onChange={(v: string) => setEditing({ ...item, target_url: v })} 
                            placeholder="e.g. https://github.com/arjunjayesh"
                            required 
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all"
                    >
                        {saving ? "SAVING..." : "[ Establish New Redirector ]"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Redirector Management</h2>
                <button
                    onClick={() => setIsNew(true)}
                    class="bg-teal text-charcoal px-4 py-2 rounded font-poppins text-xs font-bold uppercase tracking-widest hover:bg-teal-dark transition-all"
                >
                    + New Redirector
                </button>
            </div>

            <div class="grid gap-4">
                {redirects.map((r) => (
                    <div key={r.id} class="p-4 bg-charcoal-light/20 border border-charcoal-light/30 rounded-lg flex justify-between items-center hover:border-teal/30 transition-all">
                        <div class="flex-1 min-w-0 pr-4">
                            <h4 class="text-offwhite font-poppins font-medium truncate">{r.fqdn}</h4>
                            <p class="text-[10px] text-teal/60 font-mono truncate">➜ {r.target_url}</p>
                        </div>
                        <div class="flex gap-4">
                            <button onClick={() => setEditing(r)} class="text-teal font-mono text-[10px] uppercase hover:underline">[ EDIT ]</button>
                            <button onClick={() => handleDelete(r.id)} class="text-red-400 font-mono text-[10px] uppercase hover:underline">[ DELETE ]</button>
                        </div>
                    </div>
                ))}
                {redirects.length === 0 && (
                    <div class="text-center py-12 bg-charcoal-light/5 rounded-xl border border-dashed border-charcoal-light/30">
                        <p class="text-muted font-mono text-xs uppercase tracking-widest">No active redirectors configured</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ModelsManager({ models, onRefresh }: { models: any[]; onRefresh: () => void }) {
    const [editing, setEditing] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);

    async function handleSave(e: Event) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/models", {
                method: "POST",
                body: JSON.stringify(editing),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                setEditing(null);
                setIsNew(false);
                onRefresh();
            }
        } catch (e) {
            console.error("Save error:", e);
        }
        setSaving(false);
    }

    async function handleDelete(id: any) {
        if (!confirm("Delete this industry model?")) return;
        try {
            const res = await fetch(`/api/models?id=${id}`, { method: "DELETE" });
            if (res.ok) onRefresh();
        } catch (e) {
            console.error("Delete error:", e);
        }
    }

    if (isNew || editing) {
        const item = editing || { title: "", description: "", category: "General", benchmark_name: "", benchmark_url: "", icon_type: "generic", is_featured: false, sort_order: 0 };
        return (
            <div class="space-y-6 animate-fadeIn">
                <div class="flex justify-between items-center bg-teal/5 p-4 rounded border-l-4 border-teal">
                    <h3 class="font-poppins text-sm font-bold text-offwhite uppercase tracking-widest">
                        {isNew ? "New Industry Model" : `Editing: ${item.title}`}
                    </h3>
                    <button onClick={() => { setIsNew(false); setEditing(null); }} class="text-muted hover:text-offwhite font-mono text-[10px] uppercase">[ X CLOSE ]</button>
                </div>

                <form onSubmit={handleSave} class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input label="Title *" value={item.title} onChange={(v: string) => setEditing({ ...item, title: v })} required />
                        <Input label="Category *" value={item.category} onChange={(v: string) => setEditing({ ...item, category: v })} required />
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <Input label="Benchmark Name" value={item.benchmark_name} onChange={(v: string) => setEditing({ ...item, benchmark_name: v })} />
                        <Input label="Benchmark URL" value={item.benchmark_url} onChange={(v: string) => setEditing({ ...item, benchmark_url: v })} />
                    </div>
                    <div class="grid items-end md:grid-cols-3 gap-4">
                        <div class="space-y-1">
                            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Icon Type</label>
                            <select
                                value={item.icon_type}
                                onChange={(e) => setEditing({ ...item, icon_type: (e.target as any).value })}
                                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded px-3 py-2 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all"
                            >
                                <option value="wp">WordPress</option>
                                <option value="jewel">Jewellery</option>
                                <option value="fashion">Fashion/Clothes</option>
                                <option value="bank">Banking</option>
                                <option value="boutique">Boutique</option>
                                <option value="market">Supermarket</option>
                                <option value="eng">Engineering</option>
                                <option value="health">Healthcare</option>
                                <option value="generic">Generic</option>
                            </select>
                        </div>
                        <div class="flex items-center gap-4 h-[41px] bg-charcoal-dark/50 border border-charcoal-light/20 rounded px-4">
                            <input
                                type="checkbox"
                                checked={item.is_featured}
                                onChange={(e) => setEditing({ ...item, is_featured: (e.target as any).checked })}
                                class="w-4 h-4 accent-teal"
                            />
                            <label class="font-mono text-[10px] text-offwhite uppercase tracking-widest">Featured Card</label>
                        </div>
                        <Input label="Sort Order" type="number" value={item.sort_order} onChange={(v: string) => setEditing({ ...item, sort_order: parseInt(v) })} />
                    </div>
                    <div class="space-y-1">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Description *</label>
                        <textarea
                            value={item.description}
                            onInput={(e) => setEditing({ ...item, description: (e.target as any).value })}
                            class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded p-4 text-offwhite font-lora text-sm focus:border-teal outline-none transition-all h-32"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded hover:bg-teal-dark transition-all"
                    >
                        {saving ? "SAVING..." : "[ Update Library Node ]"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="font-poppins text-xl font-bold text-offwhite uppercase tracking-wider">Models Library</h2>
                <button
                    onClick={() => setIsNew(true)}
                    class="bg-teal text-charcoal px-4 py-2 rounded font-poppins text-xs font-bold uppercase tracking-widest hover:bg-teal-dark transition-all"
                >
                    + Add Model
                </button>
            </div>

            <div class="grid gap-4">
                {models.map((m) => (
                    <div key={m.id} class="p-4 bg-charcoal-light/20 border border-charcoal-light/30 rounded-lg flex justify-between items-center hover:border-teal/30 transition-all">
                        <div>
                            <h4 class="text-offwhite font-poppins font-medium">{m.title} {m.is_featured && <span class="text-[8px] text-teal border border-teal/20 px-1 rounded ml-2">FEATURED</span>}</h4>
                            <p class="text-[10px] text-muted font-mono uppercase tracking-widest">{m.category} • {m.icon_type}</p>
                        </div>
                        <div class="flex gap-4">
                            <button onClick={() => setEditing(m)} class="text-teal font-mono text-[10px] uppercase hover:underline">[ EDIT ]</button>
                            <button onClick={() => handleDelete(m.id)} class="text-red-400 font-mono text-[10px] uppercase hover:underline">[ DELETE ]</button>
                        </div>
                    </div>
                ))}
                {models.length === 0 && (
                    <div class="text-center py-12 bg-charcoal-light/5 rounded-xl border border-dashed border-charcoal-light/30">
                        <p class="text-muted font-mono text-xs uppercase tracking-widest">No industry models configured</p>
                    </div>
                )}
            </div>
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
