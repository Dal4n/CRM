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
        <Card className="p-card">
            <h5>Comentarios y/o sugerencias</h5>
            < div className="col-12" >
                <div className="grid">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id} className="col-12 mb-4">
                            <Card title={comentario.nombre} subTitle={<Rating value={comentario.rating} readOnly />} className="p-card-hover">
                                <hr />
                                <p><strong>Comentario:</strong> {comentario.mensaje}</p>
                                <p><strong>Correo:</strong> {comentario.correo}</p>
                                <p><strong>Fecha:</strong> {new Date(comentario.fechaCreacion).toLocaleString()}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div >
        </Card >
    );
};

export default ComentariosPage;
