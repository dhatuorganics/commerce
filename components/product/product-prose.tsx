/**
 * ProductProse
 * Renders Shopify product descriptionHtml with Dhatu brand styling.
 * Cleans up common Shopify HTML artifacts before rendering.
 */

function cleanHtml(raw: string): string {
  return (
    raw
      // Remove empty paragraphs and spans that Shopify inserts
      .replace(/<p[^>]*>\s*(&nbsp;|\u00a0)?\s*<\/p>/gi, "")
      .replace(/<span[^>]*>\s*<\/span>/gi, "")
      // Remove zero-width / non-breaking spaces that appear as text
      .replace(/&amp;nbsp;/gi, " ")
      .replace(/\u00a0/g, " ")
      // Normalise multiple consecutive <br> to a single line break
      .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>")
      .trim()
  );
}

export default function ProductProse({ html }: { html: string }) {
  const cleaned = cleanHtml(html);

  return (
    <div
      className="product-prose"
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  );
}
