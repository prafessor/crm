import React from 'react';

export interface DashboardCardProps {
  children: React.ReactNode;
  label: React.ReactNode;
}

export default function DashboardCard({ children, label }: DashboardCardProps) {
  return (
    <div className="rounded bg-gray-100 w-full h-full">
      <p className="text-xl text-gray-900 font-medium p-5">{label}</p>
      <div>{children}</div>
    </div>
  );
}
