import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {

    const {login} = useAuth({
        middleware: 'guest',
        url: '/' // es la url a donde queremos que lo redireccione despues de loguearse, para este ejemplo a la ruta raiz del sistema
    });
    // los ref es para leer mas rapido los inputs
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    // para los errores
    const [errores, setErrores] = useState([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datos = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        }
        login({datos, setErrores});
        
        
    }


  return (
    <>

        <h1 className="text-4xl font-black" >Iniciar sesion</h1>
        <p> Para crear pedido debe iniciar sesion</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form method='post' onSubmit={handleSubmit} noValidate>
                {
                    errores
                        ? errores.map((e)=> <Alerta key={e}> {e}</Alerta> )
                        : null
                }
                <div className="mb-4">
                    <label htmlFor="email" className="text-slate-800 " >Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu email"
                        ref={emailRef}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="text-slate-800 " >Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu Password"
                        ref={passwordRef}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                >
                    Iniciar sesion
                </button>
            </form>
        </div>
        <nav className="mt-5">
          <Link to={'/auth/registro'}>
            No tienes cuenta? Crea una
          </Link>
        </nav>
    </>
  )
}
