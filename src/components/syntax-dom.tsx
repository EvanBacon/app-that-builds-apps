"use dom";

import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function SyntaxDom({
  language,
  code,
}: {
  language?: string;
  code?: string;
  dom?: import("expo/dom").DOMProps;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [code]); // Scroll whenever code changes

  return (
    <div ref={containerRef} style={{ overflowY: "auto", maxHeight: "100%" }}>
      <SyntaxHighlighter
        language={language || "tsx"}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
