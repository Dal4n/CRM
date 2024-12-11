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

export interface Ocupacion {
    idOcupacion: number;
    nombre: string;
}

export interface Objetivo {
    idObjetivo: number;
    nombre: string;
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
    ocupacion: Ocupacion;
    objetivo: Objetivo;
    empresa: Empresa;
}

export interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    stockMinimo: number;
    precioVenta: number;
    precioCompra: number;
    estatus: boolean;
    img: string | null;
}

export interface DetalleVenta {
    idDetalleVenta: number;
    producto: Producto;
    cantidad: number;
    precioVenta: number;
    subtotal: number;
}

export interface Venta {
    idVenta: number;
    fechaVenta: string;
    cliente: Cliente;
    empleado: string | null;
    detallesVenta: DetalleVenta[];
}


const API_URL = 'http://localhost:8000/api/venta';

export const VentaService = {
    async getVentas(): Promise<Venta[]> {
        try {
            const response = await axios.get<Venta[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            throw error;
        }
    },
};