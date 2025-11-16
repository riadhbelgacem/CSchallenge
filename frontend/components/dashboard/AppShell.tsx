import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

type AppShellProps = { children: React.ReactNode };

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { data: session } = useSession();
  const [resumeIdInput, setResumeIdInput] = useState('');

  const handleSignOut = () => {
    // Simple sign out; NextAuth will handle redirect if configured
    signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">HA</div>
              <h1 className="text-lg font-semibold">HireAI</h1>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm">
              <Link href="/" className="text-black/70 hover:text-black">Dashboard</Link>
              <Link href="/resume/upload" className="text-black/70 hover:text-black font-medium">Upload</Link>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (resumeIdInput.trim()) {
                    window.location.href = `/resume/${encodeURIComponent(resumeIdInput.trim())}/enhance`;
                  }
                }}
                className="flex items-center gap-1"
              >
                <input
                  value={resumeIdInput}
                  onChange={(e) => setResumeIdInput(e.target.value)}
                  placeholder="Resume ID"
                  className="h-8 w-32 rounded-md border border-gray-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label="Resume ID"
                />
                <button
                  type="submit"
                  className="h-8 px-2 rounded-md bg-primary text-white text-xs hover:bg-primary/90"
                >Go</button>
              </form>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-black/70">{session?.user?.email}</span>
            <button
              onClick={handleSignOut}
              className="h-9 px-3 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
