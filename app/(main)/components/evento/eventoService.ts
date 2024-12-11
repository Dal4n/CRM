import axios from 'axios';

export interface Ocupacion {
    idOcupacion: number;
    nombre: string;
}
export interface Evento {
    idEvento: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    costoEvento: number;
    cupoMaximo: number;
    ocupacion: Ocupacion;
}

const API_URL = 'http://localhost:8000/api/evento';
const API_OCUPACION_URL = 'http://localhost:8000/api/ocupacion';

export const EventoService = {

    getOcupaciones: async (): Promise<Ocupacion[]> => {
        try {
            const response = await axios.get<Ocupacion[]>(API_OCUPACION_URL);
            return response.data;
        } catch (error) {
            console.error('Error al cargar ocupaciones:', error);
            throw new Error('No se pudieron cargar las ocupaciones. Intente nuevamente.');
        }
    },
    // Obtener eventos
    getEventos: async (): Promise<Evento[]> => {
        try {
            const response = await axios.get<Evento[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al cargar eventos:', error);
            throw error;
        }
    },

    // Agregar un evento
    addEvento: async (evento: Omit<Evento, 'idEvento'>): Promise<Evento> => {
        try {
            const response = await axios.post<Evento>(API_URL, evento);
            return response.data;
        } catch (error) {
            console.error('Error al agregar evento:', error);
            throw error;
        }
    },

    // Modificar un evento por ID
    updateEvento: async (idEvento: number, evento: Partial<Evento>): Promise<Evento> => {
        try {
            const response = await axios.put<Evento>(`${API_URL}/${idEvento}`, evento);
            return response.data;
        } catch (error) {
            console.error('Error al modificar evento:', error);
            throw error;
        }
    },

    // Eliminar un evento por ID
    deleteEvento: async (idEvento: number): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/${idEvento}`);
        } catch (error) {
            console.error('Error al eliminar evento:', error);
            throw error;
        }
    },

    generarEvento: async (evento: Evento): Promise<void> => {
        await axios.post(`${API_URL}/generarEvento`, evento);
    },
};
