import React, { useState, useEffect } from 'react';
import DistribucionGrafica from './DistribucionGrafica';

const Tablero = ({
                     filas,
                     columnas,
                     numeroBolas,
                     velocidad,
                 }: {
    filas: number;
    columnas: number;
    numeroBolas: number;
    velocidad: number;
}) => {
    // Estado para las posiciones de las bolas
    const [bolas, setBolas] = useState<{ x: number; y: number }[]>([]);
    // Estado para la acumulación final
    const [finalizadas, setFinalizadas] = useState<number[]>(new Array(columnas).fill(0));

    // Validación de dimensiones del tablero
    if (filas < 3 || columnas < 3) {
        return (
            <div className="p-6 bg-red-100 text-red-600 rounded-lg">
                <p>El tablero debe tener al menos 3 filas y 3 columnas.</p>
            </div>
        );
    }

    // Generar bolas iniciales
    useEffect(() => {
        const inicialBolas = Array.from({ length: numeroBolas }, () => ({
            x: Math.floor(Math.random() * columnas), // Posición inicial aleatoria
            y: 0, // Todas comienzan en la parte superior
        }));
        setBolas(inicialBolas);
    }, [numeroBolas, columnas]);

    // Movimiento de las bolas
    useEffect(() => {
        const intervalo = setInterval(() => {
            setBolas((prevBolas) =>
                prevBolas
                    .map((bola) => {
                        if (bola.y >= filas - 1) {
                            // Si llega al final, acumula y elimina la bola
                            setFinalizadas((prev) => {
                                const nuevaFinal = [...prev];
                                nuevaFinal[bola.x]++;
                                return nuevaFinal;
                            });
                            return null;
                        }
                        // Desviación aleatoria de la bola
                        const desviacion = Math.random() > 0.5 ? 1 : -1;
                        return {
                            x: Math.max(0, Math.min(columnas - 1, bola.x + desviacion)), // Limitar dentro de los bordes
                            y: bola.y + 1,
                        };
                    })
                    .filter(Boolean) as { x: number; y: number }[] // Eliminar bolas finalizadas
            );
        }, 1000 / velocidad);

        return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
    }, [filas, columnas, velocidad]);

    return (
        <div className="relative bg-gray-200 rounded-lg shadow-md p-4">
            {/* Tablero con pines */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}>
                {Array.from({ length: filas }).map((_, filaIndex) => (
                    <div key={filaIndex} className="flex justify-between">
                        {Array.from({ length: columnas }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className={`w-3 h-3 ${
                                    filaIndex % 2 === 0 && colIndex % 2 === 0 ? 'bg-gray-700' : 'bg-transparent'
                                } rounded-full`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bolas en movimiento */}
            {bolas.map((bola, index) => (
                <div
                    key={index}
                    className="absolute w-4 h-4 bg-blue-500 rounded-full"
                    style={{
                        top: `${(bola.y / filas) * 100}%`,
                        left: `${(bola.x / columnas) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>
            ))}

            {/* Mostrar gráfico dinámico */}
            <DistribucionGrafica datos={finalizadas} />
        </div>
    );
};

export default Tablero;
