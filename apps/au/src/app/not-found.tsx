import { getTemplateHtml } from "@/lib/template";

export default function NotFound() {
  const content = getTemplateHtml("404.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
