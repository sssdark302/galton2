import React, { useState } from 'react';

const ConfiguracionTaller = ({ onGuardarConfiguracion }: { onGuardarConfiguracion: (config: any) => void }) => {
    const [parametros, setParametros] = useState({
        numeroBolas: 10,
        velocidad: 1,
        filas: 5,
        columnas: 5,
    });

    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    const validarCampos = () => {
        const nuevosErrores: { [key: string]: string } = {};
        if (parametros.numeroBolas <= 0) nuevosErrores.numeroBolas = 'Debe haber al menos 1 bola.';
        if (parametros.velocidad <= 0) nuevosErrores.velocidad = 'La velocidad debe ser mayor a 0.';
        if (parametros.filas < 3 || parametros.filas > 20) nuevosErrores.filas = 'El número de filas debe estar entre 3 y 20.';
        if (parametros.columnas < 3 || parametros.columnas > 20) nuevosErrores.columnas = 'El número de columnas debe estar entre 3 y 20.';
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParametros((prev) => ({
            ...prev,
            [name]: parseInt(value, 10),
        }));
    };

    const guardarConfiguracion = () => {
        if (validarCampos()) {
            onGuardarConfiguracion(parametros);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Configuración del Taller</h2>
            <div className="mb-3">
                <label htmlFor="numeroBolas" className="block mb-1">Número de bolas:</label>
                <input
                    type="number"
                    id="numeroBolas"
                    name="numeroBolas"
                    value={parametros.numeroBolas}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                {errores.numeroBolas && <p className="text-red-500 text-sm">{errores.numeroBolas}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="velocidad" className="block mb-1">Velocidad:</label>
                <input
                    type="number"
                    id="velocidad"
                    name="velocidad"
                    value={parametros.velocidad}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                {errores.velocidad && <p className="text-red-500 text-sm">{errores.velocidad}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="filas" className="block mb-1">Número de filas:</label>
                <input
                    type="number"
                    id="filas"
                    name="filas"
                    value={parametros.filas}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                {errores.filas && <p className="text-red-500 text-sm">{errores.filas}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="columnas" className="block mb-1">Número de columnas:</label>
                <input
                    type="number"
                    id="columnas"
                    name="columnas"
                    value={parametros.columnas}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                {errores.columnas && <p className="text-red-500 text-sm">{errores.columnas}</p>}
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={guardarConfiguracion}
            >
                Guardar configuración
            </button>
        </div>
    );
};

export default ConfiguracionTaller;
