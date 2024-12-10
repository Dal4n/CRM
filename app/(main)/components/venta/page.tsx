// src/pages/VentasPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Venta, VentaService } from './ventaService';

const VentasPage = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);

    // Obtener las ventas al cargar la página
    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const data = await VentaService.getVentas();
                setVentas(data);
            } catch (error) {
                console.error('Error al cargar las ventas:', error);
            }
        };

        fetchVentas();
    }, []);

    // Template para el nombre completo del cliente
    const clienteNombreTemplate = (rowData: Venta) => {
        const persona = rowData.cliente.persona;
        return `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`;
    };

    // Template para mostrar los detalles de venta
    const detallesVentaTemplate = (rowData: Venta) => {
        return (
            <ul>
                {rowData.detallesVenta.map((detalle) => (
                    <li key={detalle.idDetalleVenta}>
                        {detalle.producto.nombre} (Cantidad: {detalle.cantidad}, Subtotal: ${detalle.subtotal})
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-m-3">
            <h2>Ventas</h2>
            <DataTable value={ventas} responsiveLayout="scroll" scrollable scrollHeight="400px">
                <Column field="idVenta" header="ID Venta" style={{ minWidth: '100px' }}></Column>
                <Column
                    field="cliente.persona.nombre"
                    header="Cliente"
                    body={clienteNombreTemplate}
                    style={{ minWidth: '200px' }}
                ></Column>
                <Column
                    field="fechaVenta"
                    header="Fecha Venta"
                    style={{ minWidth: '150px' }}
                    body={(rowData) => new Date(rowData.fechaVenta).toLocaleDateString()}
                ></Column>
                <Column
                    field="detallesVenta"
                    header="Detalles de Venta"
                    body={detallesVentaTemplate}
                    style={{ minWidth: '300px' }}
                ></Column>
            </DataTable>
        </div>
    );
};

export default VentasPage;