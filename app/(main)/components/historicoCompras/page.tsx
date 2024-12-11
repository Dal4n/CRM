"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { CompraService } from "./compraService"; // Asegúrate de la ruta correcta
import { Compra, DetalleCompra } from "./compraService";

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await CompraService.getCompras();
        setCompras(data);
      } catch (error) {
        console.error("Error al cargar las compras:", error);
      }
    };

    fetchCompras();
  }, []);

  // Manejar la apertura del modal
  const openModal = (compra: Compra) => {
    setSelectedCompra(compra);
    setModalVisible(true);
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    setSelectedCompra(null);
    setModalVisible(false);
  };

  return (
    <div className="card p-m-4">
      <h5 className="text-start mb-4">Compras</h5>
      <div className="flex">
        {compras.map((compra) => (
          <div
            key={compra.idCompra}
            className="col-12 md:col-4 lg:col-4 mb-3"
            onClick={() => openModal(compra)}
          >
            <div className="card p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer hoverable">
              <div className="flex align-items-center mb-2">
                <i
                  className="pi pi-shopping-cart mr-2"
                  style={{ fontSize: "2rem", color: "#9B673A" }}
                ></i>
                <h5 className="m-0">Compra #{compra.idCompra}</h5>
              </div>
              <p>
                <strong>Proveedor:</strong> {compra.proveedor.nombre}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(compra.fechaCompra).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar los detalles */}
      <Dialog
        header="Detalles de la Compra"
        visible={isModalVisible}
        style={{ width: "50vw" }}
        onHide={closeModal}
      >
        {selectedCompra && (
          <div>
            <p>
              <strong>ID Compra:</strong> {selectedCompra.idCompra}
            </p>
            <p>
              <strong>Proveedor:</strong> {selectedCompra.proveedor.nombre}
            </p>
            <p>
              <strong>Fecha:</strong> {new Date(selectedCompra.fechaCompra).toLocaleDateString()}
            </p>

            <h4>Detalles:</h4>
            <ul className="list-none pl-0">
              {selectedCompra.detallesCompra && selectedCompra.detallesCompra.length > 0 ? (
                selectedCompra.detallesCompra.map((detalle: DetalleCompra) => (
                  <li key={detalle.idDetalleCompra} className="mb-3">
                    <div className="p-3 card">
                      <h6>
                        <strong>{detalle.producto.nombre}</strong>
                      </h6>
                      <p>
                        <strong>Cantidad:</strong> {detalle.cantidad}
                      </p>
                      <p>
                        <strong>Subtotal:</strong> ${detalle.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li>No hay detalles disponibles</li>
              )}
            </ul>
          </div>
        )}
      </Dialog>

      <style jsx>{`
        .hoverable {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: 1px solid #e3bd8e;
        }

        .hoverable:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .list-none {
          list-style: none;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ComprasPage;