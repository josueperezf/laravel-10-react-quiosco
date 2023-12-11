import { createContext, useEffect, useState } from 'react';
import { Categoria } from '../interfaces/Categoria.interface';
import { Producto } from '../interfaces/producto.interface';
import { Pedido } from '../interfaces/Pedido';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import clienteAxios from '../config/axios';



interface QuioscoData {
    categorias: Categoria[],
    categoriaSeleccionada: Categoria | null,
    modal: boolean,
    pedidos: Pedido[],
    producto: Producto | null,
    total: number,
    handleAgregarPedido: (pedido: Pedido) => void,
    handleClickCategoria: (id: number)=> void,
    handleClickCompletarPedido: (id: number)=> void,
    handleClickModal: () => void,
    handleClickProductoAgotado: (id: number)=> void,
    handleEditarCantidadEnElPedido: (id: number)=> void,
    handleEliminarProductoPedido: (id: number)=> void,
    handleSetProducto: (producto: Producto) => void,
    handleSubmitNuevaOrden: (logout: () => Promise<void>) => void,
}

const initialValue: QuioscoData = {
    categorias: [],
    categoriaSeleccionada: null,
    modal: false,
    pedidos: [],
    producto: null,
    total: 0,
    handleAgregarPedido: () => { },
    handleClickCategoria: () => { },
    handleClickCompletarPedido:  () => {},
    handleClickModal: () => { },
    handleClickProductoAgotado:  () => {},
    handleEditarCantidadEnElPedido: (): void => { },
    handleEliminarProductoPedido: (): void => { },
    handleSetProducto: () => { },
    handleSubmitNuevaOrden: (): void => { },
}
const QuioscoContext = createContext(initialValue);

export const QuioscoProvider = ({children}: { children: React.ReactNode }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null); // por default seleciona la cero
    const [producto, setProducto] = useState<Producto | null>(null);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const valorInicial = 0;
        const nuevoTotal = pedidos.reduce((totalLocal, prod)=> (prod.cantidad * prod.precio ) + totalLocal, valorInicial);
        setTotal(nuevoTotal);
    }, [pedidos]);

    useEffect(() => {
        obtenerCategorias();
    }, [])
    

    const obtenerCategorias = async () => {
        try {
            
            const {data} = await clienteAxios.get('/categorias');
            setCategorias(data.data);
            setCategoriaSeleccionada(data.data[0]);
            
        } catch (error) {
            console.log({error});
        }
    }
    

    const handleClickCategoria = (id: number) => {        
        const categoria = categorias.find((c)=> c.id === id) || null;
        setCategoriaSeleccionada(categoria);
    }

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = (producto: Producto) => {
        setProducto(producto);
    }

    // agrega o modifica un producto en un pedido
    const handleAgregarPedido = (pedido: Pedido) => {
        if (pedidos.some(p => p.id === producto?.id  ) ) {
            // editar del pedido
            const pedidoActualizado = pedidos.map((p) => p.id === producto?.id ? pedido : p );
            setPedidos(pedidoActualizado);
            toast.success(' Actualizado el producto en el listado de pedidos');
        } else {
            // agregar a pedido
            setPedidos([...pedidos, pedido]);
            toast.success('Agregado al listado de pedidos')
        }
    }

    const handleEditarCantidadEnElPedido = (id: number) => {
        const pedidoActualizar = pedidos.find(p => p.id === id);
        if (pedidoActualizar) {
            setProducto(pedidoActualizar);
            handleClickModal();
        }
    }

    const handleEliminarProductoPedido = (id: number) => {
        setPedidos([...pedidos.filter(p => p.id !== id) ]);
        toast.success('Producto eliminado del listado de pedidos');
    }

    // para enviar al backend el listado de pedidos
    const handleSubmitNuevaOrden = async (logout: () => Promise<void>) => {
        const token = localStorage.getItem('token');
        try {
            const {data} = await clienteAxios.post('/pedidos', {
                total,
                productos: pedidos.map(p => ({id: p.id, cantidad: p.cantidad}) ) // es que el profesor volvio un arroz con mango eso de los nombres pedidos es un array donde cada item tiene el id del producto y cantidad que quieren de ese articulo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
            // despues de un segundo limpiamos el array de pedidos
            setTimeout(() => {
                setPedidos([]);
            }, 1000);
            // si ya el usuario compró, entonces le cerramos sesin

            setTimeout(() => {
                logout();
            }, 3000);
        } catch (error) {
            
        }
    }


    // 
    const handleClickCompletarPedido = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await clienteAxios.put(`/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
            
        }   
    }

    // ejemplo ya no hay pan de hamburguesas asi que no se puede vender mas
    const handleClickProductoAgotado = async (id: number) => {

        const token = localStorage.getItem('token');
        try {
            await clienteAxios.put(`/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert('Se sacará el producto de la lista, refresque la pagina o espere unos segundos mientras sale de la lista solo');
        } catch (error) {
            console.log(error);
            
        }   
    }


    return (
        <QuioscoContext.Provider value={{ 
            categorias,
            categoriaSeleccionada,
            modal,
            pedidos,
            producto,
            total,
            handleAgregarPedido,
            handleClickCategoria,
            handleClickCompletarPedido,
            handleClickModal,
            handleClickProductoAgotado,
            handleEditarCantidadEnElPedido,
            handleEliminarProductoPedido,
            handleSetProducto,
            handleSubmitNuevaOrden,
        }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export default QuioscoContext;