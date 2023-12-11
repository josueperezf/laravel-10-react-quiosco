import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from '../components/Sidebar';
import { Resumen } from '../components/Resumen';
import { useQuiosco } from '../hooks/useQuiosco';
import { ModalProducto } from '../components/ModalProducto';
import { useAuth } from '../hooks/useAuth';


Modal.setAppElement('#root');
export const HomeLayout = () => {
  // con la siguiente linea descomentada lo que hacemos es,
  // preguntar si el usuario que trata de ingresar esta logueado,
  // si no lo es, entonces que lo lleve a la ruta de login. esa logica esta dentro del hook
  useAuth({middleware: 'auth'});

  
  
  const {modal, handleClickModal } = useQuiosco();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  return (
    <>
      <div className='md:flex'>
        <Sidebar/>
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
        <Resumen/>
      </div>

    
      <Modal
        isOpen={modal}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleClickModal}
      >
        <ModalProducto/>
      </Modal>

      {/* la siguiente linea solo registra el componente toast, para poderlo utilizar en otro lugar */}
      {/*  el toast que cargamos aqui, lo utilizamos en el archivo QuioscoProvider.ts */}
      <ToastContainer/>
      
    </>
  )
}
