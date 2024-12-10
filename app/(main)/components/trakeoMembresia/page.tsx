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

    const calculateActiveIndex = (fechaInicio: string, fechaFin: string): number => {
        const today = new Date();
        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFin);

        if (today < startDate) {
            return 0; // Antes del inicio
        } else if (today >= startDate && today <= endDate) {
            return 1; // En progreso
        } else {
            return 2; // Finalizado
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
        <div className="p-m-3">
            <h2>Trackeo de Membresías - Progreso</h2>
            <div className="p-grid">
                {trackeos.map((trackeo) => (
                    <div className="col-12" key={trackeo.idMembresiaTrackeo}>
                        <div className="card">
                            <h5>{trackeo.empleado.persona.nombre} {trackeo.empleado.persona.apellidoPaterno}</h5>
                            <Steps
                                model={wizardItems}
                                activeIndex={calculateActiveIndex(trackeo.fechaInicio, trackeo.fechaFin)}
                                readOnly={true}
                            />
                            <div className='mt-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
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
                            <strong>Duracion en días:</strong> {selectedTrackeo.membresia.duracionDias}
                        </p>
                        <p>
                            <strong>Precio:</strong> {selectedTrackeo.membresia.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                        </p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default TrackeoStepsPage;
