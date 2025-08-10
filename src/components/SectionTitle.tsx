export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="text-brand-deep mt-2">{subtitle}</p>}
    </div>
  );
}
