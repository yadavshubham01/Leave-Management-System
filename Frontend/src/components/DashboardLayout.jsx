import Navbar from "./Navbar";

export default function DashboardLayout({ title, children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </>
  );
}
