import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import StPaul from './pages/About/StPaul';
import History from './pages/About/History';
import NewsPage from './pages/About/News';
import Album from './pages/About/Album';
import Education from './pages/Services/Education';
import Seniors from './pages/Services/Seniors';
import Women from './pages/Services/Women';
import Mass from './pages/Mass/Mass';
import Schedule from './pages/Mass/Schedule';
import Library from './pages/Library/Library';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Navigation />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/stpaul" element={<StPaul />} />
            <Route path="/about/history" element={<History />} />
            <Route path="/about/news" element={<NewsPage />} />
            <Route path="/about/album" element={<Album />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/education" element={<Education />} />
            <Route path="/services/seniors" element={<Seniors />} />
            <Route path="/services/women" element={<Women />} />
            <Route path="/mass" element={<Mass />} />
            <Route path="/mass/schedule" element={<Schedule />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
