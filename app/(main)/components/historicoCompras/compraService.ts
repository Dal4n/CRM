import axios from 'axios';
// Interface para el producto
// Interface para representar un proveedor
export interface Proveedor {
  idProveedor: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  estatus: boolean;
  tipoProveedor: string; // Por ejemplo, "MANTENIMIENTO"
  productos: Producto[];
}

// Interface para representar un producto
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  stockMinimo: number;
  precioVenta: number;
  precioCompra: number;
  estatus: boolean;
  img: string;
}

// Interface para representar un detalle de compra
export interface DetalleCompra {
  idDetalleCompra: number;
  producto: Producto;
  cantidad: number;
  precioCompra: number;
  subtotal: number;
}

// Interface principal para representar una compra
export interface Compra {
  idCompra: number;
  fechaCompra: string; // Formato de fecha, e.g., "2024-12-10"
  proveedor: Proveedor;
  detallesCompra: DetalleCompra[];
}

const API_URL = 'http://localhost:8000/api/compra';

export const CompraService = {
    async getCompras(): Promise<Compra[]> {
        try {
            const response = await axios.get<Compra[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las compras:', error);
            throw error;
        }
    },
};