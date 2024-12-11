
import axios from 'axios';


export interface Comentario {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    fechaCreacion: string;
    rating: number;
}



const API_URL = 'http://localhost:8000/api/feedback';

export const ComentariosService = {
    async getComentarios(): Promise<Comentario[]> {
        try {
            const response = await axios.get<Comentario[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los comentarios', error);
            throw error;
        }
    }
};