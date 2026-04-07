import { redirect } from "next/navigation";

// Permanently redirect old /product/:handle URLs to /:handle
// This preserves SEO by sending 301 redirects to the new canonical URL
export default async function ProductRedirect(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  redirect(`/${params.handle}`);
}
