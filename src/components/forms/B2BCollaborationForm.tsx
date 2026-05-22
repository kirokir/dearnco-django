import { useState } from "preact/hooks";

export default function B2BCollaborationForm() {
    const [formData, setFormData] = useState({
        organization: "",
        name: "",
        email: "",
        phone: "",
        collaborationType: "",
        projectDetails: "",
        timeline: "",
        budget: "",
        additionalNotes: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const collaborationOptions = [
        "Product Engineering",
        "Healthcare Technology",
        "AI / ML Integration",
        "IoT & Hardware Systems",
        "Research Partnership",
        "Joint Venture / Incubation",
        "Other Enterprise Service"
    ];

    const timelineOptions = [
        "Immediate (Within 1 Month)",
        "Short-term (1-3 Months)",
        "Medium-term (3-6 Months)",
        "Long-term (6+ Months)",
        "Flexible / Ongoing"
    ];

    const budgetOptions = [
        "Under ₹5 Lakhs",
        "₹5 Lakhs - ₹15 Lakhs",
        "₹15 Lakhs - ₹50 Lakhs",
        "₹50 Lakhs+",
        "To be discussed / Flexible"
    ];

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/service-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "B2B Collaboration",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || null,
                    organization: formData.organization,
                    metadata: {
                        Collaboration_Type: formData.collaborationType,
                        Project_Details: formData.projectDetails,
                        Expected_Timeline: formData.timeline,
                        Estimated_Budget: formData.budget,
                        Additional_Notes: formData.additionalNotes
                    }
                })
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert("Submission failed. Please check details and try again.");
                setSubmitting(false);
            }
        } catch (err) {
            console.error("B2B submission failed:", err);
            alert("An error occurred. Please try again later.");
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div class="ks-form-container text-center py-16 animate-fadeIn">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 border border-teal/30 mb-6 text-teal text-3xl">
                    ✓
                </div>
                <h2 class="font-syne font-bold text-2xl text-offwhite mb-4">Request Submitted Successfully</h2>
                <p class="text-muted font-mono text-xs leading-relaxed max-w-sm mx-auto mb-8 uppercase tracking-widest">
                    Thank you for reaching out to Kinbo Technologies. Our partnerships team will review your proposal and respond within 24 business hours.
                </p>
                <a href="/" class="ks-submit-btn inline-block text-center font-bold tracking-wider no-underline bg-offwhite text-charcoal py-4 px-8 rounded-xl hover:shadow-2xl transition-all">
                    Return to Homepage
                </a>
            </div>
        );
    }

    return (
        <div class="ks-form-container">
            <div class="ks-form-header">
                <h1 class="ks-form-title text-offwhite font-syne font-extrabold uppercase tracking-tight">Collaborate With Us</h1>
                <p class="ks-form-sub text-muted">Accelerate your product cycles, embed custom AI agents, or construct robust healthcare systems with our engineering experts.</p>
            </div>

            <form class="ks-form" onSubmit={handleSubmit}>
                {/* Company & Contact Profile */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">01. Company Profile</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Company / Organization Name</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="e.g. Kinbo Tech" 
                                value={formData.organization} 
                                onInput={(e) => setFormData({...formData, organization: (e.target as HTMLInputElement).value})} 
                            />
                        </div>
                        <div class="ks-form-group">
                            <label>Primary Contact Name</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="e.g. Jane Doe" 
                                value={formData.name} 
                                onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})} 
                            />
                        </div>
                        <div class="ks-form-group">
                            <label>Business Email</label>
                            <input 
                                type="email" 
                                required 
                                placeholder="e.g. partner@company.com" 
                                value={formData.email} 
                                onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})} 
                            />
                        </div>
                        <div class="ks-form-group">
                            <label>Phone Number (Optional)</label>
                            <input 
                                type="tel" 
                                placeholder="e.g. +91 98765 43210" 
                                value={formData.phone} 
                                onInput={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})} 
                            />
                        </div>
                    </div>
                </div>

                {/* Collaboration Scope */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">02. Partnership Details</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group ks-col-span-2">
                            <label>Type of Collaboration</label>
                            <select 
                                required 
                                value={formData.collaborationType} 
                                onChange={(e) => setFormData({...formData, collaborationType: (e.target as HTMLSelectElement).value})}
                            >
                                <option value="" disabled>Select engagement model...</option>
                                {collaborationOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div class="ks-form-group ks-col-span-2">
                            <label>Proposal / Request in Detail</label>
                            <textarea 
                                required 
                                rows={4} 
                                placeholder="Describe the project scope, technical challenges, or collaboration objectives in detail..." 
                                value={formData.projectDetails} 
                                onInput={(e) => setFormData({...formData, projectDetails: (e.target as HTMLTextAreaElement).value})}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Scope & Logistics */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">03. Project Scope</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Expected Timeline</label>
                            <select 
                                required 
                                value={formData.timeline} 
                                onChange={(e) => setFormData({...formData, timeline: (e.target as HTMLSelectElement).value})}
                            >
                                <option value="" disabled>Select timeline...</option>
                                {timelineOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div class="ks-form-group">
                            <label>Estimated Budget / Scale</label>
                            <select 
                                required 
                                value={formData.budget} 
                                onChange={(e) => setFormData({...formData, budget: (e.target as HTMLSelectElement).value})}
                            >
                                <option value="" disabled>Select estimated budget...</option>
                                {budgetOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div class="ks-form-group ks-col-span-2 mt-2">
                            <label>Additional Notes or Special Requests</label>
                            <textarea 
                                rows={2} 
                                placeholder="Any specific IP arrangements, NDAs, or regional constraints?" 
                                value={formData.additionalNotes} 
                                onInput={(e) => setFormData({...formData, additionalNotes: (e.target as HTMLTextAreaElement).value})}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div class="ks-form-footer">
                    <button type="submit" disabled={submitting} class="ks-submit-btn">
                        {submitting ? "Submitting Proposal..." : "Submit B2B Proposal →"}
                    </button>
                    <p class="ks-secure-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        All commercial proposals are treated with strict confidentiality.
                    </p>
                </div>
            </form>
        </div>
    );
}
