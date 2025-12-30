import React from "react";

export function PageShell({
  title,
  description,
  children,
  headerAction,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          ) : null}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      {children ?? (
        <div className="rounded-xl border border-dashed bg-white p-6 text-sm text-gray-500">
          Coming soon.
        </div>
      )}
    </div>
  );
}
