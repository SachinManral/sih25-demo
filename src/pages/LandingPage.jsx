import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilePlus, MapPin, CheckCircle, Users, ChartBar } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LandingPage() {
  const mockReports = [
    { id: 1, position: [28.6139, 77.209], title: "Pothole on Main Street" },
    { id: 2, position: [28.620, 77.210], title: "Street light broken" },
    { id: 3, position: [28.615, 77.215], title: "Waterlogging" },
  ];

  const [stats, setStats] = useState({ reports: 0, resolved: 0, time: 0, departments: 0 });
  useEffect(() => {
    const target = { reports: 284, resolved: 76, time: 2.8, departments: 15 };
    const interval = setInterval(() => {
      setStats((prev) => {
        const newStats = { ...prev };
        let done = true;
        for (let key in target) {
          if (prev[key] < target[key]) {
            done = false;
            newStats[key] = Math.min(prev[key] + target[key] / 50, target[key]);
          }
        }
        if (done) clearInterval(interval);
        return newStats;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Ravi Sharma",
      text: "I reported a pothole and it was fixed within 3 days. Amazing app!",
      date: "Aug 20, 2025",
      avatar: "https://i.pravatar.cc/50?img=10",
    },
    {
      name: "Anita Desai",
      text: "Easy to track issues and see city improvements. Love it!",
      date: "Sep 1, 2025",
      avatar: "https://i.pravatar.cc/50?img=12",
    },
    {
      name: "Manish Kumar",
      text: "Makes reporting civic issues so simple for everyone.",
      date: "Jul 15, 2025",
      avatar: "https://i.pravatar.cc/50?img=14",
    },
    {
      name: "Priya Singh",
      text: "The dashboard is so intuitive and responsive. Highly recommended!",
      date: "Sep 3, 2025",
      avatar: "https://i.pravatar.cc/50?img=16",
    },
    // {
    //   name: "Arjun Mehta",
    //   text: "I can finally see which issues are being resolved in my neighborhood.",
    //   date: "Aug 28, 2025",
    //   avatar: "https://i.pravatar.cc/50?img=18",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
      {/* Hero Floating Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-200 rounded-full opacity-30 filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-green-200 rounded-full opacity-20 filter blur-2xl animate-pulse"></div>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            NagarNigrani
            <span className="block w-20 h-1 bg-sky-500 mt-2 rounded-full animate-pulse"></span>
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-xl">
            Empowering communities to report civic issues, track progress, and help governments respond faster.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/report"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold shadow-lg transform transition hover:scale-105 hover:from-sky-600 hover:to-sky-800"
            >
              Report Issue
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-white border border-sky-600 text-sky-600 font-semibold shadow hover:scale-105 hover:bg-sky-50 transition"
            >
              Sign in
            </Link>
          </div>

          {/* Animated Stats */}
          <div className="mt-12 grid grid-cols-4 gap-4 max-w-xl">
            <div className="bg-white p-5 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition">
              <div className="text-3xl font-bold text-sky-700">{Math.floor(stats.reports)}</div>
              <div className="text-sm text-slate-600 mt-1">Reports</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition">
              <div className="text-3xl font-bold text-green-600">{Math.floor(stats.resolved)}%</div>
              <div className="text-sm text-slate-600 mt-1">Resolved</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition">
              <div className="text-3xl font-bold text-orange-500">{stats.time.toFixed(1)}d</div>
              <div className="text-sm text-slate-600 mt-1">Avg. Time</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg text-center transform hover:-translate-y-1 transition">
              <div className="text-3xl font-bold text-sky-600">{Math.floor(stats.departments)}</div>
              <div className="text-sm text-slate-600 mt-1">Departments</div>
            </div>
          </div>
        </div>

        {/* Right side Mini Map */}
        <div className="bg-white rounded-3xl shadow-2xl border p-2 h-96 overflow-hidden relative">
          <MapContainer center={[28.6139, 77.209]} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-3xl">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {mockReports.map((report) => (
              <Marker key={report.id} position={report.position}>
                <Popup>{report.title}</Popup>
              </Marker>
            ))}
          </MapContainer>
          <span className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">City Issues Map</span>
        </div>
      </main>

      {/* How it Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900">How it works</h2>
        <p className="mt-2 text-center text-slate-600 max-w-2xl mx-auto">
          A simple 3-step process so anyone can report problems and track progress.
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {[{ icon: FilePlus, title: "Report", desc: "Create a report with photo, location, and description." },
            { icon: MapPin, title: "Track", desc: "Monitor status updates on the dashboard & map." },
            { icon: CheckCircle, title: "Resolve", desc: "Authorities resolve the issue and close it." }].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transform hover:-translate-y-1 transition hover:shadow-2xl">
              <div className="bg-sky-100 p-3 rounded-full mb-3"><item.icon className="w-6 h-6 text-sky-600" /></div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-2 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[{ icon: Users, title: "Citizen-friendly", desc: "Simple forms with photo upload and location detection." },
          { icon: MapPin, title: "Map-first View", desc: "Visualize issues across the city with markers & details." },
          { icon: ChartBar, title: "Insights", desc: "Analytics to track resolution rates and response times." }].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center transform hover:-translate-y-2 transition hover:shadow-2xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-sky-100">
            <div className="bg-sky-100 p-3 rounded-full mb-3 shadow"><item.icon className="w-6 h-6 text-sky-600" /></div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-600 mt-2 text-center">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16 bg-sky-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">What Citizens Say</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-shrink-0 bg-white p-6 rounded-2xl shadow-lg w-80 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.date}</p>
                </div>
              </div>
              <p className="text-slate-700 text-sm">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-14 text-center rounded-3xl mx-6 md:mx-12 mt-12 shadow-xl">
        <h3 className="text-2xl md:text-3xl font-bold">Join the community now!</h3>
        <p className="mt-2 text-lg">Start reporting issues and make your city better.</p>
        <Link to="/register" className="mt-6 inline-block px-8 py-3 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition animate-pulse">
          Get Started
        </Link>
      </section>
    </div>
  );
}
