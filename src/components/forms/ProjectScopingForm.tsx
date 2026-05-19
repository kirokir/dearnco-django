import { useState, useRef } from "preact/hooks";

export default function ProjectScopingForm() {
    const [formData, setFormData] = useState({
        name: "",
        teamName: "",
        teamSize: "",
        college: "",
        department: "",
        email: "",
        phone: "",
        projectTitle: "",
        projectDomain: "",
        ideaDescription: "",
        currentStage: "",
        features: "",
        needHelpWith: [] as string[],
        deadline: "",
        budget: "",
        filesUrl: "",
        notes: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const helpOptions = [
        "Architecture", "UI/UX", "Backend", "AI integration", 
        "Sensors / hardware", "Research paper", "PPT", 
        "Documentation", "Deployment"
    ];

    const toggleHelp = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            needHelpWith: prev.needHelpWith.includes(opt) 
                ? prev.needHelpWith.filter(i => i !== opt)
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
            if (json.url) setFormData({ ...formData, filesUrl: json.url });
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
                    form_type: "Project Scoping",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    organization: formData.college,
                    metadata: {
                        Team_Name: formData.teamName,
                        Team_Size: formData.teamSize,
                        Department: formData.department,
                        Project_Title: formData.projectTitle,
                        Project_Domain: formData.projectDomain,
                        Idea_Description: formData.ideaDescription,
                        Current_Stage: formData.currentStage,
                        Features_Required: formData.features,
                        Need_Help_With: formData.needHelpWith,
                        Deadline: formData.deadline,
                        Budget_Range: formData.budget,
                        Uploaded_Files: formData.filesUrl,
                        Notes: formData.notes
                    }
                })
            });

            if (res.ok) {
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
                <h1 class="ks-form-title">Scope Your Project</h1>
                <p class="ks-form-sub">Functional prototypes, healthcare systems, AI applications, IoT platforms, and deployable final-year projects.</p>
            </div>

            <form class="ks-form" onSubmit={handleSubmit}>
                {/* Team Details */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">01. Team Profile</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Primary Contact Name</label>
                            <input type="text" required placeholder="John Doe" value={formData.name} onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Email</label>
                            <input type="email" required placeholder="john@domain.com" value={formData.email} onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Phone Number</label>
                            <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onInput={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Team Name (Optional)</label>
                            <input type="text" placeholder="e.g. Cybernetics" value={formData.teamName} onInput={(e) => setFormData({...formData, teamName: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Team Size</label>
                            <input type="number" min="1" required placeholder="e.g. 4" value={formData.teamSize} onInput={(e) => setFormData({...formData, teamSize: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>College / Institution</label>
                            <input type="text" required placeholder="e.g. MIT" value={formData.college} onInput={(e) => setFormData({...formData, college: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Degree / Department</label>
                            <input type="text" required placeholder="B.Tech Computer Science" value={formData.department} onInput={(e) => setFormData({...formData, department: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Project Specs */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">02. Project Specifications</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Project Title</label>
                            <input type="text" required placeholder="Autonomous Drone Delivery..." value={formData.projectTitle} onInput={(e) => setFormData({...formData, projectTitle: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Project Domain</label>
                            <select required value={formData.projectDomain} onChange={(e) => setFormData({...formData, projectDomain: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select domain...</option>
                                <option value="Healthcare Technology">Healthcare Technology</option>
                                <option value="AI / ML">AI / ML</option>
                                <option value="IoT">IoT</option>
                                <option value="Embedded Systems">Embedded Systems</option>
                                <option value="Android App">Android App</option>
                                <option value="Web Platform">Web Platform</option>
                                <option value="Robotics">Robotics</option>
                                <option value="Automation">Automation</option>
                                <option value="Research System">Research System</option>
                            </select>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Describe Your Idea</label>
                            <textarea required rows={3} placeholder="What problem does this solve and how?" value={formData.ideaDescription} onInput={(e) => setFormData({...formData, ideaDescription: (e.target as HTMLTextAreaElement).value})}></textarea>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Features Required</label>
                            <textarea required rows={2} placeholder="List main functionalities (e.g., Face auth, dashboard, live tracking)" value={formData.features} onInput={(e) => setFormData({...formData, features: (e.target as HTMLTextAreaElement).value})}></textarea>
                        </div>
                    </div>
                </div>

                {/* Scoping & Help */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">03. Execution Scope</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Current Stage</label>
                            <select required value={formData.currentStage} onChange={(e) => setFormData({...formData, currentStage: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select stage...</option>
                                <option value="Only idea">Only idea</option>
                                <option value="Proposal stage">Proposal stage</option>
                                <option value="Hardware purchased">Hardware purchased</option>
                                <option value="Prototype started">Prototype started</option>
                                <option value="Existing incomplete build">Existing incomplete build</option>
                            </select>
                        </div>
                        <div class="ks-form-group">
                            <label>Expected Deadline</label>
                            <input type="date" required value={formData.deadline} onInput={(e) => setFormData({...formData, deadline: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Need Help With (Select multiple)</label>
                            <div class="ks-chip-grid">
                                {helpOptions.map(opt => (
                                    <button type="button" key={opt} onClick={() => toggleHelp(opt)} class={`ks-chip ${formData.needHelpWith.includes(opt) ? 'active' : ''}`}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Budget Range (Overall)</label>
                            <select required value={formData.budget} onChange={(e) => setFormData({...formData, budget: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select budget...</option>
                                <option value="Under ₹10k">Under ₹10k</option>
                                <option value="₹10k - ₹25k">₹10k - ₹25k</option>
                                <option value="₹25k - ₹50k">₹25k - ₹50k</option>
                                <option value="₹50k+">₹50k+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Upload & Notes */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">04. Materials & Notes</h3>
                    <div class="ks-form-group ks-col-span-2">
                        <label>Upload Existing Files (Optional)</label>
                        <div class="ks-file-drop" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" ref={fileInputRef} class="hidden" onChange={handleUpload} accept=".pdf,.zip,.doc,.docx" />
                            {uploading ? (
                                <span class="text-teal animate-pulse">Uploading to secure vault...</span>
                            ) : formData.filesUrl ? (
                                <span class="text-teal">File attached. Click to replace.</span>
                            ) : (
                                <span>Drag & Drop proposal/diagram or <span class="text-teal underline">Browse Files</span></span>
                            )}
                        </div>
                    </div>
                    <div class="ks-form-group ks-col-span-2 mt-4">
                        <label>Additional Notes</label>
                        <textarea rows={2} placeholder="Any specific requirements?" value={formData.notes} onInput={(e) => setFormData({...formData, notes: (e.target as HTMLTextAreaElement).value})}></textarea>
                    </div>
                </div>

                <div class="ks-form-footer">
                    <button type="submit" disabled={submitting || uploading} class="ks-submit-btn">
                        {submitting ? "Processing..." : "Start Project Discussion →"}
                    </button>
                    <p class="ks-secure-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Your intellectual property is protected under Kinbo's NDA automatically.
                    </p>
                </div>
            </form>
        </div>
    );
}
