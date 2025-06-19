"use dom";

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
  return (
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
  );
}
