import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TypographyProvider } from './context/TypographyContext';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { LookbookPage } from './pages/LookbookPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <HelmetProvider>
      <TypographyProvider>
        <BrowserRouter>
          <SmoothScroll>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-ivory text-black selection:bg-orange selection:text-white">
              <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lookbook" element={<LookbookPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </TypographyProvider>
  </HelmetProvider>
  );
}

export default App;
