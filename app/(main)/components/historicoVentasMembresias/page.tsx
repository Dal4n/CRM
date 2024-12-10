'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Compra, ventaService } from './ventasMembresiasService'; // Verifica que la ruta sea correcta

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await ventaService.getVentas();
        setCompras(data);
      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    };

    fetchCompras();
  }, []);

  // Template para mostrar los detalles de la compra (información de la persona)
  const detallesCompraTemplate = (rowData: Compra) => {
    return (
      <div>
        <p><strong>Nombre:</strong> {`${rowData.persona.nombre} ${rowData.persona.apellidoPaterno} ${rowData.persona.apellidoMaterno}`}</p>
        <p><strong>Fecha de Nacimiento:</strong> {new Date(rowData.persona.fechaNacimiento).toLocaleDateString()}</p>
        <p><strong>Teléfono:</strong> {rowData.persona.telefono}</p>
        <p><strong>Email:</strong> {rowData.persona.email}</p>
        <p><strong>Sexo:</strong> {rowData.persona.sexo}</p>
      </div>
    );
  };

  return (
    <div className="p-m-3">
      <h2>Ventas de Membresías</h2>
      <DataTable value={compras} responsiveLayout="scroll" scrollable scrollHeight="400px">
        <Column field="id" header="ID Compra" style={{ minWidth: '100px' }}></Column>
        <Column
          field="persona.nombre"
          header="Nombre del Comprador"
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          field="fechaVenta"
          header="Fecha de Venta"
          style={{ minWidth: '150px' }}
          body={(rowData) => new Date(rowData.fechaVenta).toLocaleDateString()}
        ></Column>
        <Column
          field="membresiaId"
          header="ID de Membresía"
          style={{ minWidth: '100px' }}
        ></Column>
        <Column
          header="Detalles del Comprador"
          body={detallesCompraTemplate}
          style={{ minWidth: '300px' }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ComprasPage;
