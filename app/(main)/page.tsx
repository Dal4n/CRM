/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        // Función para obtener datos desde la API
        const fetchSalesData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/venta/ventas-por-dia-semana");
                const data = await response.json();

                // Procesar los datos para el gráfico
                const labels = data.map(([day]) => day);
                const values = data.map(([_, value]) => value);

                // Configuración del gráfico
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Ventas por día de la semana",
                            data: values,
                            backgroundColor: [
                                "#42A5F5",
                                "#66BB6A",
                                "#FFA726",
                                "#AB47BC",
                                "#FF7043",
                                "#26C6DA",
                                "#7E57C2",
                            ],
                        },
                    ],
                });

                setChartOptions({
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                });
            } catch (error) {
                console.error("Error al obtener los datos de ventas:", error);
            }
        };

        fetchSalesData();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard de Ventas</h2>
            <div className="grid">
                <div className="col-12 md:col-6 lg:col-4">
                    <Card title="Ventas por día de la semana">
                        <div style={{ height: "300px" }}>
                            {chartData && chartOptions ? (
                                <Chart type="bar" data={chartData} options={chartOptions} />
                            ) : (
                                <p>Cargando datos...</p>
                            )}
                        </div>
                    </Card>
                </div>
                {/* Puedes añadir más tarjetas aquí con diferentes gráficos según tus necesidades */}
            </div>
        </div>
    );
};

export default Dashboard;
