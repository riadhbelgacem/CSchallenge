import React from 'react';
import AppShell from '@/components/dashboard/AppShell';

export default function JobsIndex() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Job Matches</h1>
        <p className="text-sm text-black/60">This is a placeholder jobs page. Integrate real job matching data here.</p>
      </div>
    </AppShell>
  );
}