import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CheckCircle, Clock, MapPin, Archive } from "lucide-react";

// Gradient colors for charts
const COLORS = ["#00C49F", "#FF8042", "#1D4ED8", "#6366F1", "#FACC15", "#EC4899", "#10B981"];

export default function AnalyticsDashboard() {
  const categories = [
    "Roads & Transportation", "Water & Sanitation", "Waste Management",
    "Streetlights & Public Infrastructure", "Environment & Pollution",
    "Safety & Security", "Others / Miscellaneous"
  ];

  // Generate sample reports
  const sampleReports = Array.from({ length: 120 }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = Math.random() > 0.4 ? "Resolved" : "Pending";
    const lat = 20 + Math.random() * 10;
    const lng = 70 + Math.random() * 10;
    const daysAgo = Math.floor(Math.random() * 20);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return { id: i + 1, category, status, lat, lng, date: date.toISOString() };
  });

  // Aggregate data
  const totalReports = sampleReports.length;
  const resolvedReports = sampleReports.filter(r => r.status === "Resolved").length;
  const pendingReports = totalReports - resolvedReports;

  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
  const todayReports = sampleReports.filter(r => new Date(r.date).toLocaleDateString() === today).length;
  const yesterdayReports = sampleReports.filter(r => new Date(r.date).toLocaleDateString() === yesterday).length;
  const trend = todayReports - yesterdayReports;

  const reportsByCategory = categories.map((cat, i) => ({
    category: cat,
    count: sampleReports.filter(r => r.category === cat).length,
    fill: COLORS[i % COLORS.length]
  }));

  const pieData = [
    { name: "Resolved", value: resolvedReports },
    { name: "Pending", value: pendingReports }
  ];

  const reportsByDate = sampleReports.reduce((acc, report) => {
    const date = new Date(report.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const trendData = Object.entries(reportsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-slate-900 mb-12">NagarNigrani Analytics Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        <EnhancedStatCard title="Total Reports" value={totalReports} icon={<Archive className="w-6 h-6" />} color="from-sky-500 to-teal-400" />
        <EnhancedStatCard title="Resolved" value={resolvedReports} icon={<CheckCircle className="w-6 h-6" />} color="from-green-400 to-green-600" />
        <EnhancedStatCard title="Pending" value={pendingReports} icon={<Clock className="w-6 h-6" />} color="from-orange-400 to-orange-600" />
        <EnhancedStatCard title="Today's Reports" value={todayReports} icon={<MapPin className="w-6 h-6" />} color="from-indigo-400 to-indigo-600" trend={trend} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto mb-12">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Reports by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportsByCategory}>
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
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

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Resolved vs Pending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-7xl mx-auto mb-12 hover:shadow-2xl transition">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Reports Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366F1" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Map */}
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-7xl mx-auto hover:shadow-2xl transition">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Reported Locations</h2>
        <MapContainer center={[24.5, 78]} zoom={5} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sampleReports.map((report, index) => (
            <Marker key={index} position={[report.lat, report.lng]}>
              <Popup>
                <strong>{report.category}</strong><br />
                Status: {report.status}<br />
                Reported: {new Date(report.date).toLocaleDateString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

// Enhanced Stat Card Component
function EnhancedStatCard({ title, value, icon, color, trend }) {
  return (
    <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center transform hover:scale-105 transition`}>
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-3xl font-bold">{value}</span></div>
      <div className="text-sm font-semibold">{title}</div>
      {trend !== undefined && (
        <div className={`mt-2 text-sm font-semibold ${trend >= 0 ? "text-green-200" : "text-red-200"}`}>
          {trend >= 0 ? `▲ ${trend} from yesterday` : `▼ ${-trend} from yesterday`}
        </div>
      )}
    </div>
  );
}
