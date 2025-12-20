type ReportStatCardProps = {
  value: string;
  label: string;
  description?: string;
  accentClassName?: string;
  valueClassName?: string;
};

export function ReportStatCard({
  value,
  label,
  description,
  accentClassName,
  valueClassName,
}: ReportStatCardProps) {
  const baseClasses =
    "rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

  return (
    <div
      className={`${baseClasses} ${
        accentClassName ?? "border-gray-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p
        className={`mt-3 text-3xl font-bold text-gray-900 ${valueClassName ?? ""}`}
      >
        {value}
      </p>
      {description ? (
        <p className="mt-1 text-xs font-medium text-gray-500">{description}</p>
      ) : null}
    </div>
  );
}
