# React + TypeScript + Vite

<b style="color:red">Importante</b> para poder hacer peticiones al backend de este proyecto, bien sea desde un frontend o desde POSTMAN, se debe pasar por cabecera 'headers', lo siguientes parametros:
```
'Accept': 'application/json',
'X-requested-With': 'XMLHttpRequest'
```
para Hacer peticiones a paginas donde el usuario debe estar logueado, se debe pasar el token, este lo genera laravel con ```sanctum```, SIN utilizar ```JWT``` de la siguiente manera:
1. si estas en <b style="color: blue">postman</b>:
   1. debemos hacer click en ```Authorization```
   2. en ```Type``` seleccionamos donde diga ```Bearer Token```
   3. y en el campo token pegamos el token que nos retorna laravel, ejemplo: ```1|RTB5nFJg6dmQewTps2CPLsZshiqrfPYVJ5D2wmKb992f184b```


# plugins

1. ```npm i react-toastify``` sirve para mostrar mensajes tipo toast
2. ```npm i axios``` para peticiones http
3. ```npm i swr``` SWR es una estrategia para devolver primero los datos en caché (obsoletos), luego envíe la solicitud de recuperación (revalidación), y finalmente entrege los datos actualizados. simula peticiones en tiempo real. NO ME GUSTA MUCHO, por que yo le puedo decir que cada ejemplo 2 segundos actualice la data, entonces cada 2 segundos hace una peticion http para actualizar, siento que ello haria demasiadas peticiones http sin necesidad 

## variables de entorno vite
    ```
    .env                # loaded in all cases
    .env.local          # loaded in all cases, ignored by git
    .env.[mode]         # only loaded in specified mode
    .env.[mode].local   # only loaded in specified mode, ignored by git
    ```

# Para solucionar problemas de CORS, laravel react

1. debemos abrir en laravel el archivo ```cors.php``` que esta en la carpeta ```config```, y al final del mismo debemos colocar el campo ```supports_credentials```, quedando algo como:
   ```'supports_credentials' => true,```
2. en nuestro frontend ejemplo react, en las cabecera colocamos ```'Accept': 'application/json',```, quedando algo como:
   ```ts
   const clienteAxios = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Accept': 'application/json',
            // 'X-requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
    });
   ```
