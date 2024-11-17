import React from 'react';
import { Bar } from 'react-chartjs-2';

const DistribucionGrafica = ({ datos }: { datos: number[] }) => {
    const etiquetas = datos.map((_, index) => `Columna ${index + 1}`);
    const datosGrafica = {
        labels: etiquetas,
        datasets: [
            {
                label: 'Bolas acumuladas',
                data: datos,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const opciones = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className="mt-6">
            <Bar data={datosGrafica} options={opciones}></Bar>
        </div>
    );
};

export default DistribucionGrafica;
