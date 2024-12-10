'use client';

import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Promocion, PromocionService, Ocupacion } from './promocionService';
import { SelectButton } from 'primereact/selectbutton';

const PromocionPage = () => {
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [newPromocion, setNewPromocion] = useState<Partial<Promocion>>({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        descuento: 0,
        ocupacion: { idOcupacion: 1, nombre: 'Estudiante' }
    });
    const [ocupaciones, setOcupaciones] = useState<{ idOcupacion: number; nombre: string }[]>([]);

    const fetchPromociones = async () => {
        try {
            const data = await PromocionService.getPromociones();
            setPromociones(data);
        } catch (error) {
            console.error('Error al obtener las promociones:', error);
        }
    };

    const fetchOcupaciones = async () => {
        try {
            const data = await PromocionService.getOcupaciones();
            setOcupaciones(data);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    const handleSavePromocion = async () => {
        try {
            if (newPromocion.idPromocion) {
                // Editar promoción
                await PromocionService.updatePromocion(newPromocion.idPromocion, newPromocion as Promocion);
            } else {
                // Agregar promoción
                await PromocionService.addPromocion(newPromocion as Promocion);
            }
            setShowDialog(false); // Cerrar el modal
            fetchPromociones(); // Actualizar lista
        } catch (error) {
            console.error('Error al guardar la promoción:', error);
        }
    };

    const handleEditPromocion = (promocion: Promocion) => {
        setNewPromocion({ ...promocion });
        setShowDialog(true);
    };

    const handleGeneratePromocion = async (promocion: Promocion) => {
        try {
            await PromocionService.generarPromocion(promocion);
            Swal.fire('Éxito', 'La promoción fue generada correctamente.', 'success');
        } catch (error) {
            console.error('Error al generar la promoción:', error);
            Swal.fire('Error', 'No se pudo generar la promoción.', 'error');
        }
    };

    const handleDeletePromocion = async (idPromocion: number) => {
        if (!idPromocion) return;

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
            await PromocionService.deletePromocion(idPromocion); // Suponiendo que este método está definido en `PromocionService`
            fetchPromociones(); // Actualizar la lista de promociones
        } catch (error) {
            console.error('Error al eliminar la promoción:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPromocion((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumericChange = (name: keyof Promocion, value: number) => {
        setNewPromocion((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchPromociones();
        fetchOcupaciones(); // Llamada para obtener las ocupaciones
    }, []);

    const carouselItemTemplate = (promocion: Promocion) => (
        <div className="border-1 surface-border border-round m-1 text-center py-5 shadow-2">
            <div className="p-3">
                <img
                    src="https://cdn.textstudio.com/text-effect/918/2eb42/PROMO.webp"
                    alt={promocion.nombre}
                    className="w-full h-auto"
                />
                <h4 className="p-mb-1 text-primary">{promocion.nombre}</h4>
                <p className="mt-0 mb-3 text-secondary">
                    <strong>Descripción: </strong>
                    {promocion.descripcion}
                </p>
                <div className="mb-3">
                    <p>
                        <strong>Desde:</strong> {new Date(promocion.fechaInicio).toLocaleDateString()} <strong>Hasta:</strong> {new Date(promocion.fechaFin).toLocaleDateString()}
                    </p>
                </div>
                <div className="mb-3">
                    <p>
                        <strong>Descuento:</strong> {promocion.descuento}%
                    </p>
                    <p>
                        <strong>Ocupación:</strong> {promocion.ocupacion.nombre}
                    </p>
                </div>
                <div className="car-buttons mt-5 flex justify-content-center">
                    <Button type="button" className="mr-2 p-button-rounded p-button-danger" icon="pi pi-trash" label="Eliminar" onClick={() => handleDeletePromocion(promocion.idPromocion)}></Button>
                    <Button type="button" className="mr-2 p-button-rounded p-button-warning" icon="pi pi-send" label="Invitar" onClick={() => handleGeneratePromocion(promocion)} />
                    <Button type="button" className="mr-2 p-button-rounded p-button-success" icon="pi pi-pencil" label="Editar" onClick={() => handleEditPromocion(promocion)} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Promociones activas</h5>
                    <Carousel value={promociones} numVisible={3} numScroll={3} itemTemplate={carouselItemTemplate}></Carousel>
                    <Button
                        type="button"
                        className="p-button-rounded p-button-primary mt-3"
                        icon="pi pi-plus"
                        label="Agregar"
                        onClick={() => {
                            setNewPromocion({
                                nombre: '',
                                descripcion: '',
                                fechaInicio: '',
                                fechaFin: '',
                                descuento: 0,
                                ocupacion: { idOcupacion: 1, nombre: 'Estudiante' }
                            });
                            setShowDialog(true);
                        }}
                    ></Button>
                </div>
            </div>

            <Dialog header={newPromocion.idPromocion ? 'Editar Promoción' : 'Agregar Promoción'} visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
                <div className="grid">
                    <div className="col-12 mb-3">
                        <label htmlFor="nombre" className="block text-900 font-medium mb-2">
                            Nombre
                        </label>
                        <InputText id="nombre" name="nombre" value={newPromocion.nombre} onChange={handleInputChange} className="w-full" />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="descripcion" className="block text-900 font-medium mb-2">
                            Descripción
                        </label>
                        <InputText id="descripcion" name="descripcion" value={newPromocion.descripcion} onChange={handleInputChange} className="w-full" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="fechaInicio" className="block text-900 font-medium mb-2">
                            Fecha Inicio
                        </label>
                        <Calendar
                            id="fechaInicio"
                            name="fechaInicio"
                            value={new Date(newPromocion.fechaInicio || '')}
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
                            value={new Date(newPromocion.fechaFin || '')}
                            onChange={(e) => handleInputChange({ target: { name: 'fechaFin', value: e.value?.toISOString().split('T')[0] } })}
                            showIcon
                            className="w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="descuento" className="block text-900 font-medium mb-2">
                            Descuento
                        </label>
                        <InputNumber id="descuento" name="descuento" value={newPromocion.descuento} onValueChange={(e) => handleNumericChange('descuento', e.value || 0)} className="w-full" />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="ocupacion" className="block text-900 font-medium mb-2">
                            Ocupación
                        </label>
                        <SelectButton
                            id="ocupacion"
                            name="ocupacion"
                            value={newPromocion.ocupacion?.idOcupacion}
                            options={ocupaciones.map((ocupacion) => ({
                                label: ocupacion.nombre,
                                value: ocupacion.idOcupacion
                            }))}
                            onChange={(e) => {
                                const selectedOcupacion = ocupaciones.find((ocup) => ocup.idOcupacion === e.value);
                                setNewPromocion((prev) => ({
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
                    <Button label="Guardar" icon="pi pi-check" className="p-button-primary" onClick={handleSavePromocion} />
                </div>
            </Dialog>
        </div>
    );
};

export default PromocionPage;
