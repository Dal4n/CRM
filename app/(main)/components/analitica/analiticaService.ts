import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getClientesMasCompras = async () => {
    try {
        const response = await axios.get(`${API_URL}/venta/clientes-mas-compras`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener clientes más compras:', error);
        return [];
    }
};

export const getProductosMasVendidos = async () => {
    try {
        const response = await axios.get(`${API_URL}/venta/ingresos-por-producto`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos más compras:', error);
        return [];
    }
};


export const getVentasXDiaSemana = async () => {
    try {
        const response = await axios.get(`${API_URL}/venta/ventas-por-dia-semana`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener ventas por dia de semana:', error);
        return [];
    }
};


export const getVentasAnual = async () => {
    try {
        const response = await axios.get(`${API_URL}/venta/total-ventas`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener ventas por dia de semana:', error);
        return [];
    }
};



export const getClientesTotales = async () => {
    try {
        const response = await axios.get(`${API_URL}/cliente/clientes/total`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes totales', error);
        return [];
    }
};


export const getClientesProospectos = async () => {
    try {
        const response = await axios.get(`${API_URL}/ebooks/clientes-leads/total`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes totales', error);
        return [];
    }
};


