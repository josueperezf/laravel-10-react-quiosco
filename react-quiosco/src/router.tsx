import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "./layouts/HomeLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Inicio } from "./views/Inicio";
import { Login } from "./views/Login";
import { Registro } from "./views/Registro";
import { AdminLayout } from "./layouts/AdminLayout";
import { Ordenes } from "./views/Ordenes";
import { Productos } from "./views/Productos";

const router = createBrowserRouter([
    {
        path: '/', element: <HomeLayout/>,
        children: [
            { 
                index: true, element: <Inicio/>
            }
        ]
    },
    {
        path: '/auth/*', element: <AuthLayout />,
        children: [
            { 
                path:'login', element: <Login/>
            },
            { 
                path:'registro', element: <Registro/>
            }
        ]
    },
    {
        path: 'admin', element: <AdminLayout/>,
        children: [
            {index: true, element: <Ordenes />},
            {path: '/admin/productos', element: <Productos />},
        ]
    }
])

export default router;