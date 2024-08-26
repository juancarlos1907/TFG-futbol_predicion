import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import './i18n.js';
import PredictionPage from './pages/PredictionPage.js';
import CustomWeightsPage from './pages/CustomWeightsPage.js';
import Welcome from './pages/Welcome.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/prediction" element={<HomePage />} />
                <Route path="/custom-prediction" element={<CustomWeightsPage />} />
                <Route path="/results" element={<PredictionPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;

