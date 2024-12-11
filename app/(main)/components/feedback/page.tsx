'use client';

import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Comentario, ComentariosService } from './feedbackService';

const ComentariosPage = () => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    // Función para obtener los comentarios
    const fetchComentarios = async () => {
        try {
            const data = await ComentariosService.getComentarios();
            setComentarios(data);
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    useEffect(() => {
        fetchComentarios();
    }, []);

    return (
        <Card className="card p-m-4">
            <h5>Comentarios y/o sugerencias</h5>
            < div className="col-12" >
                <div className="grid">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id} className="col-12 mb-3">
                            <div className="p-card hoverable p-3">
                                <h4 style={{ color: 'goldenrod ' }}>{comentario.nombre}</h4>
                                {/* <Rating value={comentario.rating} readOnly className="mb-2" style={{ color: 'gold' }} /> */}
                                <div className="stars">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} style={{color: index < comentario.rating ? 'gold' : 'gray' }}>
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <hr />
                                <p><strong>Comentario:</strong> {comentario.mensaje}</p>
                                <p><strong>Correo:</strong> {comentario.correo}</p>
                                <p><strong>Fecha:</strong> {new Date(comentario.fechaCreacion).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <style jsx>{`
        .hoverable {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: 1px solid gold ;
        }

        .hoverable:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
            </div >
        </Card >
    );
};

export default ComentariosPage;
