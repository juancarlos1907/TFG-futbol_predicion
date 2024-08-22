import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PredictionChart = ({ data }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    // Función para destruir el gráfico si existe
    const destroyChart = () => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };

    useEffect(() => {
        // Destruir el gráfico anterior antes de crear uno nuevo
        destroyChart();

        // Crear una nueva instancia de Chart.js
        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Limpiar el gráfico cuando el componente se desmonta
        return () => {
            destroyChart();
        };
    }, [data]); // Se ejecuta cuando 'data' cambia

    return <canvas ref={canvasRef} />;
};

export default PredictionChart;
