import { formatearDinero } from "../helpers";
import { useQuiosco } from "../hooks/useQuiosco";
import { Producto as ProductoInterface } from "../interfaces/producto.interface"

interface Props {
    producto: ProductoInterface,
    botonAgregar?: boolean,
    botonDisponible?: boolean
}
export const Producto = ({producto, botonAgregar = false, botonDisponible = false}: Props) => {
    const {handleClickModal, handleSetProducto, handleClickProductoAgotado} = useQuiosco();
    const { nombre, imagen, precio, id } = producto;

    const onAgregar = () => {
        handleClickModal();
        handleSetProducto(producto);
    }

    return (
        <div className="border p-3 shadow bg-white">
            <img
                alt={`Imagen ${nombre}`}
                className="w-full"
                src={`/img/${imagen}.jpg`}
            />
            <div className="p-5">
                <h3 className="text-2xl  font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    { formatearDinero(precio)}
                </p>
                {
                    botonAgregar && 
                        <button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold shadow-md rounded-md"
                            onClick={onAgregar}
                        >
                            Agregar
                        </button>
                }

                {
                    botonDisponible && 
                        <button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold shadow-md rounded-md"
                            onClick={()=>handleClickProductoAgotado(id)}
                        >
                            Marcar como Producto agotado
                        </button>
                }


            </div>
        </div>
    )
}
