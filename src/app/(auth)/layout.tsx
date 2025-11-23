import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Trip Tracker",
  description: "Login or sign up to start tracking your trips",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Glassmorphism container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-teal-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
