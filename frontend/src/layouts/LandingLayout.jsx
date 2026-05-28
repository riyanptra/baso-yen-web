import { Outlet } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import FloatingButtons from "../components/landing/FloatingButtons";

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-yen-white text-yen-dark selection:bg-yen-accent selection:text-yen-white">
      <Navbar />
      <main className="grow">
        {/* Konten Halaman Aktif akan dirender di dalam Outlet */}
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
