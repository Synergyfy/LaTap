'use client';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8 bg-background text-foreground">
      <h1 className="text-5xl font-bold text-primary tracking-tight">EntryConnect</h1>
      <p className="text-xl text-muted-foreground text-center max-w-lg">
        Offline Visitor Data Capture Platform<br />
        <span className="text-sm opacity-75">Next.js + Zustand + TanStack Query + TailwindCSS v4</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="p-6 border border-border rounded-xl bg-card shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3">Primary Theme</h2>
          <div className="h-12 w-full bg-primary rounded-md shadow-sm"></div>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3">Secondary Theme</h2>
          <div className="h-12 w-full bg-secondary rounded-md shadow-sm border border-input"></div>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3">Accent</h2>
          <div className="h-12 w-full bg-accent rounded-md shadow-sm border border-input"></div>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3">Destructive</h2>
          <div className="h-12 w-full bg-destructive rounded-md shadow-sm"></div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition shadow-lg shadow-primary/25">
          Get Started
        </button>
        <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition border border-border">
          Documentation
        </button>
      </div>
    </div>
  )
}
