import { useState } from "preact/hooks";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

type Category = "All" | "Software" | "Research" | "Automation";

const categories: Category[] = ["All", "Software", "Research", "Automation"];

const categoryColors: Record<string, string> = {
    Software: "#2A9D8F",
    Research: "#E9C46A",
    Automation: "#E76F51",
};

export default function BlogFilter({ posts }: { posts: BlogPost[] }) {
    const [active, setActive] = useState<Category>("All");

    const filtered =
        active === "All" ? posts : posts.filter((p) => p.category === active);

    return (
        <div>
            {/* Filter Tabs */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    justifyContent: "center",
                    marginBottom: "3rem",
                }}
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        style={{
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            padding: "0.5rem 1.5rem",
                            borderRadius: "9999px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            border:
                                active === cat
                                    ? "2px solid #2A9D8F"
                                    : "2px solid rgba(245,245,247,0.15)",
                            background:
                                active === cat ? "rgba(42,157,143,0.15)" : "transparent",
                            color: active === cat ? "#2A9D8F" : "#9CA3AF",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Blog Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {filtered.map((post, i) => (
                    <article
                        key={post.slug}
                        style={{
                            borderRadius: "1rem",
                            border: "1px solid rgba(245,245,247,0.08)",
                            background:
                                "linear-gradient(145deg, rgba(42,42,42,0.6), rgba(30,30,30,0.9))",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            animation: "fadeSlideIn 0.4s ease forwards",
                            animationDelay: `${i * 0.08}s`,
                            opacity: 0,
                        }}
                        class="blog-card"
                    >
                        {/* Colored top accent bar */}
                        <div
                            style={{
                                height: "3px",
                                background: `linear-gradient(to right, ${categoryColors[post.category]}, transparent)`,
                            }}
                        />

                        <div style={{ padding: "1.5rem" }}>
                            {/* Category + Date row */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                        fontFamily: '"Roboto Mono", monospace',
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        padding: "0.2rem 0.6rem",
                                        borderRadius: "9999px",
                                        color: categoryColors[post.category],
                                        border: `1px solid ${categoryColors[post.category]}33`,
                                        background: `${categoryColors[post.category]}15`,
                                    }}
                                >
                                    {post.category}
                                </span>
                                <span
                                    style={{
                                        fontFamily: '"Roboto Mono", monospace',
                                        fontSize: "0.65rem",
                                        color: "#6B7280",
                                    }}
                                >
                                    {post.date}
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "#F5F5F7",
                                    margin: "0 0 0.5rem 0",
                                    lineHeight: 1.3,
                                }}
                            >
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p
                                style={{
                                    fontFamily: '"Lora", serif',
                                    fontSize: "0.85rem",
                                    color: "#9CA3AF",
                                    lineHeight: 1.6,
                                    margin: "0 0 1rem 0",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {post.excerpt}
                            </p>

                            {/* Read more */}
                            <a
                                href={`/blog/${post.slug}`}
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    color: "#2A9D8F",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                    transition: "all 0.3s ease",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.gap = "0.6rem")}
                                onMouseLeave={(e) => (e.currentTarget.style.gap = "0.3rem")}
                            >
                                Read more
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card:hover {
          border-color: rgba(42,157,143,0.25) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
      `}</style>
        </div>
    );
}

