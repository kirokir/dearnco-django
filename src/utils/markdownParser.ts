export interface ParsedBlog {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    body: string;
    required_image_slots: string[];
    isFulfilled: boolean;
}

export function parseBulkMarkdown(rawText: string): ParsedBlog[] {
    // Standardize newlines
    const text = rawText.replace(/\r\n/g, '\n');
    
    // Split by delimiter '=== NEW BLOG ==='
    const blocks = text.split(/===\s*NEW BLOG\s*===/i).map(b => b.trim()).filter(b => b.length > 0);
    
    const parsedBlogs: ParsedBlog[] = [];

    const fmRegex = /^---\n([\s\S]*?)\n---/;

    for (const block of blocks) {
        const match = block.match(fmRegex);
        let body = block;
        const fm: Record<string, string> = {};

        if (match) {
            body = block.replace(fmRegex, "").trim();
            match[1].split("\n").forEach(line => {
                const parts = line.split(":");
                if (parts.length >= 2) {
                    const key = parts[0].trim().toLowerCase();
                    const val = parts.slice(1).join(":").trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
                    fm[key] = val;
                }
            });
        }

        // Find IMAGE_SLOT_ placeholders. E.g., ![Hero Image](IMAGE_SLOT_HERO) or just IMAGE_SLOT_1
        const imageSlotRegex = /IMAGE_SLOT_[A-Z0-9_]+/gi;
        const slotsMatch = body.match(imageSlotRegex);
        // Normalize to uppercase and remove duplicates
        const requiredSlots = slotsMatch ? Array.from(new Set(slotsMatch.map(s => s.toUpperCase()))) : [];

        // Generate a slug if missing
        let slug = fm.slug || '';
        if (!slug && fm.title) {
            slug = fm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        } else if (!slug) {
            slug = `draft-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }

        parsedBlogs.push({
            slug,
            title: fm.title || "Untitled Draft",
            category: fm.category || "Uncategorized",
            date: fm.date || new Date().toISOString().split('T')[0],
            excerpt: fm.excerpt || "",
            body,
            required_image_slots: requiredSlots,
            isFulfilled: requiredSlots.length === 0
        });
    }

    return parsedBlogs;
}
