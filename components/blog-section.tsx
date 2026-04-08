import { getArticles } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default async function BlogSection() {
  const articles = await getArticles(2);

  if (!articles.length) return null;

  return (
    <section className="w-full py-14" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="px-6 md:px-12">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span
              className="mb-2 block text-xs uppercase tracking-[0.3em]"
              style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              From Our Kitchen
            </span>
            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
            >
              Stories & Insights
            </h2>
          </div>
          <Link
            href="/blogs"
            className="hidden text-xs uppercase tracking-widest underline-offset-4 hover:underline md:block"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            All Articles →
          </Link>
        </div>

        {/* Two-column blog cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.handle}
              href={`/blogs/${article.blog.handle}/${article.handle}`}
              className="group flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
              style={{ borderColor: "#CC996620", backgroundColor: "#FFFFFF" }}
            >
              {/* Article image */}
              {article.image?.url ? (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={article.image.url}
                    alt={article.image.altText || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div
                  className="flex h-52 items-center justify-center text-5xl"
                  style={{ backgroundColor: "#F5F0E8" }}
                >
                  🌿
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Meta */}
                <div
                  className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-widest"
                  style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
                >
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.authorV2?.name && (
                    <>
                      <span style={{ color: "#CC996640" }}>·</span>
                      <span>{article.authorV2.name}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-lg leading-snug transition-colors group-hover:text-[#CC9966]"
                  style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.excerpt && (
                  <p
                    className="line-clamp-3 flex-1 text-sm leading-relaxed"
                    style={{ color: "#666666", fontFamily: "var(--font-nobel)" }}
                  >
                    {article.excerpt}
                  </p>
                )}

                {/* Read more */}
                <div
                  className="mt-4 text-xs font-medium uppercase tracking-widest transition-colors group-hover:text-[#CC9966]"
                  style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
                >
                  Read Article →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile all articles link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blogs"
            className="text-xs uppercase tracking-widest underline-offset-4 hover:underline"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
