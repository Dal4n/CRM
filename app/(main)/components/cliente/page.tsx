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
        <Card className="p-mb-4">
            <h5>Listado de Clientes</h5>
            <div className="grid p-fluid">
                {clientes.map(cliente => (
                    <div key={cliente.idCliente} className="col-12 md:col-4 lg:col-3 mb-4">
                        <Card onClick={() => handleCardClick(cliente)} className="cursor-pointer">
                            <div className="flex align-items-center">
                                <i className="pi pi-user" style={{ fontSize: '1.3em', marginRight: '0.5em' }}></i>
                                <strong>{cliente.persona.nombre + ' ' + cliente.persona.apellidoPaterno}</strong>
                            </div>
                            <hr />
                            <p><strong>Ocupación:</strong> {cliente.ocupacion.nombre}</p>
                            <p><strong>Celular:</strong> {cliente.persona.telefono}</p>
                        </Card>
                    </div>
                ))}
            </div>

            <Dialog header="Detalles del Cliente" visible={showModal} style={{ width: '50vw' }} onHide={() => setShowModal(false)}>
                {renderModalContent()}
                <div className="flex justify-content-end mt-3">
                    <Button label="Cerrar" icon="pi pi-times" className="p-button-text" onClick={() => setShowModal(false)} />
                </div>
            </Dialog>
        </Card>
    );
};

export default ClientesPage;
