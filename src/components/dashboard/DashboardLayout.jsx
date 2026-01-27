import TopNav from "./TopNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
