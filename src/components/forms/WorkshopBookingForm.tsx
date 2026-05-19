import { useState } from "preact/hooks";

export default function WorkshopBookingForm() {
    const [formData, setFormData] = useState({
        name: "",
        institution: "",
        position: "",
        email: "",
        phone: "",
        city: "",
        studentCount: "",
        format: "",
        duration: "",
        modules: [] as string[],
        budget: "",
        preferredDates: "",
        infrastructure: [] as string[],
        specialRequirements: "",
        whatsappGroup: ""
    });

    const [submitting, setSubmitting] = useState(false);

    const availableModules = [
        "AI Engineering Fundamentals", "RAG & Modern AI Systems", 
        "Research Methodology", "Paper Writing & Publication", 
        "Startup Ecosystem & Funding", "Hackathon Strategy", 
        "LinkedIn & Technical Branding", "Prototype Building"
    ];

    const availableInfra = [
        "Projector", "WiFi", "Computer Lab", "Auditorium", "Sound System"
    ];

    const toggleArray = (key: 'modules' | 'infrastructure', val: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].includes(val) 
                ? prev[key].filter(i => i !== val)
                : [...prev[key], val]
        }));
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/service-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "Workshop Booking",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    organization: formData.institution,
                    metadata: {
                        Position: formData.position,
                        City: formData.city,
                        Expected_Student_Count: formData.studentCount,
                        Format: formData.format,
                        Duration: formData.duration,
                        Modules_Selected: formData.modules,
                        Budget_Range: formData.budget,
                        Preferred_Dates: formData.preferredDates,
                        Infrastructure: formData.infrastructure,
                        Special_Requirements: formData.specialRequirements,
                        WhatsApp_Group: formData.whatsappGroup
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
                <h1 class="ks-form-title">Book a Workshop</h1>
                <p class="ks-form-sub">Applied AI, research, startup, and technical execution workshops for institutions and student communities.</p>
            </div>

            <form class="ks-form" onSubmit={handleSubmit}>
                {/* Organizer Details */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">01. Organizer Info</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Organizer Name</label>
                            <input type="text" required placeholder="Prof. Jane Doe / John Smith" value={formData.name} onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Institution / College</label>
                            <input type="text" required placeholder="e.g. MIT, Stanford" value={formData.institution} onInput={(e) => setFormData({...formData, institution: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Position / Role</label>
                            <input type="text" required placeholder="HOD / Tech Club Lead" value={formData.position} onInput={(e) => setFormData({...formData, position: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Email</label>
                            <input type="email" required placeholder="jane@university.edu" value={formData.email} onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Phone Number</label>
                            <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onInput={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>City</label>
                            <input type="text" required placeholder="Bangalore, NY" value={formData.city} onInput={(e) => setFormData({...formData, city: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Logistics */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">02. Workshop Logistics</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group">
                            <label>Expected Student Count</label>
                            <input type="number" required min="10" placeholder="e.g. 150" value={formData.studentCount} onInput={(e) => setFormData({...formData, studentCount: (e.target as HTMLInputElement).value})} />
                        </div>
                        <div class="ks-form-group">
                            <label>Format</label>
                            <select required value={formData.format} onChange={(e) => setFormData({...formData, format: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select format...</option>
                                <option value="Offline">Offline (In-Campus)</option>
                                <option value="Online">Online</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div class="ks-form-group">
                            <label>Duration</label>
                            <select required value={formData.duration} onChange={(e) => setFormData({...formData, duration: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select duration...</option>
                                <option value="2 Hours">2 Hours</option>
                                <option value="Half Day">Half Day</option>
                                <option value="1 Day">1 Day</option>
                                <option value="2 Day Bootcamp">2 Day Bootcamp</option>
                            </select>
                        </div>
                        <div class="ks-form-group">
                            <label>Budget Range (Per Student)</label>
                            <select required value={formData.budget} onChange={(e) => setFormData({...formData, budget: (e.target as HTMLSelectElement).value})}>
                                <option value="" disabled>Select budget...</option>
                                <option value="₹150/student">₹150/student</option>
                                <option value="₹199/student">₹199/student</option>
                                <option value="₹299/student">₹299/student</option>
                                <option value="₹499/student">₹499/student</option>
                            </select>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>Preferred Dates</label>
                            <input type="text" required placeholder="e.g. Mid-October, Nov 12-14" value={formData.preferredDates} onInput={(e) => setFormData({...formData, preferredDates: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                {/* Modules & Infra */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">03. Curriculum & Infra</h3>
                    <div class="ks-form-group ks-col-span-2">
                        <label>Select Workshop Modules</label>
                        <div class="ks-chip-grid">
                            {availableModules.map(mod => (
                                <button type="button" key={mod} onClick={() => toggleArray('modules', mod)} class={`ks-chip ${formData.modules.includes(mod) ? 'active' : ''}`}>
                                    {mod}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class="ks-form-group ks-col-span-2 mt-4">
                        <label>Infrastructure Available (Check all that apply)</label>
                        <div class="ks-chip-grid">
                            {availableInfra.map(infra => (
                                <button type="button" key={infra} onClick={() => toggleArray('infrastructure', infra)} class={`ks-chip ${formData.infrastructure.includes(infra) ? 'active' : ''}`}>
                                    {infra}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional */}
                <div class="ks-form-section">
                    <h3 class="ks-form-section-title">04. Extra Details</h3>
                    <div class="ks-form-grid">
                        <div class="ks-form-group ks-col-span-2">
                            <label>Special Requirements</label>
                            <textarea rows={2} placeholder="Any specific focus areas or requirements?" value={formData.specialRequirements} onInput={(e) => setFormData({...formData, specialRequirements: (e.target as HTMLTextAreaElement).value})}></textarea>
                        </div>
                        <div class="ks-form-group ks-col-span-2">
                            <label>WhatsApp Group Link (Optional)</label>
                            <input type="url" placeholder="https://chat.whatsapp.com/..." value={formData.whatsappGroup} onInput={(e) => setFormData({...formData, whatsappGroup: (e.target as HTMLInputElement).value})} />
                        </div>
                    </div>
                </div>

                <div class="ks-form-footer">
                    <button type="submit" disabled={submitting} class="ks-submit-btn">
                        {submitting ? "Processing..." : "Book Workshop →"}
                    </button>
                    <p class="ks-secure-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Your booking request is securely processed.
                    </p>
                </div>
            </form>
        </div>
    );
}
