type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // Serialised from our own static data objects, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
