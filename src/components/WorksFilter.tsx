import { useState } from "preact/hooks";
import type { WorkItem } from "../data/works";
import { works } from "../data/works";

type Category = 
    | "All"
    | "Fundamental research & architectures"
    | "AI / cognition / scientific systems"
    | "Infrastructure & developer platforms"
    | "High-complexity applications"
    | "Product platforms"
    | "Specialized tools & creative software"
    | "Experiments, simulations & games"
    | "Commercial websites & deployments";

const categories: Category[] = [
    "All",
    "Fundamental research & architectures",
    "AI / cognition / scientific systems",
    "Infrastructure & developer platforms",
    "High-complexity applications",
    "Product platforms",
    "Specialized tools & creative software",
    "Experiments, simulations & games",
    "Commercial websites & deployments"
];

const categoryColors: Record<string, string> = {
    "Fundamental research & architectures": "#8A2BE2",
    "AI / cognition / scientific systems": "#E9C46A",
    "Infrastructure & developer platforms": "#2A9D8F",
    "High-complexity applications": "#E76F51",
    "Product platforms": "#457B9D",
    "Specialized tools & creative software": "#F4A261",
    "Experiments, simulations & games": "#9B5DE5",
    "Commercial websites & deployments": "#00F5D4"
};

export default function WorksFilter() {
    const [active, setActive] = useState<Category>("All");

    const filtered =
        active === "All" ? works : works.filter((w) => w.category === active);

    return (
        <div>
            {/* Filter pills */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    position: "sticky",
                    top: "4.25rem",
                    zIndex: 20,
                    paddingTop: "0.75rem",
                    paddingBottom: "1rem",
                    background: "var(--charcoal)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(128,128,128,0.1)",
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
                                    ? "2px solid var(--teal)"
                                    : "2px solid rgba(128,128,128,0.15)",
                            background:
                                active === cat ? "rgba(42,157,143,0.15)" : "transparent",
                            color: active === cat ? "var(--teal)" : "var(--muted)",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
                {/* Central dotted line */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        borderLeft: "2px dashed rgba(42,157,143,0.3)",
                        transform: "translateX(-1px)",
                    }}
                    class="hidden md:block"
                />
                {/* Mobile: left-aligned line */}
                <div
                    style={{
                        position: "absolute",
                        left: "20px",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        borderLeft: "2px dashed rgba(42,157,143,0.3)",
                    }}
                    class="block md:hidden"
                />

                {/* Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    {filtered.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: isLeft ? "flex-start" : "flex-end",
                                    position: "relative",
                                    animation: "fadeSlideIn 0.5s ease forwards",
                                    animationDelay: `${i * 0.08}s`,
                                    opacity: 0,
                                }}
                                class="timeline-item"
                            >
                                {/* Center dot - Desktop */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        width: "14px",
                                        height: "14px",
                                        borderRadius: "50%",
                                        background: "var(--teal)",
                                        border: "3px solid var(--charcoal)",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 2,
                                        boxShadow: "0 0 12px var(--teal-glow)",
                                    }}
                                    class="hidden md:block"
                                />

                                {/* Mobile dot */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "20px",
                                        top: "50%",
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        background: "var(--teal)",
                                        border: "3px solid var(--charcoal)",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 2,
                                    }}
                                    class="block md:hidden"
                                />

                                {/* Connector line - Desktop */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        width: "calc(50% - 150px)",
                                        height: "1px",
                                        borderTop: "1px dashed rgba(42,157,143,0.3)",
                                        ...(isLeft
                                            ? { left: "calc(50% + 7px)" }
                                            : { right: "calc(50% + 7px)" }),
                                    }}
                                    class="hidden md:block"
                                />

                                {/* Card */}
                                <div
                                    style={{
                                        width: "calc(50% - 60px)",
                                        padding: "1.5rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(245,245,247,0.08)",
                                        background:
                                            "linear-gradient(135deg, rgba(var(--charcoal-light-rgb, 42,42,42), 0.6), rgba(var(--charcoal-rgb, 30,30,30), 0.8))",
                                        backdropFilter: "blur(8px)",
                                        transition: "all 0.3s ease",
                                        ...(isLeft
                                            ? { marginRight: "auto" }
                                            : { marginLeft: "auto" }),
                                    }}
                                    class="hidden md:block works-card"
                                >
                                    <div
                                        style={{
                                            display: "inline-block",
                                            fontSize: "0.65rem",
                                            fontFamily: '"Roboto Mono", monospace',
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "9999px",
                                            marginBottom: "0.75rem",
                                            color: categoryColors[item.category],
                                            border: `1px solid ${categoryColors[item.category]}33`,
                                            background: `${categoryColors[item.category]}15`,
                                        }}
                                    >
                                        {item.category}
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: '"Poppins", sans-serif',
                                            fontSize: "1.1rem",
                                            fontWeight: 600,
                                            color: "var(--offwhite)",
                                            marginBottom: "0.5rem",
                                            margin: "0 0 0.5rem 0",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: '"Lora", serif',
                                            fontSize: "0.875rem",
                                            color: "var(--muted)",
                                            lineHeight: 1.6,
                                            margin: 0,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                    {item.stack && (
                                        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#2A9D8F", fontFamily: '"Roboto Mono", monospace' }}>
                                            &gt; {item.stack}
                                        </div>
                                    )}
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.8rem", color: "#F5F5F7", textDecoration: "none", borderBottom: "1px solid rgba(245,245,247,0.3)", transition: "all 0.2s ease" }}
                                            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#2A9D8F")}
                                            onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(245,245,247,0.3)")}
                                        >
                                            View Project ↗
                                        </a>
                                    )}
                                </div>

                                {/* Mobile card */}
                                <div
                                    style={{
                                        marginLeft: "44px",
                                        padding: "1.25rem",
                                        borderRadius: "0.75rem",
                                        border: "1px solid rgba(245,245,247,0.08)",
                                        background:
                                            "linear-gradient(135deg, rgba(var(--charcoal-light-rgb, 42,42,42), 0.6), rgba(var(--charcoal-rgb, 30,30,30), 0.8))",
                                        backdropFilter: "blur(8px)",
                                        WebkitBackdropFilter: "blur(8px)",
                                        flex: 1,
                                    }}
                                    class="block md:hidden"
                                >
                                    <div
                                        style={{
                                            display: "inline-block",
                                            fontSize: "0.6rem",
                                            fontFamily: '"Roboto Mono", monospace',
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            padding: "0.2rem 0.6rem",
                                            borderRadius: "9999px",
                                            marginBottom: "0.5rem",
                                            color: categoryColors[item.category],
                                            border: `1px solid ${categoryColors[item.category]}33`,
                                            background: `${categoryColors[item.category]}15`,
                                        }}
                                    >
                                        {item.category}
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: '"Poppins", sans-serif',
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            color: "var(--offwhite)",
                                            margin: "0 0 0.4rem 0",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: '"Lora", serif',
                                            fontSize: "0.8rem",
                                            color: "var(--muted)",
                                            lineHeight: 1.5,
                                            margin: 0,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                    {item.stack && (
                                        <div style={{ marginTop: "0.4rem", fontSize: "0.7rem", color: "#2A9D8F", fontFamily: '"Roboto Mono", monospace' }}>
                                            &gt; {item.stack}
                                        </div>
                                    )}
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.75rem", color: "#F5F5F7", textDecoration: "none", borderBottom: "1px solid rgba(245,245,247,0.3)" }}
                                        >
                                            View Project ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Animation keyframes */}
            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .works-card:hover {
          border-color: rgba(var(--teal-rgb, 42,157,143), 0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(var(--teal-rgb, 42,157,143), 0.1);
        }
      `}</style>
        </div>
    );
}
