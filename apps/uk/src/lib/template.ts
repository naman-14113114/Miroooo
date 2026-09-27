import fs from "node:fs";
import path from "node:path";

export function getTemplateHtml(templatePath: string): string {
  const fullPath = path.join(process.cwd(), "src/templates", templatePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Template not found: ${fullPath}`);
  }
  const raw = fs.readFileSync(fullPath, "utf-8");

  // Extract all <style> blocks from head or anywhere
  const styleMatches = raw.match(/<style[\s\S]*?<\/style>/gi) || [];
  const styles = styleMatches.join("\n");

  // Extract body content
  let bodyContent = "";
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  } else {
    bodyContent = raw
      .replace(/<!doctype html>/gi, "")
      .replace(/<html[^>]*>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "");
  }

  return `${styles}\n${bodyContent}`;
}
