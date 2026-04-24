import { useState } from "preact/hooks";

export default function LeadFunnel() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const projectTypes = [
        "Website Dev & Hosting",
        "Mobile App (Android/iOS)",
        "Enterprise Software (ERP)",
        "Windows Application",
        "Custom WebApp"
    ];

    const budgets = ["$1k - $5k", "$5k - $20k", "$20k - $50k", "$50k+"];

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Re-using ideas API for leads
            const res = await fetch("/api/ideas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    project_type: formData.projectType,
                    budget: formData.budget,
                    idea_description: formData.description,
                    idea_title: `Lead: ${formData.projectType} for ${formData.name}`,
                    status: 'new'
                })
            });
            if (res.ok) setSubmitted(true);
        } catch (e) {
            console.error(e);
        }
        setIsSubmitting(false);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                id="cta-start-project"
                class="fixed bottom-8 right-8 z-[100] px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-inter font-bold rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
                <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Start Project
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
        );
    }

    return (
        <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <div 
                class="absolute inset-0 bg-[#0A0F1C]/80 backdrop-blur-xl"
                onClick={() => !isSubmitting && setIsOpen(false)}
            ></div>
            
            <div class="relative w-full max-w-2xl bg-[#111827]/50 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-2xl overflow-hidden">
                {/* Progress Bar */}
                <div class="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                    <div 
                        class="h-full bg-[#10B981] transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>

                {submitted ? (
                    <div class="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div class="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto">
                            <svg class="w-10 h-10 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 class="text-3xl font-inter font-bold text-white">Transmission Received.</h2>
                        <p class="text-muted/80 font-inter text-lg">Our engineers are reviewing your requirements. We will reach out within 24 hours.</p>
                        <button 
                            onClick={() => setIsOpen(false)}
                            class="px-8 py-3 border border-white/10 rounded-xl text-white font-medium hover:bg-white/5 transition-all"
                        >
                            Close Terminal
                        </button>
                    </div>
                ) : (
                    <div class="space-y-8">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="font-mono text-[10px] text-[#10B981] uppercase tracking-[0.3em]">Project Initiation</span>
                                <h2 class="text-2xl font-inter font-bold text-white mt-1">
                                    {step === 1 && "Identity Verification"}
                                    {step === 2 && "Operational Scope"}
                                    {step === 3 && "Resource Allocation"}
                                    {step === 4 && "Final Directive"}
                                </h2>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                class="text-muted hover:text-white transition-colors"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div class="min-h-[240px]">
                            {step === 1 && (
                                <div class="space-y-6 animate-in slide-in-from-right duration-300">
                                    <div class="space-y-2">
                                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onInput={(e) => setFormData({...formData, name: (e.target as any).value})}
                                            placeholder="Arjun Jayesh"
                                            class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#10B981]/50 transition-all"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onInput={(e) => setFormData({...formData, email: (e.target as any).value})}
                                            placeholder="arjun@company.com"
                                            class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#10B981]/50 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-right duration-300">
                                    {projectTypes.map(type => (
                                        <button 
                                            key={type}
                                            onClick={() => { setFormData({...formData, projectType: type}); nextStep(); }}
                                            class={`p-4 rounded-2xl border text-left transition-all ${
                                                formData.projectType === type 
                                                ? 'bg-[#10B981]/10 border-[#10B981] text-white' 
                                                : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
                                            }`}
                                        >
                                            <span class="font-inter text-sm font-medium">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 3 && (
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-right duration-300">
                                    {budgets.map(b => (
                                        <button 
                                            key={b}
                                            onClick={() => { setFormData({...formData, budget: b}); nextStep(); }}
                                            class={`p-6 rounded-2xl border text-center transition-all ${
                                                formData.budget === b 
                                                ? 'bg-[#10B981]/10 border-[#10B981] text-white' 
                                                : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
                                            }`}
                                        >
                                            <span class="font-inter font-bold">{b}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 4 && (
                                <div class="space-y-4 animate-in slide-in-from-right duration-300">
                                    <label class="block font-mono text-[10px] text-muted uppercase tracking-widest">Project Brief</label>
                                    <textarea 
                                        value={formData.description}
                                        onInput={(e) => setFormData({...formData, description: (e.target as any).value})}
                                        placeholder="Outline your technical requirements..."
                                        class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#10B981]/50 transition-all h-40 resize-none"
                                    ></textarea>
                                </div>
                            )}
                        </div>

                        <div class="flex gap-4 pt-6">
                            {step > 1 && (
                                <button 
                                    onClick={prevStep}
                                    class="flex-1 py-4 border border-white/10 rounded-2xl text-muted font-inter font-bold hover:bg-white/5 transition-all"
                                >
                                    Previous
                                </button>
                            )}
                            {step < 4 ? (
                                <button 
                                    onClick={nextStep}
                                    disabled={step === 1 && (!formData.name || !formData.email)}
                                    class="flex-[2] py-4 bg-white text-[#0A0F1C] rounded-2xl font-inter font-bold hover:bg-white/90 transition-all disabled:opacity-30"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.description}
                                    class="flex-[2] py-4 bg-[#10B981] text-white rounded-2xl font-inter font-bold hover:bg-[#059669] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? "Processing..." : "Deploy Requirements"}
                                    {!isSubmitting && <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
