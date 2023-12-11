import { formatearDinero } from "../helpers";
import { useState, useEffect } from 'react';
import { useQuiosco } from "../hooks/useQuiosco";


// fuente de los iconos https://heroicons.com/
export const ModalProducto = () => {
    const {producto, pedidos, handleClickModal, handleAgregarPedido } = useQuiosco();
    const [cantidad, setCantidad] = useState<number>(1);
    const [edicion, setEdicion] = useState<boolean>(false);


    // lo utilizamos para detectar si el producto que se trata de agregar a pedidos ya esta en el array de pedidos
    useEffect(() => {
        // some  hace como una busqueda retorna boolean
        if (pedidos.some(p => p.id === producto?.id  ) ) {
            
            const pedidoActual = pedidos.find((p) => p.id === producto?.id );
            setCantidad(pedidoActual?.cantidad || 1);
            setEdicion(true);
        }
        
    }, [pedidos]);
    

    const incrementar = () => {
        if (cantidad >= 5) return;
        setCantidad(cantidad+1);
    }

    const decrementar = () => {
        if (cantidad <= 1) return;
        setCantidad(cantidad-1);
    }

    const onAgregarAPedido = () => {
        handleAgregarPedido({...producto!, cantidad});
        handleClickModal()
    }
    
    return (
        <div className="md:flex gap-10 items-center">
            <div className="md:w-1/3">
                <img
                    alt={`Imagen producto ${producto?.nombre}`}
                    src={`/img/${producto?.imagen}.jpg`}
                />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button
                        onClick={handleClickModal}
                    >
                        {/* icono buscamos en heroicons, y pegamos el que alli nos ofrece en formato jsx */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                </div>

                <h1 className="text-3xl font-bold mt-5">
                    { producto?.nombre }
                </h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    { formatearDinero(producto?.precio || 0) }
                </p>

                {/* seccion para agregar o disminuir cantidad de */}

                <div className="flex gap-4 mt-5">
                    <button
                        onClick={decrementar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                    <p className="text-3xl" >{cantidad}</p>

                    <button
                        type="button"
                        onClick={incrementar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                </div>

                <button
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    onClick={onAgregarAPedido}
                >
                    {
                        edicion ? 'Guardar Cambios' : 'Añadir al pedido'
                    }
                    
                </button>

            </div>
        </div>
    )
}
