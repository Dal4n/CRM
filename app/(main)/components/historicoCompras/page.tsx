'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Compra, CompraService } from './compraService'; // Asegúrate de la ruta correcta

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
    return (
      <ul>
        {rowData.productoProveedor.producto && (
          <li key={rowData.productoProveedor.idProductoProveedor}>
            {`${rowData.productoProveedor.producto.nombre} (Cantidad: ${rowData.cantidad}, Subtotal: $${rowData.totalCompra})`}
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="p-m-3">
      <h2>Compras</h2>
      <DataTable value={compras} responsiveLayout="scroll" scrollable scrollHeight="400px">
        <Column field="idCompra" header="ID Compra" style={{ minWidth: '100px' }}></Column>
        <Column
          field="nombre"
          header="Nombre"
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          field="fechaCompra"
          header="Fecha de Compra"
          style={{ minWidth: '150px' }}
          body={(rowData) => new Date(rowData.fechaCompra).toLocaleDateString()}
        ></Column>
        <Column
          field="productoProveedor.producto.nombre"
          header="Producto"
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          field="cantidad"
          header="Cantidad"
          style={{ minWidth: '100px' }}
        ></Column>
        <Column
          field="totalCompra"
          header="Total de Compra"
          style={{ minWidth: '150px' }}
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
