import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ESGProvider } from './context/ESGContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { CountriesList } from './pages/CountriesList';
import { CompaniesList } from './pages/CompaniesList';
import { CompanyProfile } from './pages/CompanyProfile';

function App() {
  return (
    <ESGProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/countries" element={<CountriesList />} />
              <Route path="/companies" element={<CompaniesList />} />
              <Route path="/company/:id" element={<CompanyProfile />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ESGProvider>
  );
}

export default App;