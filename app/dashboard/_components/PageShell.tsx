import React from "react";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : null}
      </div>
      {children ?? (
        <div className="rounded-xl border border-dashed bg-white p-6 text-sm text-gray-500">
          Coming soon.
        </div>
      )}
    </div>
  );
}

