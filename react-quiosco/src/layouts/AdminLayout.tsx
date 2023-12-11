import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

export const AdminLayout = () => {
  // con la siguiente linea descomentada lo que hacemos es,
  // preguntar si el usuario que trata de ingresar es administrador,
  // si no lo es, entonces que lo lleve a la ruta raiz del proyecto
  useAuth({middleware: 'admin'});

  return (
    <div className='md:flex'>
        <AdminSidebar/>
        {
          /*
          para que quede fijo el sidebar y el resumen debo hacer:
          1. que el main ocupe todo el alto de la pantalla con h-screen
          2. debo tambien habilitar el scroll con overflow-y-scroll
          
          al colocar esto en una se las secciones, las demas se ajustan
          */
        }
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet/>
        </main>
      </div>
  )
}
