import axios from 'axios';

export interface CompraEbook {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    ebook: string;
    fechaCompra: string;
}

const API_URL = 'http://localhost:8000/api/ebooks';

export const CompraEbookService = {
    async getCompras(): Promise<CompraEbook[]> {
        try {
            const response = await axios.get<CompraEbook[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las compras de eBooks', error);
            throw error;
        }
    }
};

