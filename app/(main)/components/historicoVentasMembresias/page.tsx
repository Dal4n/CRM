"use client";
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Compra, ventaService } from './ventasMembresiasService'; // Verifica que la ruta sea correcta

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const openModal = (compra: Compra) => {
    setSelectedCompra(compra);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCompra(null);
    setModalVisible(false);
  };

  return (
    <div className="card p-m-4">
      <h5 className="text-start mb-4">Ventas de Membresías</h5>
      <div className="flex">
        {compras.map((compra) => (
          <div
            className="col-12 md:col-4 lg:col-4 mb-3"
            key={compra.id}
            onClick={() => openModal(compra)}
          >
            <div className="card p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer hoverable">
              <div className="flex align-items-center mb-2">
                <i className="pi pi-id-card text-primary text-2xl mr-2"></i>
                <h5 className="m-0">{`${compra.persona.nombre} ${compra.persona.apellidoPaterno}`}</h5>
              </div>

              <p><strong>ID Membresía:</strong> {compra.membresiaId}</p>
              <p><strong>Fecha de Venta:</strong> {new Date(compra.fechaVenta).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        header="Detalles del Comprador"
        visible={isModalVisible}
        style={{ width: '50vw' }}
        onHide={closeModal}
      >
        {selectedCompra && (
          <div>
            <h3 className="text-primary">
              {`${selectedCompra.persona.nombre} ${selectedCompra.persona.apellidoPaterno} ${selectedCompra.persona.apellidoMaterno}`}
            </h3>
            <p><strong>Fecha de Nacimiento:</strong> {new Date(selectedCompra.persona.fechaNacimiento).toLocaleDateString()}</p>
            <p><strong>Teléfono:</strong> {selectedCompra.persona.telefono}</p>
            <p><strong>Email:</strong> {selectedCompra.persona.email}</p>
            <p><strong>Sexo:</strong> {selectedCompra.persona.sexo}</p>
          </div>
        )}
      </Dialog>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .hoverable {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: 1px solid blue;
        }

        .hoverable:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ComprasPage;
