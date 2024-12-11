'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { CompraEbook, CompraEbookService } from './ebookService';

const ComprasEbookPage = () => {
    const [compras, setCompras] = useState<CompraEbook[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCompra, setSelectedCompra] = useState<CompraEbook | null>(null);

    // Función para obtener las compras
    const fetchCompras = async () => {
        try {
            const data = await CompraEbookService.getCompras();
            setCompras(data);
        } catch (error) {
            console.error('Error al obtener las compras de eBooks:', error);
        }
    };

    useEffect(() => {
        fetchCompras();
    }, []);

    const handleCardClick = (compra: CompraEbook) => {
        setSelectedCompra(compra);
        setShowModal(true);
    };

    const renderModalContent = () => {
        if (!selectedCompra) return null;

        const { nombre, correo, telefono, ebook, fechaCompra } = selectedCompra;
        return (
            <div>
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {correo}</p>
                <p><strong>Teléfono:</strong> {telefono || 'No proporcionado'}</p>
                <p><strong>eBook:</strong> {ebook}</p>
                <p><strong>Fecha de Compra:</strong> {new Date(fechaCompra).toLocaleString()}</p>
            </div>
        );
    };

    return (
        <div className="card p-m-4">
            <h5 className="text-start mb-4">Clientes Prospectos</h5>
            <div className="flex">
                {compras.map(compra => (
                    <div
                        key={compra.id}
                        className="col-12 md:col-4 lg:col-4 mb-3"
                        onClick={() => handleCardClick(compra)}
                    >
                        <div className="card p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer hoverable">
                            <div className="flex align-items-center mb-2">
                                <i
                                    className="pi pi-book mr-2"
                                    style={{ fontSize: "2rem", color: "navy" }}
                                ></i>
                                <strong>{compra.nombre}</strong>
                            </div>
                            <hr />
                            <p><strong>Correo:</strong> {compra.correo}</p>
                            <p><strong>eBook:</strong> {compra.ebook}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog header="Detalles de la Compra" visible={showModal} style={{ width: '50vw' }} onHide={() => setShowModal(false)}>
                {renderModalContent()}
                <div className="flex justify-content-end mt-3">
                    <Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={() => setShowModal(false)} />
                </div>
            </Dialog>

            <style jsx>{`
                .hoverable {
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                    border: 1px solid navy ;
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

export default ComprasEbookPage;
