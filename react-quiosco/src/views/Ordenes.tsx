import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { formatearDinero } from '../helpers';
import { useQuiosco } from '../hooks/useQuiosco';

// Ordenes y array de pedidos es lo mismo,
// solo que el profe en unos lados lo llama de una forma y en otros lugares lo llama de otra
export const Ordenes = () => {

  const {handleClickCompletarPedido} = useQuiosco();
  const token = localStorage.getItem('token');
  const fetcher = () => clienteAxios.get('/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const {data, error, isLoading} = useSWR('/pedidos', fetcher);
  if (isLoading) {
    <h3>Cargando...</h3>
  }

  const onCompletar = (id: number) => {
    handleClickCompletarPedido(id);
  }
  

  return (
    <div>
      <h1 className="text-4xl font-black" > Ordenes</h1>
      <p className="text-2xl my-10">
        Administra las ordenes desde aqui
      </p>

      <div className='grid grid-cols-2 gap-5'>
        {
          data?.data?.data.map((p: any)=> (
            <div key={p.id} className='p-5 bg-white shadow space-y-2 border-b'>
              <p className='text-xl font-bold text-slate-600'>
                Contenido del pedido
              </p>

              {
                p.productos.map((prod: any)=> (
                  <div
                    key={prod.id}
                    className='border-b border-b-slate-200 last-of-type:border-none py-4'
                  >
                    <p className='text-sm'>ID: {prod.id}</p>
                    <p className='text-sm'>{prod.nombre}</p>
                    <p> Cantidad 
                      <span>{prod.pivot.cantidad}</span>
                    </p>
                  </div>
                ))
              }

              <p className='text-lg font-bold text-slate-600'>
                Cliente: <span className='font-normal'> {p.user.name}</span>
              </p>
              <p className='text-lg font-bold text-amber-600'>
                Total a pagar: <span className='font-normal text-slate-500'> {formatearDinero(p.total)}</span>
              </p>

              <button
                type="submit"
                className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full'
                onClick={ ()=> onCompletar(p.id)}
              >
                Copletar
              </button>

            </div>
          ))
        }
      </div>
    </div>
  )
}
