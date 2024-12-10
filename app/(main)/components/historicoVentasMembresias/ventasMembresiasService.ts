import axios from 'axios';

// Interface para la persona
export interface Persona {
  idPersona: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string; // O puedes usar Date si prefieres manejar fechas como objetos Date
  sexo: string;
  telefono: string;
  email: string;
}

// Interface para la compra
export interface Compra {
  id: number;
  persona: Persona;
  membresiaId: number;
  fechaVenta: string; // O puedes usar Date si prefieres manejar fechas como objetos Date
}

// URL base de la API
const API_URL = 'http://localhost:8000/api/ventaMembresia/ultimo-ano';

export const ventaService = {
  async getVentas(): Promise<Compra[]> {
    try {
      const response = await axios.get<Compra[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las compras:', error);
      throw error;
    }
  },
};
