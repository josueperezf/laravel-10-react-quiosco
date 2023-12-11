//import { categorias } from '../data/categorias';
import { useAuth } from "../hooks/useAuth";
import { useQuiosco } from "../hooks/useQuiosco"
import { Categoria  as CategoriaInterface} from "../interfaces/Categoria.interface";
import { Categoria } from "./Categoria";


export const Sidebar = () => {
  const {categorias} = useQuiosco();
  // el middleware es solo para saber si quiero que el usuario este autenticado con 'auth', o no lo este con 'guest'
  const {logout, user} = useAuth({middleware: 'auth'});

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img
          className="w-40"
          src="img/logo.svg"
        />
      </div>
      {
        user && 
        <p className="my-10 text-xl text-center" >Hola {user.name}</p>
      }

      <div className="mt-10">
        {categorias.map((categoria: CategoriaInterface) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ) )}
      </div>

      <div className="my-5 px-5">
        <button
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cancelar orden y salir
        </button>
      </div>

    </aside>
  )
}
