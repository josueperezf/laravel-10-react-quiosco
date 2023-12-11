import useSWR from 'swr';
import clienteAxios from '../config/axios';
import { Producto } from '../components/Producto';
import { Producto as ProductoInterce} from '../interfaces/producto.interface';

export const Productos = () => {
  const token = localStorage.getItem('token');
  const fetcher = () => clienteAxios.get('/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((datos) => datos.data);
  
  const { data, error, isLoading } = useSWR('/productos', fetcher);
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  console.log(data);
  
  return (
    <div>
      <h1 className="text-4xl font-black" > Productos</h1>
      <p className="text-2xl my-10">
        Maneja la disponiblidad de prodcutos desde aqui
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {
          data.data.map((producto: ProductoInterce) => (
            <Producto key={producto.id} producto={producto}  botonDisponible={true} />
          ) )
        }
      </div>
    </div>
  )
}
