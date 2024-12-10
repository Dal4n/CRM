'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CompraEbook, CompraEbookService } from './ebookService';

const ComprasEbookPage = () => {
    const [compras, setCompras] = useState<CompraEbook[]>([]);

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

    // Template para la fecha de compra
    const dateBodyTemplate = (rowData: CompraEbook) => {
        return new Date(rowData.fechaCompra).toLocaleString();
    };

    // Template para el teléfono (si no existe, mostrar 'No proporcionado')
    const telefonoBodyTemplate = (rowData: CompraEbook) => {
        return rowData.telefono || 'No proporcionado';
    };

    return (
        <div className="p-m-3">
            <div className="card">
                <h5>Clientes proospectos</h5>
                <DataTable
                    value={compras}
                    rowGroupMode="subheader"
                    groupRowsBy="ebook"
                    sortMode="single"
                    sortField="ebook"
                    sortOrder={1}
                    scrollable
                    scrollHeight="400px"
                    responsiveLayout="scroll"
                >
                    <Column field="nombre" header="Nombre" style={{ minWidth: '200px' }}></Column>
                    <Column field="correo" header="Correo" style={{ minWidth: '200px' }}></Column>
                    <Column field="telefono" header="Teléfono" body={telefonoBodyTemplate} style={{ minWidth: '200px' }}></Column>
                    <Column field="ebook" header="eBook" style={{ minWidth: '200px' }}></Column>
                    <Column field="fechaCompra" header="Fecha de Compra" body={dateBodyTemplate} style={{ minWidth: '200px' }}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default ComprasEbookPage;
