import axios from 'axios';

export interface Persona {
    idPersona: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    sexo: string;
    telefono: string;
    email: string;
}

export interface Objetivo {
    idObjetivo: number;
    nombre: string;
}

export interface Ocupacion {
    idOcupacion: number;
    nombre: string;
}

export interface Usuario {
    idUsuario: number;
    username: string;
    estatus: number;
    rol: string | null;
}

export interface Empresa {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
}

export interface Cliente {
    idCliente: number;
    fechaAlta: string;
    estatus: number;
    membresia: string | null;
    persona: Persona;
    objetivo: Objetivo;
    ocupacion: Ocupacion;
    usuario: Usuario;
    empresa: Empresa;
}

const API_URL = 'http://localhost:8000/api/cliente';

export const ClienteService = {
    async getClientes(): Promise<Cliente[]> {
        try {
            const response = await axios.get<Cliente[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los clientes', error);
            throw error;
        }
    }
};
