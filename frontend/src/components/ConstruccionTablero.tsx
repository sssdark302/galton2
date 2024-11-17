import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ConstruccionTablero = () => {
    const [filas, setFilas] = useState(5);
    const [columnas, setColumnas] = useState(5);
    const [tablero, setTablero] = useState<number[][]>([]);

    const construirTablero = () => {
        const nuevoTablero = Array.from({ length: filas }, () =>
            Array(columnas).fill(0)
        );
        setTablero(nuevoTablero);
    };

    return (
        <motion.div
            className="p-6 bg-gray-100 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -50 }} // Estado inicial (antes de renderizar)
            animate={{ opacity: 1, y: 0 }}   // Animación al renderizar
            exit={{ opacity: 0, y: 50 }}     // Animación al desmontarse
            transition={{ duration: 0.5 }}   // Duración de la transición
        >
            <h2 className="text-lg font-bold mb-4">Construcción del Tablero</h2>
            <div className="mb-3">
                <label htmlFor="filas" className="block mb-1">Número de filas:</label>
                <input
                    type="number"
                    id="filas"
                    name="filas"
                    value={filas}
                    onChange={(e) => setFilas(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="columnas" className="block mb-1">Número de columnas:</label>
                <input
                    type="number"
                    id="columnas"
                    name="columnas"
                    value={columnas}
                    onChange={(e) => setColumnas(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={construirTablero}
            >
                Construir Tablero
            </button>
            {tablero.length > 0 && (
                <div className={`mt-6 grid gap-2`} style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}>
                    {tablero.map((fila, i) =>
                        fila.map((_, j) => (
                            <div
                                key={`${i}-${j}`}
                                className="w-6 h-6 bg-gray-300 border rounded"
                            ></div>
                        ))
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ConstruccionTablero;
