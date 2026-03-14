import { useState } from "preact/hooks";

const PROJECT_TYPES = [
    { value: "prototype", label: "Prototype / MVP" },
    { value: "startup_website", label: "Startup Website" },
    { value: "web_app", label: "Web Application" },
    { value: "mobile_app", label: "Mobile App" },
    { value: "ai_ml", label: "AI / ML Solution" },
    { value: "automation", label: "Automation System" },
    { value: "other", label: "Other" },
];

const BUDGETS = [
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
    "Let's discuss",
];

const TIMELINES = [
    "1-2 Weeks",
    "1 Month",
    "2-3 Months",
    "3-6 Months",
    "6+ Months",
    "Flexible",
];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    project_type: "",
    budget: "",
    timeline: "",
    idea_title: "",
    idea_description: "",
    target_audience: "",
    features: "",
    portfolio_url: "",
    linkedin: "",
    additional_notes: "",
};

export default function IdeasForm() {
    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function updateField(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        setSending(true);
        setStatus("idle");
        setErrorMsg("");

        try {
            const res = await fetch("/api/ideas", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setForm(initialForm);
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
        setSending(false);
    }

    if (status === "success") {
        return (
            <div class="text-center py-20 space-y-6 animate-fadeIn">
                <div class="w-20 h-20 mx-auto rounded-full bg-teal/20 flex items-center justify-center">
                    <svg class="w-10 h-10 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 class="font-poppins text-2xl font-bold text-offwhite">Idea Received!</h3>
                <p class="font-lora text-muted max-w-md mx-auto">
                    Your submission has been logged. I'll review it and get back to you within 24-48 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    class="mt-4 px-8 py-3 border border-teal/30 text-teal font-mono text-xs uppercase tracking-widest rounded-full hover:bg-teal hover:text-charcoal transition-all"
                >
                    Submit Another Idea
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} class="space-y-8 animate-fadeIn">
            {status === "error" && (
                <div class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-xs">
                    {errorMsg}
                </div>
            )}

            {/* Section 1: About You */}
            <div class="space-y-2">
                <h3 class="font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">1</span>
                    About You
                </h3>
                <div class="grid md:grid-cols-2 gap-4 pt-2">
                    <FormField label="Full Name *" value={form.name} onChange={(v) => updateField("name", v)} required placeholder="John Doe" />
                    <FormField label="Email *" value={form.email} onChange={(v) => updateField("email", v)} type="email" required placeholder="john@example.com" />
                    <FormField label="Phone" value={form.phone} onChange={(v) => updateField("phone", v)} placeholder="+1 (555) 000-0000" />
                    <FormField label="LinkedIn Profile" value={form.linkedin} onChange={(v) => updateField("linkedin", v)} placeholder="https://linkedin.com/in/..." />
                </div>
                <div class="pt-2">
                    <FormField label="Portfolio / Website URL" value={form.portfolio_url} onChange={(v) => updateField("portfolio_url", v)} placeholder="https://yourportfolio.com" />
                </div>
            </div>

            {/* Section 2: Project Type */}
            <div class="space-y-2">
                <h3 class="font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">2</span>
                    What Do You Need?
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {PROJECT_TYPES.map((type) => (
                        <button
                            type="button"
                            key={type.value}
                            onClick={() => updateField("project_type", type.value)}
                            class={`p-3 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all ${form.project_type === type.value
                                    ? "bg-teal/20 border-teal text-teal"
                                    : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Section 3: Your Idea */}
            <div class="space-y-2">
                <h3 class="font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">3</span>
                    Your Idea
                </h3>
                <div class="space-y-4 pt-2">
                    <FormField label="Idea / Project Title *" value={form.idea_title} onChange={(v) => updateField("idea_title", v)} required placeholder="e.g. AI-Powered Recipe Generator" />
                    <FormTextarea label="Describe Your Idea *" value={form.idea_description} onChange={(v) => updateField("idea_description", v)} required placeholder="Explain your concept, the problem it solves, and your vision..." rows={5} />
                    <FormField label="Target Audience" value={form.target_audience} onChange={(v) => updateField("target_audience", v)} placeholder="e.g. Small business owners, Students, Healthcare..." />
                    <FormTextarea label="Key Features / Requirements" value={form.features} onChange={(v) => updateField("features", v)} placeholder="List the main features you'd like to see..." rows={3} />
                </div>
            </div>

            {/* Section 4: Budget & Timeline */}
            <div class="space-y-2">
                <h3 class="font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">4</span>
                    Budget & Timeline
                </h3>
                <div class="grid md:grid-cols-2 gap-6 pt-2">
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Estimated Budget</label>
                        <div class="grid grid-cols-2 gap-2">
                            {BUDGETS.map((b) => (
                                <button
                                    type="button"
                                    key={b}
                                    onClick={() => updateField("budget", b)}
                                    class={`p-2 rounded border text-[10px] font-mono tracking-wider transition-all ${form.budget === b
                                            ? "bg-teal/20 border-teal text-teal"
                                            : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"
                                        }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Expected Timeline</label>
                        <div class="grid grid-cols-2 gap-2">
                            {TIMELINES.map((t) => (
                                <button
                                    type="button"
                                    key={t}
                                    onClick={() => updateField("timeline", t)}
                                    class={`p-2 rounded border text-[10px] font-mono tracking-wider transition-all ${form.timeline === t
                                            ? "bg-teal/20 border-teal text-teal"
                                            : "bg-charcoal-dark border-charcoal-light/30 text-muted hover:border-teal/50"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 5: Additional */}
            <div class="space-y-2">
                <h3 class="font-poppins text-xs uppercase tracking-[0.3em] text-teal flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">5</span>
                    Anything Else?
                </h3>
                <FormTextarea label="Additional Notes" value={form.additional_notes} onChange={(v) => updateField("additional_notes", v)} placeholder="Any references, inspirations, competitors, or special requirements..." rows={3} />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={sending || !form.name || !form.email || !form.project_type || !form.idea_title || !form.idea_description}
                class="w-full py-4 bg-teal text-charcoal font-poppins font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(42,157,143,0.3)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {sending ? "TRANSMITTING..." : "[ Submit Idea ]"}
            </button>
        </form>
    );
}

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    required?: boolean;
    placeholder?: string;
}

function FormField({ label, value, onChange, type = "text", required = false, placeholder = "" }: FormFieldProps) {
    return (
        <div class="space-y-1">
            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
            <input
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onInput={(e) => onChange((e.target as any).value)}
                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded-lg px-4 py-3 text-offwhite font-poppins text-sm focus:border-teal outline-none transition-all placeholder:text-charcoal-light"
            />
        </div>
    );
}

interface FormTextareaProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
}

function FormTextarea({ label, value, onChange, required = false, placeholder = "", rows = 4 }: FormTextareaProps) {
    return (
        <div class="space-y-1">
            <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">{label}</label>
            <textarea
                value={value}
                required={required}
                placeholder={placeholder}
                rows={rows}
                onInput={(e) => onChange((e.target as any).value)}
                class="w-full bg-charcoal-dark border border-charcoal-light/50 rounded-lg px-4 py-3 text-offwhite font-lora text-sm focus:border-teal outline-none transition-all resize-y placeholder:text-charcoal-light"
            ></textarea>
        </div>
    );
}
