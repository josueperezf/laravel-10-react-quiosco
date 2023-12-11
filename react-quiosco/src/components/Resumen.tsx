import { formatearDinero } from "../helpers";
import { useAuth } from "../hooks/useAuth";
import { useQuiosco } from "../hooks/useQuiosco"
import { ResumenPedido } from "./ResumenPedido";

export const Resumen = () => {
  const {pedidos, total, handleSubmitNuevaOrden} = useQuiosco();
  const {logout} = useAuth({});
  const hayPedidos = (): boolean => pedidos.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  }
  
  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black"> Mi pedido</h1>

      <p className="text-lg my-5">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>

      <div className="py-10">
        {
          (!hayPedidos())
            ? (<p className="text-center text-2xl">No hay elementos en tu pedido aun</p>)
            : (
              pedidos.map((p)=> (<ResumenPedido key={p.id} pedido={p} /> ) )
            )
        }
      </div>


      {
        hayPedidos() && (
          <>
            <p className="text-xl mt-10" >
              Total: { formatearDinero(total) }
            </p>
            <form
              className="w-full"
              onSubmit={handleSubmit}
            >
              <div className="mt-5">
                <button
                  type="submit"
                  className={`${ !hayPedidos() 
                    ? 'bg-indigo-100'
                    : 'bg-indigo-600 hover:bg-indigo-800' }
                    px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
                  disabled={!hayPedidos()}
                  >
                  Confirmar pedido
                </button>
              </div>
            </form>
          </>
          )
      }
    </aside>
  )
}
