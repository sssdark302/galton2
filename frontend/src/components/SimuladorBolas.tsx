import React, { useState, useEffect } from 'react';

interface Bola {
    id: number;
    posicionX: number;
    posicionY: number;
}

const SimuladorBolas = ({ numeroBolas, velocidad }: { numeroBolas: number; velocidad: number }) => {
    const [bolas, setBolas] = useState<Bola[]>([]);

    useEffect(() => {
        // Generar bolas iniciales
        const nuevasBolas = Array.from({ length: numeroBolas }, (_, i) => ({
            id: i,
            posicionX: Math.random() * 100, // Posición aleatoria horizontal
            posicionY: 0, // Todas las bolas empiezan arriba
        }));
        setBolas(nuevasBolas);
    }, [numeroBolas]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBolas((prevBolas) =>
                prevBolas.map((bola) => ({
                    ...bola,
                    posicionY: bola.posicionY + velocidad, // Incrementar la posición Y según la velocidad
                }))
            );
        }, 100);

        return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonta el componente
    }, [velocidad]);

    return (
        <div className="relative bg-white rounded-lg shadow-md p-6 h-96 overflow-hidden">
            <h2 className="text-lg font-bold mb-4">Simulador de Bolas</h2>
            <div className="relative w-full h-full bg-gray-300">
                {bolas.map((bola) => (
                    <div
                        key={bola.id}
                        className="absolute w-4 h-4 bg-blue-500 rounded-full"
                        style={{
                            left: `${bola.posicionX}%`,
                            top: `${bola.posicionY}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SimuladorBolas;
