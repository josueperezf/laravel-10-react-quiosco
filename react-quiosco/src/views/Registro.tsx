import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export const Registro = () => {
    // el middleware puede ser 'auth'  para decir que este componente es solo para usuarios logueado, y 'guest' para decir que es para usuarios no logueados
    const { registro } = useAuth({middleware: 'guest', url: '/'});

    // los ref es para leer mas rapido los inputs
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const passwordConfirmationRef = createRef<HTMLInputElement>();

    // para los errores
    const [errores, setErrores] = useState([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datos = {
            name: nameRef.current?.value || '',
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            password_confirmation: passwordConfirmationRef.current?.value || '',
        }
        registro({datos, setErrores})
        
    }

  return (
    <>

        <h1 className="text-4xl font-black" >Crea tu cuenta</h1>
        <p> Crea tu cuenta llenando el formulario</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form method='post' onSubmit={handleSubmit} noValidate >
                {
                    errores
                        ? errores.map((e)=> <Alerta key={e}> {e}</Alerta> )
                        : null
                }
                <div className="mb-4">
                    <label htmlFor="name" className="text-slate-800" >Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Tu nombre"
                        ref={nameRef}
                    />
                </div>

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

                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="text-slate-800 " >Repetir Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50"
                        placeholder="Repetir Password"
                        ref={passwordConfirmationRef}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
        <nav className="mt-5">
          <Link to={'/auth/login'}>
            ¿Ya tienes cuenta? Inicia sesion
          </Link>
        </nav>
    </>
  )
}
