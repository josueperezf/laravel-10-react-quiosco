import clienteAxios from "../config/axios";
import { LoginInterface } from '../interfaces/Login';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { RegistroInterface } from "../interfaces/Registro";

interface LoginProps {
 datos: LoginInterface,
 setErrores:React.Dispatch<React.SetStateAction<never[]>>
}

interface RegistroProps {
    datos: RegistroInterface,
    setErrores:React.Dispatch<React.SetStateAction<never[]>>
   }

// middleware => es la pagina a donde estoy, guest es para referirno a una pagina publica
// url => hace referencia a donde se moveria el usuario si se loguea
export const useAuth = ({middleware, url}: {middleware?: 'guest' | 'auth' | 'admin', url?:string}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // mutate => sirve para que revalide o haga otra peticion http para confirmar que realmente trajo la data
    // PARA MI DEBO ELIMINAR TODO ESTO DE useSWR, HACE PETICIONES CADA CIERTO TIEMPO Y SIN NECESIDAD. ESTORBA MAS DE LO QUE AYUDA
    const {data:user, error, mutate} = useSWR('/user', () => 
        clienteAxios.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => resp.data )
        .catch((e)=> {

            throw Error(e?.response?.data?.errors)
        } )
    );

    useEffect(() => {
      // guest usuario invitado
      if (middleware === 'guest' && url && user) {
        navigate(url)
      }

      // en lo siguiente entrara un usuario de tipo administrador cuando se loguea
      if (middleware === 'guest' && user && user.admin) {
        navigate('/admin')
      }

      // si un usuario que no es administrador trata de ingresar a una seccion de administrador, entonces lo movemos a la ruta raiz del proyecto
      if (middleware === 'admin' && user && !user.admin) {
        navigate('/');
      }

      if (middleware === 'auth' && error) {
        navigate('/auth/login')
      }

    }, [user, error])
    


    const login = async ({datos, setErrores }: LoginProps) => {
        try {
            const {data} = await clienteAxios.post('/login', datos);
            localStorage.setItem('token', data.token);
            setErrores([]);
            // la siguiente linea lo que hace es ir a buscar la data del usuario mas rapido, esto es parte de useSWR
            await mutate();
            
        } catch (error: any) {
            // con esta guardo el campo y su array de errores
            // setErrores(error.response.data.errors);
            // con este guardo solo el array y no se de que campo es ese error, feo pero asi lo dejo el profesor
            setErrores(Object.values(error.response.data.errors));
            
        }
    }
    const logout = async () => {
        try {
            await clienteAxios.post('/logout', null , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            await mutate(undefined); // con este sistema, esta linea es obligatoria, si no se queda en loop infinito
        } catch (e: any) {
            throw Error(e?.response?.data?.errors);
        }
        
    }
    const registro = async ({datos, setErrores}: RegistroProps) => {
        try {
            const {data} = await clienteAxios.post('/registro', datos);
            localStorage.setItem('token', data.token);
            setErrores([]);
            // la siguiente linea lo que hace es ir a buscar la data del usuario mas rapido, esto es parte de useSWR
            await mutate();
            
        } catch (error: any) {
            // con esta guardo el campo y su array de errores
            // setErrores(error.response.data.errors);
            // con este guardo solo el array y no se de que campo es ese error, feo pero asi lo dejo el profesor
            setErrores(Object.values(error.response.data.errors));
            
        }
    }

    return {
        user,
        error,
        login,
        logout,
        registro,
    }
}
