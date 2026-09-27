type Node = Record<string, unknown> & { "@context"?: string };

/** Emit one JSON-LD graph per page so nodes can cross-reference by `@id`. */
export function JsonLd({ nodes }: { nodes: Node[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes.map(({ "@context": _context, ...node }) => node),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
