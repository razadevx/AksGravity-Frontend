export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg text-purple-700">AKS DigiRec</h1>

      <div className="flex gap-4 text-sm font-medium">
        <a href="/dashboard">Dashboard</a>
        <a href="/master-data">Master Data</a>
        <a href="/workers">Workers</a>
        <a href="/production">Production</a>
        <a href="/cash">Cash Register</a>
      </div>

      <div className="text-sm">
        <span className="font-semibold">RazaDevX</span>
      </div>
    </div>
  );
}
