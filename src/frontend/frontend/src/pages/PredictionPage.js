import React from 'react';
import { useLocation } from 'react-router-dom';

const PredictionPage = () => {
    const location = useLocation();
    const { result } = location.state || {}; // Obtenemos el resultado del estado

    if (!result) {
        return <div>No prediction data available.</div>;
    }

    return (
        <div className="prediction-page">
            <h2>Prediction Result</h2>
            <p>{result.home_team_result}</p>
            <p>{result.away_team_result}</p>
            <p><strong>Winner: {result.winner}</strong></p>
        </div>
    );
};

export default PredictionPage;
