'use client';
import React, { useEffect, useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Trackeo, TrackeoService } from './trackeoMembresiaService';

const TrackeoStepsPage = () => {
    const [trackeos, setTrackeos] = useState<Trackeo[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedTrackeo, setSelectedTrackeo] = useState<Trackeo | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const wizardItems = [
        { label: 'Inicio' },
        { label: 'Progreso' },
        { label: 'Finalizado' },
    ];

    useEffect(() => {
        const fetchTrackeos = async () => {
            try {
                const data = await TrackeoService.getTrackeos();
                setTrackeos(data);
            } catch (error) {
                console.error('Error al cargar los trackeos:', error);
            }
        };

        fetchTrackeos();
    }, []);

    const calculateActiveIndex = (fechaInicio: string, fechaFin: string, fechaAsignacion: string): number => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() es 0-indexado
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFin);
        const dateAsignacion = new Date(fechaAsignacion);

        console.log('today', formattedDate);
        console.log('dateAsignacion', fechaAsignacion);

        if (formattedDate == fechaAsignacion) {
            return 0;
        } else if (today >= startDate && today <= endDate) {
            return 1;
        } else {
            return 2;
        }
    };

    const openModal = (trackeo: Trackeo) => {
        setSelectedTrackeo(trackeo);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedTrackeo(null);
        setModalVisible(false);
    };

    return (
        <div className="card p-m-4">
            <h5 className="text-start mb-4">Trackeo de Membresías - Progreso</h5>
            <div className="p-grid">
                {trackeos.map((trackeo) => (
                    <div className="col-12" key={trackeo.idMembresiaTrackeo}>
                        <div className="card" style={{ borderColor: 'blue', borderWidth: '2px', borderStyle: 'solid' }}>
                            <h5>
                                {/* Verificar si es empleado o cliente */}
                                {trackeo.empleado?.persona
                                    ? `${trackeo.empleado.persona.nombre} ${trackeo.empleado.persona.apellidoPaterno}`
                                    : trackeo.cliente?.persona
                                        ? `${trackeo.cliente.persona.nombre} ${trackeo.cliente.persona.apellidoPaterno}`
                                        : 'Sin información'}
                            </h5>
                            <Steps
                                model={wizardItems}
                                activeIndex={calculateActiveIndex(trackeo.fechaInicio, trackeo.fechaFin, trackeo.fechaAsignacion)}
                                readOnly={true}
                            />
                            <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <Button label="Detalle" icon="pi pi-info" onClick={() => openModal(trackeo)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog
                header="Detalle de Trackeo"
                visible={isModalVisible}
                style={{ width: '50vw' }}
                onHide={closeModal}
            >
                {selectedTrackeo && (
                    <div>
                        <h3>{selectedTrackeo.membresia.nombre}</h3>
                        <p>
                            {selectedTrackeo.membresia.descripcion}
                        </p>
                        <p>
                            <strong>Inicio:</strong>{' '}
                            {new Date(selectedTrackeo.fechaInicio).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Fin:</strong>{' '}
                            {new Date(selectedTrackeo.fechaFin).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Duración en días:</strong> {selectedTrackeo.membresia.duracionDias}
                        </p>
                        <p>
                            <strong>Precio:</strong>{' '}
                            {selectedTrackeo.membresia.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                        </p>
                        <p>
                            <strong>Comentarios:</strong> {selectedTrackeo.comentarios || 'Sin comentarios'}
                        </p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default TrackeoStepsPage;
