import axios from 'axios';

export interface Ocupacion {
    idOcupacion: number;
    nombre: string;
}

export interface Promocion {
    idPromocion: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    ocupacion: Ocupacion;
}

const API_BASE_URL = 'http://localhost:8000/api/promocion';
const API_OCUPACION_URL = 'http://localhost:8000/api/ocupacion';


export const PromocionService = {

    getOcupaciones: async (): Promise<Ocupacion[]> => {
        try {
            const response = await axios.get<Ocupacion[]>(API_OCUPACION_URL);
            return response.data;
        } catch (error) {
            console.error('Error al cargar ocupaciones:', error);
            throw new Error('No se pudieron cargar las ocupaciones. Intente nuevamente.');
        }
    },

    getPromociones: async (): Promise<Promocion[]> => {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    },


    addPromocion: async (promocion: Promocion): Promise<void> => {
        await axios.post(`${API_BASE_URL}`, promocion);
    },

    updatePromocion: async (idPromocion: number, promocion: Promocion): Promise<void> => {
        await axios.put(`${API_BASE_URL}/${idPromocion}`, promocion);
    },

    deletePromocion: async (idPromocion: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${idPromocion}`);
    },


    generarPromocion: async (promocion: Promocion): Promise<void> => {
        await axios.post(`${API_BASE_URL}/generarPromocion`, promocion);
    },
};
