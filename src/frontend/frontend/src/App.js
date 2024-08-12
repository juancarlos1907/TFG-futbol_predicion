import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import './i18n.js';
import PredictionPage from './pages/PredictionPage.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/prediction" element={<PredictionPage />} />
            </Routes>
        </Router>
    );
}

export default App;

