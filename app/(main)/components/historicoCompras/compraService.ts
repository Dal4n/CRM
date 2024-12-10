import axios from 'axios';
// Interface para el producto
export interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    stockMinimo: number;
    precioVenta: number;
    precioCompra: number;
    estatus: boolean;
  }
  
  // Interface para el proveedor
  export interface Proveedor {
    idProveedor: number;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    estatus: boolean;
  }
  
  // Interface para la relación entre producto y proveedor
  export interface ProductoProveedor {
    idProductoProveedor: number;
    producto: Producto;
    proveedor: Proveedor;
    fechaRegistro: string; // Se puede considerar como tipo Date si lo prefieres
  }
  
  // Interface para la compra
  export interface Compra {
    idCompra: number;
    nombre: string;
    cantidad: number;
    fechaCompra: string; // Se puede considerar como tipo Date si lo prefieres
    productoProveedor: ProductoProveedor;
    totalCompra: number;
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