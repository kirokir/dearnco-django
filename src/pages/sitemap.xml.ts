export const prerender = false;

export async function GET({ redirect }: { redirect: any }) {
    return redirect('/sitemap-index.xml', 301);
}
