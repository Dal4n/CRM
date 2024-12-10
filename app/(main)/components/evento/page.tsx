'use client';

import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Evento, EventoService } from './eventoService';

const EventoPage = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [newEvento, setNewEvento] = useState<Partial<Evento>>({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        costoEvento: 0,
        cupoMaximo: 0,
        ocupacion: { idOcupacion: 1, nombre: 'Estudiante' }
    });
    const [ocupaciones, setOcupaciones] = useState<{ idOcupacion: number; nombre: string }[]>([]);

    const fetchEventos = async () => {
        try {
            const data = await EventoService.getEventos();
            setEventos(data);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    const fetchOcupaciones = async () => {
        try {
            const data = await EventoService.getOcupaciones();
            setOcupaciones(data);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    const handleSaveEvento = async () => {
        try {
            if (newEvento.idEvento) {
                // Editar evento
                await EventoService.updateEvento(newEvento.idEvento, newEvento as Evento);
            } else {
                // Agregar evento
                await EventoService.addEvento(newEvento as Evento);
            }
            setShowDialog(false); // Cerrar el modal
            fetchEventos(); // Actualizar lista
        } catch (error) {
            console.error('Error al guardar evento:', error);
        }
    };

    const handleEditEvento = (evento: Evento) => {
        setNewEvento({ ...evento });
        setShowDialog(true);
    };

    const handleGenerateEvento = async (evento: Evento) => {
        try {
            await EventoService.generarEvento(evento);
            Swal.fire('Éxito', 'El evento fue generado correctamente.', 'success');
        } catch (error) {
            console.error('Error al generar evento:', error);
            Swal.fire('Error', 'No se pudo generar el evento.', 'error');
        }
    };

    const handleDeleteEvento = async (idEvento: number) => {
        if (!idEvento) return;

        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => result.isConfirmed);
        if (!confirmDelete) return;

        try {
            await EventoService.deleteEvento(idEvento); // Suponiendo que este método está definido en `EventoService`
            fetchEventos(); // Actualizar la lista de eventos
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewEvento((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumericChange = (name: keyof Evento, value: number) => {
        setNewEvento((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchEventos();
        fetchOcupaciones(); // Llamada para obtener las ocupaciones
    }, []);

    const carouselItemTemplate = (evento: Evento) => (
        <div className="border-1 surface-border border-round m-1 text-center py-5 shadow-2">
            <div className="p-3">
                <img
                    src="https://cdn.textstudio.com/output/sample/normal/6/3/2/5/event-logo-261-5236.png"
                    alt={evento.nombre}
                    className="w-full h-auto"
                />
                <h4 className="p-mb-1 text-primary">{evento.nombre}</h4>
                <p className="mt-0 mb-3 text-secondary">
                    <strong>Descripción: </strong>
                    {evento.descripcion}
                </p>
                <div className="mb-3">
                    <p>
                        <strong>Desde:</strong> {new Date(evento.fechaInicio).toLocaleDateString()} <strong>Hasta:</strong> {new Date(evento.fechaFin).toLocaleDateString()}
                    </p>
                </div>
                <div className="mb-3">
                    <p>
                        <strong>Costo:</strong> ${evento.costoEvento}
                    </p>
                    <p>
                        <strong>Cupo máximo:</strong> {evento.cupoMaximo}
                    </p>
                    <p>
                        <strong>Ocupación:</strong> {evento.ocupacion.nombre}
                    </p>
                </div>
                <div className="car-buttons mt-5 flex justify-content-center">
                    <Button type="button" className="mr-2 p-button-rounded p-button-danger" icon="pi pi-trash" label="Eliminar" onClick={() => handleDeleteEvento(evento.idEvento)}></Button>
                    <Button type="button" className="mr-2 p-button-rounded p-button-warning" icon="pi pi-send" label="Invitar" onClick={() => handleGenerateEvento(evento)}></Button>
                    <Button type="button" className="mr-2 p-button-rounded p-button-success" icon="pi pi-pencil" label="Editar" onClick={() => handleEditEvento(evento)} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Eventos activos</h5>
                    <Carousel value={eventos} numVisible={3} numScroll={3} itemTemplate={carouselItemTemplate}></Carousel>
                    <Button
                        type="button"
                        className="p-button-rounded p-button-primary mt-3"
                        icon="pi pi-plus"
                        label="Agregar"
                        onClick={() => {
                            setNewEvento({
                                nombre: '',
                                descripcion: '',
                                fechaInicio: '',
                                fechaFin: '',
                                costoEvento: 0,
                                cupoMaximo: 0,
                                ocupacion: { idOcupacion: 1, nombre: 'Estudiante' }
                            });
                            setShowDialog(true);
                        }}
                    ></Button>
                </div>
            </div>

            <Dialog header={newEvento.idEvento ? 'Editar Evento' : 'Agregar Evento'} visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
                <div className="grid">
                    <div className="col-12 mb-3">
                        <label htmlFor="nombre" className="block text-900 font-medium mb-2">
                            Nombre
                        </label>
                        <InputText id="nombre" name="nombre" value={newEvento.nombre} onChange={handleInputChange} className="w-full" />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="descripcion" className="block text-900 font-medium mb-2">
                            Descripción
                        </label>
                        <InputText id="descripcion" name="descripcion" value={newEvento.descripcion} onChange={handleInputChange} className="w-full" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="fechaInicio" className="block text-900 font-medium mb-2">
                            Fecha Inicio
                        </label>
                        <Calendar
                            id="fechaInicio"
                            name="fechaInicio"
                            value={new Date(newEvento.fechaInicio || '')}
                            onChange={(e) => handleInputChange({ target: { name: 'fechaInicio', value: e.value?.toISOString().split('T')[0] } })}
                            showIcon
                            className="w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="fechaFin" className="block text-900 font-medium mb-2">
                            Fecha Fin
                        </label>
                        <Calendar
                            id="fechaFin"
                            name="fechaFin"
                            value={new Date(newEvento.fechaFin || '')}
                            onChange={(e) => handleInputChange({ target: { name: 'fechaFin', value: e.value?.toISOString().split('T')[0] } })}
                            showIcon
                            className="w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="costoEvento" className="block text-900 font-medium mb-2">
                            Costo
                        </label>
                        <InputNumber id="costoEvento" name="costoEvento" value={newEvento.costoEvento} onValueChange={(e) => handleNumericChange('costoEvento', e.value || 0)} className="w-full" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="cupoMaximo" className="block text-900 font-medium mb-2">
                            Cupo Máximo
                        </label>
                        <InputNumber id="cupoMaximo" name="cupoMaximo" value={newEvento.cupoMaximo} onValueChange={(e) => handleNumericChange('cupoMaximo', e.value || 0)} className="w-full" />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="ocupacion" className="block text-900 font-medium mb-2">
                            Ocupación
                        </label>
                        <SelectButton
                            id="ocupacion"
                            name="ocupacion"
                            value={newEvento.ocupacion?.idOcupacion}
                            options={ocupaciones.map((ocupacion) => ({
                                label: ocupacion.nombre,
                                value: ocupacion.idOcupacion
                            }))}
                            onChange={(e) => {
                                const selectedOcupacion = ocupaciones.find((ocup) => ocup.idOcupacion === e.value);
                                setNewEvento((prev) => ({
                                    ...prev,
                                    ocupacion: selectedOcupacion || prev.ocupacion
                                }));
                            }}
                            className="w-full"
                        />
                    </div>

                </div>
                <div className="flex justify-content-end">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text mr-2" onClick={() => setShowDialog(false)} />
                    <Button label="Guardar" icon="pi pi-check" className="p-button-primary" onClick={handleSaveEvento} />
                </div>
            </Dialog>
        </div>
    );
};

export default EventoPage;
