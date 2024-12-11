"use client";

import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { getClientesMasCompras, getProductosMasVendidos, getVentasXDiaSemana, getVentasAnual, getClientesTotales, getClientesProospectos } from './analiticaService';

const AnaliticaPage = () => {
    const [pieData, setPieData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [barData, setBarData] = useState(null);
    const [totalVentas, setTotalVentas] = useState(null);
    const [totalClientes, setTotalClientes] = useState(null);
    const [totalClientesProspectos, setTotalClientesProspectos] = useState(null);

    useEffect(() => {
        const fetchClientesData = async () => {
            const apiData = await getClientesMasCompras();
            const labels = apiData.map(([name]) => name);
            const data = apiData.map(([, purchases]) => purchases);

            const documentStyle = getComputedStyle(document.documentElement);

            setPieData({
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--indigo-500') || '#6366f1',
                            documentStyle.getPropertyValue('--purple-500') || '#a855f7',
                            documentStyle.getPropertyValue('--teal-500') || '#14b8a6',
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--indigo-400') || '#8183f4',
                            documentStyle.getPropertyValue('--purple-400') || '#b975f9',
                            documentStyle.getPropertyValue('--teal-400') || '#41c5b7',
                        ],
                    },
                ],
            });
        };

        const fetchProductosData = async () => {
            const apiData = await getProductosMasVendidos();
            const labels = apiData.map(([product]) => product);
            const data = apiData.map(([, sales]) => sales);

            const documentStyle = getComputedStyle(document.documentElement);

            setDoughnutData({
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500') || '#3b82f6',
                            documentStyle.getPropertyValue('--green-500') || '#22c55e',
                            documentStyle.getPropertyValue('--orange-500') || '#f97316',
                            documentStyle.getPropertyValue('--yellow-500') || '#eab308',
                            documentStyle.getPropertyValue('--pink-500') || '#ec4899',
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400') || '#60a5fa',
                            documentStyle.getPropertyValue('--green-400') || '#4ade80',
                            documentStyle.getPropertyValue('--orange-400') || '#fb923c',
                            documentStyle.getPropertyValue('--yellow-400') || '#facc15',
                            documentStyle.getPropertyValue('--pink-400') || '#f472b6',
                        ],
                    },
                ],
            });
        };

        const fetchVentasPorDiaSemana = async () => {
            const apiData = await getVentasXDiaSemana();
            const labels = apiData.map(([day]) => {
                switch(day) {
                    case 'sunday': return 'Domingo';
                    case 'monday': return 'Lunes';
                    case 'tuesday': return 'Martes';
                    case 'wednesday': return 'Miércoles';
                    case 'thursday': return 'Jueves';
                    case 'friday': return 'Viernes';
                    case 'saturday': return 'Sábado';
                    default: return day;
                }
            });
            const data = apiData.map(([, sales]) => sales);
        
            const documentStyle = getComputedStyle(document.documentElement);
        
            setBarData({
                labels,
                datasets: [
                    {
                        label: 'Ventas por día',
                        data,
                        backgroundColor: documentStyle.getPropertyValue('--cyan-500') || '#06b6d4',
                        hoverBackgroundColor: documentStyle.getPropertyValue('--cyan-400') || '#22d3ee',
                    },
                ],
            });
        };
        

        const fetchTotalVentas = async () => {
            const apiData = await getVentasAnual();
            setTotalVentas(apiData.Total);
        };

        const fetchTotalClientes = async () => {
            const apiData = await getClientesTotales();
            setTotalClientes(apiData);
        };

        const fetchTotalClientesProspectos = async () => {
            const apiData = await getClientesProospectos();
            setTotalClientesProspectos(apiData);
        };

        fetchClientesData();
        fetchProductosData();
        fetchVentasPorDiaSemana();
        fetchTotalVentas();
        fetchTotalClientes();
        fetchTotalClientesProspectos();
    }, []);

    if (!pieData || !doughnutData || !barData || totalVentas === null || totalClientes === null) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="grid p-fluid">
    {/* Sección de tarjetas */}
    <div className="col-12">
        <div className="grid">
            <div className="col-12 lg:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total de ventas al año</span>
                            <div className="text-900 font-medium text-xl">${totalVentas}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-fw pi-dollar text-green-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Estas han sido el total de ventas que se han echo al año en GYMFURY</span>
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total de clientes prospectos</span>
                            <div className="text-900 font-medium text-xl">{totalClientesProspectos}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-fw pi-book text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-orange-500 font-medium">Este es el total de clientes prospectos registrados en GYMFURY</span>
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total de clientes</span>
                            <div className="text-900 font-medium text-xl">{totalClientes}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-fw pi-user text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-blue-500 font-medium">Este es el total de clientes que estan inscritos en GYMFURY</span>
                </div>
            </div>
        </div>
    </div>

    {/* Sección de gráficas */}
    <div className="col-12">
        <div className="grid">
            <div className="col-12 lg:col-4">
                <div className="card flex flex-column align-items-center">
                    <h3>Clientes con más compras</h3>
                    <Chart type="pie" data={pieData} />
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="card flex flex-column align-items-center">
                    <h3>Ventas por día de la semana</h3>
                    <Chart type="line" data={barData} />
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="card flex flex-column align-items-center">
                    <h3>Productos más vendidos</h3>
                    <Chart type="doughnut" data={doughnutData} />
                </div>
            </div>
        </div>
    </div>
</div>

    );
};

export default AnaliticaPage;
