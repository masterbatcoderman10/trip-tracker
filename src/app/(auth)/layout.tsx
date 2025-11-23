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
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-8">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/50 to-teal-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 md:left-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 md:right-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Glassmorphism container */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 via-purple-200/10 to-teal-200/10 rounded-3xl blur-2xl" />
        <div className="relative bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-slate-700/30 shadow-2xl shadow-black/5 p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
