import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import ReportProblemPage from './pages/ReportProblemPage';
import HelplinePage from './pages/HelplinePage';
import StatisticsPage from './pages/StatisticsPage';
import SvgTracerPage from './pages/SvgTracerPage';
import UnionDetailPage from './pages/UnionDetailPage';
import FindTutorPage from './pages/FindTutorPage';
import HumanityWallPage from './pages/HumanityWallPage';
import BloodDonationPage from './pages/BloodDonationPage';
import LiteraturePage from './pages/LiteraturePage';
import FamousFoodPage from './pages/FamousFoodPage';
import CulturePage from './pages/CulturePage';
import BookVehiclesPage from './pages/BookVehiclesPage';
import ReligiousPlacesPage from './pages/ReligiousPlacesPage';
import BestOffersPage from './pages/BestOffersPage';
import InstitutionsPage from './pages/InstitutionsPage';
import CollegesPage from './pages/CollegesPage';
import SchoolsPage from './pages/SchoolsPage';
import MadrasasPage from './pages/MadrasasPage';
import UniversitiesPage from './pages/UniversitiesPage';
import LiteratureDetailPage from './pages/LiteratureDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminManagementPage from './pages/AdminManagementPage';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Navigation - Not shown on admin pages */}
        {!window.location.pathname.startsWith('/admin/login') && !window.location.pathname.startsWith('/admin/dashboard') && !window.location.pathname.startsWith('/admin/management') && (
          <Navbar isAdmin={isAdmin} />
        )}

        {/* Main Content */}
        <main className="flex-grow">
          {isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">লোড করা হচ্ছে...</p>
              </div>
            </div>
          ) : (
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/report-problem" element={<ReportProblemPage />} />
              {/* <Route path="/polling-stations" element={<PollingStationsPage />} /> */}
              <Route path="/helpline" element={<HelplinePage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/tracer" element={<SvgTracerPage />} />
              <Route path="/union/:unionId" element={<UnionDetailPage />} />
              <Route path="/find-tutor" element={<FindTutorPage />} />
              <Route path="/humanity-wall" element={<HumanityWallPage />} />
              <Route path="/blood-donation" element={<BloodDonationPage />} />
              <Route path="/literature" element={<LiteraturePage />} />
              <Route path="/literature/:kind/:id" element={<LiteratureDetailPage />} />
              <Route path="/famous-food" element={<FamousFoodPage />} />
              <Route path="/culture" element={<CulturePage />} />
              <Route path="/book-vehicles" element={<BookVehiclesPage />} />
              <Route path="/mosques" element={<ReligiousPlacesPage />} />
              <Route path="/best-offers" element={<BestOffersPage />} />
              <Route path="/institutions" element={<InstitutionsPage />} />
              <Route path="/institutions/colleges" element={<CollegesPage />} />
              <Route path="/institutions/schools" element={<SchoolsPage />} />
              <Route path="/institutions/madrasas" element={<MadrasasPage />} />
              <Route path="/institutions/universities" element={<UniversitiesPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  isAdmin ? (
                    <AdminDashboardPage />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              <Route
                path="/admin/management"
                element={
                  isAdmin ? (
                    <AdminManagementPage />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              <Route path="/admin" element={isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>

        {/* Footer - Not shown on admin pages */}
        {!window.location.pathname.startsWith('/admin/login') && !window.location.pathname.startsWith('/admin/dashboard') && !window.location.pathname.startsWith('/admin/management') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
