export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
