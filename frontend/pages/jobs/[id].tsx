import React from 'react';
import { useRouter } from 'next/router';
import AppShell from '@/components/dashboard/AppShell';

export default function JobDetail() {
  const { query } = useRouter();
  const { id } = query;
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Job Detail</h1>
        <p className="text-sm text-black/60">Placeholder page for job id: {id as string}</p>
      </div>
    </AppShell>
  );
}import React from 'react';
import { useRouter } from 'next/router';
import AppShell from '@/components/dashboard/AppShell';

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Job Detail</h1>
        <p className="text-sm text-black/60">Placeholder for job <span className="font-mono">{id}</span>. Replace with real job data.</p>
        <button
          onClick={() => router.push('/jobs')}
          className="h-9 px-4 rounded-md bg-primary text-white text-sm"
        >Back to Jobs</button>
      </div>
    </AppShell>
  );
}