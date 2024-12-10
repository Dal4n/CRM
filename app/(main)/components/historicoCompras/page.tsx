'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CompraService } from './compraService'; // Asegúrate de la ruta correcta
import { Compra, DetalleCompra } from './compraService';

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await CompraService.getCompras();
        setCompras(data);
      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    };

    fetchCompras();
  }, []);

  // Template para mostrar los detalles de la compra
  const detallesCompraTemplate = (rowData: Compra) => {
    if (!rowData.detallesCompra || rowData.detallesCompra.length === 0) {
      return <span>No hay detalles disponibles</span>;
    }

    return (
      <ul>
        {rowData.detallesCompra.map((detalle: DetalleCompra) => (
          <li key={detalle.idDetalleCompra}>
            {`${detalle.producto.nombre} (Cantidad: ${detalle.cantidad}, Subtotal: $${detalle.subtotal.toFixed(2)})`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-m-3">
      <h2>Compras</h2>
      <DataTable value={compras} responsiveLayout="scroll" scrollable scrollHeight="400px">
        <Column field="idCompra" header="ID Compra" style={{ minWidth: '100px' }}></Column>
        <Column
          field="proveedor.nombre"
          header="Nombre del Proveedor"
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          field="fechaCompra"
          header="Fecha de Compra"
          style={{ minWidth: '150px' }}
          body={(rowData) => new Date(rowData.fechaCompra).toLocaleDateString()}
        ></Column>
        <Column
          field="detallesCompra"
          header="Producto"
          body={(rowData) => {
            if (rowData.detallesCompra && rowData.detallesCompra.length > 0) {
              return rowData.detallesCompra.map((detalle: DetalleCompra) => detalle.producto.nombre).join(', ');
            } else {
              return 'No disponible';
            }
          }}
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          field="detallesCompra"
          header="Detalles de Compra"
          body={detallesCompraTemplate}
          style={{ minWidth: '300px' }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ComprasPage;
