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
        <div className="card p-m-4">
            <h5 className="text-start mb-4">Ventas Realizadas</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ventas.map((venta) => (
                    <div key={venta.idVenta}
                        className="col-12 mb-3"
                        onClick={() => showDetails(venta)}>
                        <div className="card p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer hoverable">
                            <div className="flex align-items-center mb-2">
                                <i
                                    className="pi pi-fw pi-shopping-bag mr-2"
                                    style={{ fontSize: "2rem", color: "green" }}
                                ></i>
                                <h5 className="m-0">Venta #{venta.idVenta}</h5>
                            </div>
                            <p><strong>Cliente:</strong> {`${venta.cliente.persona.nombre} ${venta.cliente.persona.apellidoPaterno} ${venta.cliente.persona.apellidoMaterno}`}</p>
                            <p><strong>Fecha:</strong> {new Date(venta.fechaVenta).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog
                header={`Detalles de Venta #${selectedVenta?.idVenta}`}
                visible={isModalVisible}
                style={{ width: "50vw" }}
                onHide={hideDetails}
                className="p-dialog-rounded p-dialog-shadow"
            >
                {selectedVenta && (
                    <div style={{ padding: "1rem" }}>
                        {/* Sección de Cliente */}
                        <div style={{ marginBottom: "1rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
                                <i className="pi pi-user" style={{ marginRight: "0.5rem" }}></i>Cliente
                            </h4>
                            <p>
                                <strong>Nombre:</strong> {`${selectedVenta.cliente.persona.nombre} ${selectedVenta.cliente.persona.apellidoPaterno} ${selectedVenta.cliente.persona.apellidoMaterno}`}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedVenta.cliente.persona.email}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {selectedVenta.cliente.persona.telefono}
                            </p>
                        </div>

                        {/* Sección de Productos */}
                        <div style={{ marginBottom: "1rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
                                <i className="pi pi-shopping-cart" style={{ marginRight: "0.5rem" }}></i>Productos
                            </h4>
                            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                                {selectedVenta.detallesVenta.map((detalle) => (
                                    <li key={detalle.idDetalleVenta} style={{ marginBottom: "0.5rem" }}>
                                        <strong>{detalle.producto.nombre}</strong> - Cantidad: {detalle.cantidad}, Subtotal:{" "}
                                        <span style={{ color: "#28a745", fontWeight: "bold" }}>${detalle.subtotal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sección de Fecha */}
                        <div>
                            <h4 style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
                                <i className="pi pi-calendar" style={{ marginRight: "0.5rem" }}></i>Fecha Venta
                            </h4>
                            <p>{new Date(selectedVenta.fechaVenta).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </Dialog>


            <style jsx>{`
        .hoverable {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: 1px solid green;
        }

        .hoverable:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .list-none {
          list-style: none;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
        </div>
    );
};

export default VentasPage;
