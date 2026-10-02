import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Reusable JsonLd component for Next.js App Router / React 19.
 * Safely serializes structured data and escapes '<' characters
 * to prevent HTML injection and script-escaping vulnerabilities.
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
