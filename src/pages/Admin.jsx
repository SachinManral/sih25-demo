import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, PieChart, Pie, Legend
} from "recharts";
import { MapPin, Download } from "lucide-react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const categories = [
  "Roads & Transportation",
  "Water & Sanitation",
  "Waste Management",
  "Streetlights & Public Infrastructure",
  "Environment & Pollution",
  "Safety & Security",
  "Others / Miscellaneous",
];

const COLORS = ["#1D4ED8", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6", "#F97316"];
const statuses = ["Pending", "Resolved"];

export default function AdminPage() {
  const [reports, setReports] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(savedReports);
  }, []);

  const handleStatusChange = (id, status) => {
    const updatedReports = reports.map((r) => (r.id === id ? { ...r, status } : r));
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  const filteredReports = reports.filter((r) => {
    return (
      (filterCategory === "All" || r.category === filterCategory) &&
      (filterStatus === "All" || r.status === filterStatus) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Aggregate Data
  const totalReports = reports.length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const pendingReports = totalReports - resolvedReports;
  const todayReports = reports.filter(
    (r) => new Date(r.submittedAt).toDateString() === new Date().toDateString()
  ).length;

  const reportsByCategory = categories.map((cat, i) => ({
    category: cat,
    count: reports.filter((r) => r.category === cat).length,
    fill: COLORS[i % COLORS.length],
  }));

  const pieData = [
    { name: "Resolved", value: resolvedReports },
    { name: "Pending", value: pendingReports },
  ];

  const trendData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toLocaleDateString();
    return {
      date: formatted,
      count: reports.filter((r) => new Date(r.submittedAt).toLocaleDateString() === formatted).length,
    };
  }).reverse();

  const topLocations = Array.from(
    reports.reduce((acc, r) => {
      acc[r.location] = (acc[r.location] || 0) + 1;
      return acc;
    }, {}),
    ([location, count]) => ({ location, count })
  ).sort((a, b) => b.count - a.count).slice(0, 5);

  const topCategories = reportsByCategory.sort((a, b) => b.count - a.count).slice(0, 5);

  // Export CSV
  const exportCSV = () => {
    const header = ["Title", "Description", "Category", "Location", "Status", "Date", "Image"];
    const rows = filteredReports.map(r => [
      r.title,
      r.description,
      r.category,
      r.location,
      r.status,
      new Date(r.submittedAt).toLocaleString(),
      r.image || "No Image"
    ]);
    let csvContent = "data:text/csv;charset=utf-8," + [header.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "reports.csv");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reports", 14, 20);
    const tableColumn = ["Title", "Description", "Category", "Location", "Status", "Date", "Image"];
    const tableRows = filteredReports.map(r => [
      r.title,
      r.description,
      r.category,
      r.location,
      r.status,
      new Date(r.submittedAt).toLocaleString(),
      r.image ? "Image Attached" : "No Image"
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 }
    });
    doc.save("reports.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <h1 className="text-4xl font-bold text-center text-slate-900 mb-6">Admin Dashboard</h1>

      {/* Export Buttons */}
      <div className="flex justify-end max-w-7xl mx-auto mb-6 gap-3">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto mb-10">
        <SummaryCard title="Total Reports" value={totalReports} color="text-sky-600" />
        <SummaryCard title="Resolved" value={resolvedReports} color="text-green-600" />
        <SummaryCard title="Pending" value={pendingReports} color="text-orange-500" />
        <SummaryCard title="New Today" value={todayReports} color="text-indigo-600" />
        <SummaryCard title="Categories" value={categories.length} color="text-purple-600" />
        <SummaryCard title="Users (Demo)" value={Math.floor(Math.random() * 50 + 10)} color="text-teal-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Reports by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reportsByCategory}>
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {reportsByCategory.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Resolved vs Pending</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Reports Trend (7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366F1" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Locations & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Top Locations</h2>
          <ul className="space-y-2">
            {topLocations.map((loc) => (
              <li key={loc.location} className="flex justify-between bg-slate-50 p-3 rounded-xl shadow-sm">
                <span>{loc.location}</span>
                <span className="font-semibold">{loc.count} reports</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Top Categories</h2>
          <ul className="space-y-2">
            {topCategories.map((cat) => (
              <li key={cat.category} className="flex justify-between bg-slate-50 p-3 rounded-xl shadow-sm">
                <span>{cat.category}</span>
                <span className="font-semibold">{cat.count} reports</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto mb-6">
        <select
          className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          {categories.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
        <select
          className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by title or location"
          className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto max-w-7xl mx-auto mb-12">
        <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-slate-50 transition">
                <td className="px-6 py-4">{r.title}</td>
                <td className="px-6 py-4">{r.description}</td>
                <td className="px-6 py-4">{r.category}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {r.location}
                </td>
                <td className="px-6 py-4">
                  {r.image ? <img src={r.image} alt="report" className="w-20 h-20 object-cover rounded-xl" /> : <span className="text-slate-400">No Image</span>}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    className={`px-2 py-1 rounded-xl border ${
                      r.status === "Resolved" ? "bg-green-100 border-green-400" : "bg-orange-100 border-orange-400"
                    }`}
                  >
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4">{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-slate-500">No reports found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center justify-center hover:scale-105 transition-transform duration-200">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-slate-600 mt-1">{title}</div>
    </div>
  );
}
