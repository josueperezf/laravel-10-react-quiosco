import useSWR from 'swr';
import { useQuiosco } from "../hooks/useQuiosco";
import clienteAxios from '../config/axios';
import { Producto as ProductoInterce } from '../interfaces/producto.interface';
import { Producto } from '../components/Producto';


export const Inicio = () => {
  const {categoriaSeleccionada} = useQuiosco();

  // inicio consulta http con SWR. SIENTO QUE SWR Hace demasiadas peticiones sin necesidad, siento que react query es mucho mejor
  const fetcher = () => clienteAxios.get('/productos', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then((d) => {
    return d.data.data;
    
  });
  const { data, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 2000 // cuando tiempo dura la data vigente, es decir, despues de que tiempo pasa a ser obsoleta y si el usuario la consulta debe hacer otra peticion http para actualizarla
  });
  if (isLoading) return <p>Cargando...</p>;

  
  

  // fin consulta http con SWR
  // como categoriaSeleccionada cambia, entonces redibuja todo este componente, entonces podemos hacer la siguiente linea sin un useEffect
  const productos = data.filter((p: ProductoInterce)=> p.categoria_id == categoriaSeleccionada?.id) || [];
  
  return (
    <>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {
          productos.map((producto: ProductoInterce) => (
            <Producto key={producto.id} producto={producto} botonAgregar={true}  />
          ) )
        }
      </div>
    </>
  )
}
