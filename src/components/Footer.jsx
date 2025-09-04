import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-tr from-slate-900 to-slate-800 text-slate-200 mt-12 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-20 w-64 h-64 bg-sky-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-10 -right-20 w-64 h-64 bg-sky-400 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Branding / About */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-white mb-3">NagarNighrani</h2>
          <p className="text-sm text-slate-300">
            Empowering citizens to report civic issues and track progress for a better city.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-slate-300">
            <li><Link to="/about" className="hover:text-sky-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-sky-400 transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-sky-400 transition">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-sky-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> 123 Main Street, City, Country
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@nagar-nighrani.com
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow & Subscribe</h3>
          <p className="text-sm text-slate-300 mb-2">
            Stay updated on new reports and civic updates.
          </p>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-sky-400 transition transform hover:scale-110"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-sky-400 transition transform hover:scale-110"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-sky-400 transition transform hover:scale-110"><Instagram className="w-6 h-6" /></a>
          </div>
          <form className="flex gap-2 bg-slate-700 p-2 rounded-xl">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-xl flex-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-slate-700 pt-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} NagarNighrani — Demo. All rights reserved.
      </div>
    </footer>
  );
}
