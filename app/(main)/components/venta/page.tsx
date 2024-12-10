// src/pages/VentasPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Venta, VentaService } from './ventaService';

const VentasPage = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    // Función para mostrar el modal
    const showDetails = (venta: Venta) => {
        setSelectedVenta(venta);
        setIsModalVisible(true);
    };

    // Función para cerrar el modal
    const hideDetails = () => {
        setSelectedVenta(null);
        setIsModalVisible(false);
    };

    return (
        <div className="p-card p-shadow-3 p-m-3">
            <div className="p-card-header">
                <h2>Ventas</h2>
            </div>
            <div className="p-card-body">
                <div className="p-grid">
                    {ventas.map((venta) => (
                        <div key={venta.idVenta} className="p-col-12 p-md-6 p-lg-4">
                            <div className="p-card p-shadow-2">
                                <div className="p-card-header">
                                    <h4 className='p-3'>Venta #{venta.idVenta}</h4>
                                </div>
                                <div className="p-card-body">
                                    <p><strong>Cliente:</strong> {`${venta.cliente.persona.nombre} ${venta.cliente.persona.apellidoPaterno} ${venta.cliente.persona.apellidoMaterno}`}</p>
                                    <p><strong>Fecha:</strong> {new Date(venta.fechaVenta).toLocaleDateString()}</p>
                                    <Button
                                        label="Ver Detalles"
                                        className="p-button-outlined p-button-info"
                                        onClick={() => showDetails(venta)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal para mostrar detalles de la venta */}
                <Dialog
                    header={`Detalles de Venta #${selectedVenta?.idVenta}`}
                    visible={isModalVisible}
                    style={{ width: '50vw' }}
                    onHide={hideDetails}
                >
                    {selectedVenta && (
                        <div>
                            <h4>Cliente</h4>
                            <p><strong>Nombre:</strong> {`${selectedVenta.cliente.persona.nombre} ${selectedVenta.cliente.persona.apellidoPaterno} ${selectedVenta.cliente.persona.apellidoMaterno}`}</p>
                            <p><strong>Email:</strong> {selectedVenta.cliente.persona.email}</p>

                            <h4>Productos</h4>
                            <ul>
                                {selectedVenta.detallesVenta.map((detalle) => (
                                    <li key={detalle.idDetalleVenta}>
                                        {detalle.producto.nombre} - Cantidad: {detalle.cantidad}, Subtotal: ${detalle.subtotal}
                                    </li>
                                ))}
                            </ul>

                            <h4>Fecha</h4>
                            <p>{new Date(selectedVenta.fechaVenta).toLocaleDateString()}</p>
                        </div>
                    )}
                </Dialog>
            </div>
        </div>
    );
};

export default VentasPage;
