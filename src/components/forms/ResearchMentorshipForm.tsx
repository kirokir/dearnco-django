import { useState, useRef } from "preact/hooks";

export default function ResearchMentorshipForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        department: "",
        yearOfStudy: "",
        researchDomain: "",
        currentStage: "",
        targetConference: "",
        abstract: "",
        needHelpWith: [] as string[],
        deadline: "",
        paperDraftUrl: "",
        mentorshipType: "",
        additionalNotes: ""
    });
    
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const helpOptions = [
        "Ideation", "Literature review", "Methodology", 
        "Technical writing", "Citations", "Conference selection", 
        "PPT preparation", "Final review"
    ];

    const toggleHelp = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            needHelpWith: prev.needHelpWith.includes(opt)
                ? prev.needHelpWith.filter(o => o !== opt)
                : [...prev.needHelpWith, opt]
        }));
    };

    const handleUpload = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: data });
            const json = await res.json();
            if (json.url) setFormData({ ...formData, paperDraftUrl: json.url });
        } catch (err) {
            console.error("Upload failed", err);
        }
        setUploading(false);
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/service-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "Research Mentorship",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    organization: formData.college,
                    metadata: {
                        Department: formData.department,
                        Year_of_Study: formData.yearOfStudy,
                        Research_Domain: formData.researchDomain,
                        Current_Stage: formData.currentStage,
                        Target_Conference: formData.targetConference,
                        Abstract: formData.abstract,
                        Need_Help_With: formData.needHelpWith,
                        Deadline: formData.deadline,
                        Paper_Draft_URL: formData.paperDraftUrl,
                        Mentorship_Type: formData.mentorshipType,
                        Additional_Notes: formData.additionalNotes
                    }
                })
            });

            if (res.ok) {
                // Redirect to Razorpay or WhatsApp
                window.location.href = "https://razorpay.me/@kinbotechnologies";
            } else {
                alert("Submission failed. Please try again.");
                setSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };

    return (
        <div class="ks-form-container">
            <div class="ks-form-header">
                <h1 class="ks-form-title">From idea to published paper.</h1>
                <p class="ks-form-sub">Award-caliber research methodology, structuring, and conference guidance.</p>
            </div>

            <form class="ks-form" onSubmit={handleSubmit}>
                {/* Personal Info */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">01. Researcher Details</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Full Name</label>
                            <input type="text" required placeholder="Dr. Jane Doe" value={formData.name} onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Email</label>
                            <input type="email" required placeholder="jane@university.edu" value={formData.email} onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Phone Number</label>
                            <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onInput={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">02. Academic Context</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>College / Institution</label>
                            <input type="text" required placeholder="e.g. MIT, IIT" value={formData.college} onInput={(e) => setFormData({...formData, college: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Department</label>
                            <input type="text" required placeholder="Computer Science" value={formData.department} onInput={(e) => setFormData({...formData, department: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Year of Study / Designation</label>
                            <input type="text" required placeholder="Ph.D. 2nd Year" value={formData.yearOfStudy} onInput={(e) => setFormData({...formData, yearOfStudy: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Research Details */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">03. Research Scope</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Research Domain</label>
                            <input type="text" required placeholder="Machine Learning, Healthcare" value={formData.researchDomain} onInput={(e) => setFormData({...formData, researchDomain: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Current Stage</label>
                            <select required value={formData.currentStage} onChange={(e) => setFormData({...formData, currentStage: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select stage...</option>
                                <option value="Just an idea">Just an idea</option>
                                <option value="Literature review started">Literature review started</option>
                                <option value="Methodology drafting">Methodology drafting</option>
                                <option value="Paper writing">Paper writing</option>
                                <option value="Submission ready">Submission ready</option>
                            </select>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Target Conference / Journal (Optional)</label>
                            <input type="text" placeholder="e.g. IEEE CVPR, Nature" value={formData.targetConference} onInput={(e) => setFormData({...formData, targetConference: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Abstract / Research Idea</label>
                            <textarea required rows={4} placeholder="Briefly describe your hypothesis and goals..." value={formData.abstract} onInput={(e) => setFormData({...formData, abstract: (e.target as HTMLTextAreaElement).value})}></textarea>
                        </div>
                    </div>
                </div>

                {/* Assistance Required */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">04. Mentorship Requirements</h3>
                    
                    <div class="ks-form-group ks-col-span-2">
                        <label>Need Help With (Select multiple)</label>
                        <div class="ks-chip-grid">
                            {helpOptions.map(opt => (
                                <button 
                                    type="button" 
                                    key={opt}
                                    onClick={() => toggleHelp(opt)}
                                    class={`ks-chip ${formData.needHelpWith.includes(opt) ? 'active' : ''}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div class="ks-form-grid mt-4">
                        <div class="ks-form-group">
                            <label>Preferred Mentorship Type</label>
                            <select required value={formData.mentorshipType} onChange={(e) => setFormData({...formData, mentorshipType: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select type...</option>
                                <option value="1:1 Mentorship">1:1 Mentorship</option>
                                <option value="Team Mentorship">Team Mentorship</option>
                                <option value="Full Paper Guidance">Full Paper Guidance</option>
                            </select>
                        </div>
                        <div class="ks-form-group">
                            <label>Expected Deadline</label>
                            <input type="date" required value={formData.deadline} onInput={(e) => setFormData({...formData, deadline: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>

                    <div class="ks-form-group ks-col-span-2 mt-4">
                        <label>Upload Paper Draft (Optional)</label>
                        <div class="ks-file-drop" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" ref={fileInputRef} class="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx" />
                            {uploading ? (
                                <span class="text-teal animate-pulse">Uploading to secure vault...</span>
                            ) : formData.paperDraftUrl ? (
                                <span class="text-teal">Document attached. Click to replace.</span>
                            ) : (
                                <span>Drag & Drop draft or <span class="text-teal underline">Browse Files</span></span>
                            )}
                        </div>
                    </div>

                    <div class="ks-form-group ks-col-span-2 mt-4">
                        <label>Additional Notes</label>
                        <textarea rows={2} placeholder="Any specific requirements?" value={formData.additionalNotes} onInput={(e) => setFormData({...formData, additionalNotes: (e.target as HTMLTextAreaElement).value})}></textarea>
                    </div>
                </div>

                <div class="ks-form-footer">
                    <button type="submit" disabled={submitting || uploading} class="ks-submit-btn">
                        {submitting ? "Processing..." : "Request Mentorship →"}
                    </button>
                    <p class="ks-secure-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        End-to-end encrypted submission.
                    </p>
                </div>
            </form>
        </div>
    );
}
