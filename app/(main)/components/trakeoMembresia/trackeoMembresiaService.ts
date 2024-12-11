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

export interface Puesto {
    idPuesto: number;
    nombre: string;
    descripcion: string;
}

export interface Rol {
    idRol: number;
    nombre: string;
    permisos: any[];
}

export interface Usuario {
    idUsuario: number;
    username: string;
    password: string;
    estatus: number;
    token: string | null;
    resetToken: string | null;
    fechaExpiracion: string | null;
    rol: Rol;
}

export interface Membresia {
    idMembresia: number;
    nombre: string;
    precio: number;
    descripcion: string;
    duracionDias: number;
    estatus: boolean;
}

export interface Empleado {
    idEmpleado: number;
    fechaAlta: string;
    puesto: Puesto;
    estatus: number;
    persona: Persona;
    usuario: Usuario;
    membresia: Membresia;
}

export interface Trackeo {
    idMembresiaTrackeo: number;
    cliente: any | null;
    empleado: Empleado;
    membresia: Membresia;
    fechaAsignacion: string;
    fechaInicio: string;
    fechaFin: string;
    estatus: boolean;
    fechaActualizacion: string | null;
    comentarios: string;
}


const API_URL = 'http://localhost:8000/api/membresiaTrakeo';

export const TrackeoService = {
    getTrackeos: async (): Promise<Trackeo[]> => {
        try {
            const response = await axios.get<Trackeo[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener trackeos:', error);
            throw error;
        }
    },
};
