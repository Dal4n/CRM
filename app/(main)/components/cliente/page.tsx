'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Cliente, ClienteService } from './clienteService';

const ClientesPage = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

    const fetchClientes = async () => {
        try {
            const data = await ClienteService.getClientes();
            setClientes(data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleCardClick = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setShowModal(true);
    };

    const renderModalContent = () => {
        if (!selectedCliente) return null;

        const { persona, objetivo, ocupacion, empresa } = selectedCliente;
        return (
            <div>
                <p><strong>Nombre:</strong> {persona.nombre} {persona.apellidoPaterno} {persona.apellidoMaterno}</p>
                <p><strong>Fecha de Nacimiento:</strong> {persona.fechaNacimiento}</p>
                <p><strong>Sexo:</strong> {persona.sexo}</p>
                <p><strong>Teléfono:</strong> {persona.telefono}</p>
                <p><strong>Email:</strong> {persona.email}</p>
                <p><strong>Objetivo:</strong> {objetivo.nombre}</p>
                <p><strong>Ocupación:</strong> {ocupacion.nombre}</p>
                <p><strong>Empresa:</strong> {empresa.nombre}</p>
                <p><strong>Dirección:</strong> {empresa.direccion}</p>
                <p><strong>Teléfono Empresa:</strong> {empresa.telefono}</p>
                <p><strong>Email Empresa:</strong> {empresa.correo}</p>
            </div>
        );
    };

    return (
        <div className="card p-m-4">
            <h5 className="text-start mb-4">Listado de Clientes</h5>
            <div className="flex">
                {clientes.map(cliente => (
                    <div
                    key={cliente.idCliente}
                    className="col-12 md:col-4 lg:col-4 mb-3"
                    onClick={() => handleCardClick(cliente)}
                  >
                    <div className="card p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer hoverable">
              <div className="flex align-items-center mb-2">
              <i
                  className="pi pi-user mr-2"
                  style={{ fontSize: "2rem", color: "lightseagreen " }}
                ></i>
                 <strong>{cliente.persona.nombre + ' ' + cliente.persona.apellidoPaterno}</strong>
              </div>
                            <hr />
                            <p><strong>Ocupación:</strong> {cliente.ocupacion.nombre}</p>
                            <p><strong>Celular:</strong> {cliente.persona.telefono}</p>
                    </div>
                  </div>
                ))}
            </div>

            <Dialog header="Detalles del Cliente" visible={showModal} style={{ width: '50vw' }} onHide={() => setShowModal(false)}>
                {renderModalContent()}
                <div className="flex justify-content-end mt-3">
                    <Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={() => setShowModal(false)} />
                </div>
            </Dialog>

            <style jsx>{`
        .hoverable {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: 1px solid lightseagreen  ;
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

export default ClientesPage;
