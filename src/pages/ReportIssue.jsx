import React, { useState } from "react";
import { MapPin, FileText, Trash2 } from "lucide-react";
import reportImg from "../assets/reportissue.jpeg";

const categories = [
  "Roads & Transportation",
  "Water & Sanitation",
  "Waste Management",
  "Streetlights & Public Infrastructure",
  "Environment & Pollution",
  "Safety & Security",
  "Others / Miscellaneous",
];

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dateTime, setDateTime] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => setImage(null);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      // Reverse geocode using OpenStreetMap
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      setLocation(data.display_name || `${latitude}, ${longitude}`);
    }, () => alert("Unable to retrieve your location"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !location) {
      return alert("Please fill all required fields");
    }

    setSubmitting(true);

    const now = new Date();
    const newReport = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      image,
      status: "Pending",
      submittedAt: now.toLocaleString(), // date & time of submission
    };
    setDateTime(now.toLocaleString());

    // Store locally (or send to backend in future)
    const existingReports = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([...existingReports, newReport]));

    setTimeout(() => {
      setSubmitting(false);
      setTitle("");
      setDescription("");
      setCategory(categories[0]);
      setLocation("");
      setImage(null);
      alert(`Report submitted successfully at ${now.toLocaleString()}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-50 py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-12">
        Report a Civic Issue
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" /> Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title of the issue"
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" /> Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                rows={4}
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category <span className="text-red-500">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" /> Location <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location or use current"
                  className="flex-1 border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="px-4 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition"
                >
                  Get My Location
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" /> Upload Image
              </label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
              {image && (
                <div className="mt-3 relative w-48 h-48">
                  <img src={image} alt="Preview" className="w-48 h-48 object-cover rounded-xl border" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-2xl font-semibold text-white transition transform hover:scale-105 ${
                submitting ? "bg-slate-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>

          {/* Display submission time */}
          {dateTime && (
            <p className="mt-4 text-sm text-green-700 font-medium">
              Report submitted at: {dateTime}
            </p>
          )}
        </div>

        {/* Right - Image / Info */}
        <div className="relative">
          <img
            src={reportImg}
            alt="Report Issue"
            className="rounded-3xl shadow-2xl object-cover w-full h-full max-h-[600px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold text-center px-4">
              Make your city better by reporting issues
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
