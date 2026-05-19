import { useState, useRef } from "preact/hooks";

export default function EmployeeApplicationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        roleApplied: "",
        portfolioUrl: "",
        linkedinUrl: "",
        resumeUrl: "",
        notes: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: data });
            const json = await res.json();
            if (json.url) setFormData({ ...formData, resumeUrl: json.url });
        } catch (err) {
            console.error("Upload failed", err);
            alert("File upload failed. Please try again.");
        }
        setUploading(false);
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!formData.resumeUrl) {
            alert("Please upload your resume to apply.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/service-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "Employee Application",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || "Not Provided",
                    organization: "Candidate",
                    metadata: {
                        Role_Applied: formData.roleApplied,
                        Portfolio_URL: formData.portfolioUrl || "Not Provided",
                        LinkedIn_URL: formData.linkedinUrl || "Not Provided",
                        Uploaded_Resume: formData.resumeUrl,
                        Notes: formData.notes || "None"
                    }
                })
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
        setSubmitting(false);
    };

    if (submitted) {
        return (
            <div class="ks-form-container text-center py-16 animate-fadeIn">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 border border-teal/30 text-teal mb-6">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 class="ks-form-title mb-4">Application Received</h1>
                <p class="ks-form-sub max-w-md mx-auto mb-8">
                    Thank you for applying to join our team. We've received your materials and will review them shortly. We'll be in touch if your experience aligns with our requirements.
                </p>
                <a href="/team" class="inline-flex items-center justify-center px-6 py-2.5 bg-teal/10 hover:bg-teal hover:text-charcoal border border-teal/30 text-teal text-xs font-bold uppercase tracking-widest rounded-full transition-all">
                    Back to Team Page
                </a>
            </div>
        );
    }

    return (
        <div class="ks-form-container animate-fadeIn">
            <div class="ks-form-header">
                <h1 class="ks-form-title">Join Our Team</h1>
                <p class="ks-form-sub">We build deterministic, constraint-bound software systems. Submit your profile below to join our mission.</p>
            </div>

            <form class="ks-form" onSubmit={handleSubmit}>
                {/* Profile Details */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">01. Personal Details</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Full Name *</label>
                            <input type="text" required placeholder="Jessica Dobrev" value={formData.name} onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Email Address *</label>
                            <input type="email" required placeholder="jessica@domain.com" value={formData.email} onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Phone Number</label>
                            <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onInput={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Target Role *</label>
                            <input type="text" required placeholder="e.g. Systems Engineer / UI Designer" value={formData.roleApplied} onInput={(e) => setFormData({...formData, roleApplied: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Professional Links */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">02. Profiles & Portfolios</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>LinkedIn Profile URL</label>
                            <input type="url" placeholder="https://linkedin.com/in/username" value={formData.linkedinUrl} onInput={(e) => setFormData({...formData, linkedinUrl: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Portfolio or GitHub URL</label>
                            <input type="url" placeholder="https://github.com/username" value={formData.portfolioUrl} onInput={(e) => setFormData({...formData, portfolioUrl: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Materials & Resume */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">03. Application Materials</h3>
                    <div class="ks-form-group ks-col-span-2">
                        <label>Upload Resume (PDF, docx) *</label>
                        <div class="ks-file-drop" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" ref={fileInputRef} class="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx" />
                            {uploading ? (
                                <span class="text-teal animate-pulse">Uploading resume to secure vault...</span>
                            ) : formData.resumeUrl ? (
                                <span class="text-teal">Resume uploaded. Click to replace file.</span>
                            ) : (
                                <span>Drag & Drop your resume file or <span class="text-teal underline">Browse Files</span></span>
                            )}
                        </div>
                    </div>
                    <div class="ks-form-group ks-col-span-2 mt-4">
                        <label>Cover Note / Comments</label>
                        <textarea rows={4} placeholder="Tell us about a constraint-bound system you built or why you'd be a great fit." value={formData.notes} onInput={(e) => setFormData({...formData, notes: (e.target as HTMLTextAreaElement).value})}></textarea>
                    </div>
                </div>

                <div class="ks-form-footer">
                    <button type="submit" disabled={submitting || uploading} class="ks-submit-btn">
                        {submitting ? "Submitting Application..." : "Submit Application →"}
                    </button>
                    <p class="ks-secure-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Your details are securely stored and reviewed solely by our recruiting team.
                    </p>
                </div>
            </form>
        </div>
    );
}
