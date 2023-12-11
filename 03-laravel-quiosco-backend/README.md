# proyecto de laravel

<b style="color:red">Importante</b> para poder hacer peticiones a este backend, bien sea desde un frontend o desde POSTMAN, se debe pasar por cabecera 'headers', lo siguientes parametros:
```
'Accept': 'application/json',
'X-requested-With': 'XMLHttpRequest'
```
para Hacer peticiones a paginas donde el usuario debe estar logueado, se debe pasar el token, este lo genera laravel con ```sanctum```, SIN utilizar ```JWT``` de la siguiente manera:
1. si estas en <b style="color: blue">postman</b>:
   1. debemos hacer click en ```Authorization```
   2. en ```Type``` seleccionamos donde diga ```Bearer Token```
   3. y en el campo token pegamos el token que nos retorna laravel, ejemplo: ```1|RTB5nFJg6dmQewTps2CPLsZshiqrfPYVJ5D2wmKb992f184b```


## comandos importantes de laravel para crear un controllador api

1. creamos el modelo y la migracion
    ```
    php artisan make:model Categoria -m
    ```
2. para crear un controller tipo api 'Los controladores api no tiene el metodo create ni el edit ya que esto debe ser parte de frontend' vinculandolo a un modelo existente ejecutamos
    ```
    php artisan make:controller API/CategoriaController --api --model=Categoria --resource --requests
    ```

3. debemos crear un primer archivo resource ```si no la tenemos ya creada``` asociada al modelo, este que sera el principal. para ello ejecutamos el comando 
    ```
    php artisan make:resource CategoriaCollection
    ```
4. debemos crear un segundo archivo resource, este nos va a indicar cuales son los campos del modelo que queremos retornar al frontend
    ```
    php artisan make:resource CategoriaResource
    ```
5. para correr una migracion de una forma controlada, colocamos el nombre del archivo que queremos correr, tambien podemos con un comando borrar todos seed de una tabla y correrlos de nuevo
    ```
     php artisan db:seed --class=ProductoSeeder
    ```
6. <b>pasos para crear la migracion que agregar una columna a una tabla existente</b>, para ello debemos manejar un standar para que laravel nos cargue automaticamente el modelo y demas, para este ejemplo podemos manejar ejemplo agregar a la tabla ```users``` la columna llamada ```admin```
    ```
    php artisan make:migration add_admin_column_to_users_table
    ```
7. <b>para crear validaciones profesionales</b> en laravel <https://www.youtube.com/watch?v=-EjAKSjMYjQ>
8. para crear un archivo request profesional, existe un standar para el nombre del archivo, este standar dice que el nombre del archivo debe inicial con:
   1. nombre del metodo que utilizara el request, para este ejemplo lo llamamos ```Registro```
   2. nombre del controlador 'sin la palabra controller' al que pertenece el metodo. para este ejemplo se llama ```AuthController``` pero solo utilizamos el ```Auth```
   3. es la palabra que debe llevar por standard ```Request```
   4. resultado final del nombre seria ```RegistroAuthRequest```
    ```
    php artisan make:request RegistroAuthRequest
    ```
    5. <b style="color:red"> IMPORTANTE </b>, el archivo RegistroAuthRequest contendrá:
       1. un metodo llamado ```authorize()```: este metodo sirve para que laravel valide si permite a usuarios logueados o no logueados utilizar el metodo del controlador que utiliza nuestro request. para nuestro metodo llamado registro, para el registro de usuario, no necesitamos que el usuario este logueado en nuestro sistema, asi que al return lo colocamos en true, quedando algo como:
       ```php
       public function authorize() {
            return true;
       }
       ```
       2. un metodo llamado ```rules()``` donde irán nuestras validaciones para ese request
    6. ahora ya creado nuestro archivo debemos vincularlo a un metodo del controlador ```AuthController```, para este ejemplo vamos al metodo registro, quedando algo como:
        ```php
        public function registro(RegistroAuthRequest $request) {
        }
        ```
    7. podemos personalizar los mensajes de error, esto a nivel global o solo en nuestro request, para hacerlo en nuestro request debemos crear un metodo llamado ```messages()```, laravel lo detectará automaticamente y reemplazara los mensaje por default por nuestros mensajes. ejemplo:
        
        ```php
        public function messages() {
            return [
                'name.required' => 'El nombre es requerido',
                'email.required' => 'El email es requerido',
                'email.email' => 'Debe ser un email valido',
                'email.unique' => 'Este email ya esta en uso',
                'password' => 'El password debe contener 8 caracteres, letras, simbolos y numeros',
                // 'password.required' => 'El password es requerido',
                // 'password.confirmed' => 'El password su confirmacion deben ser iguales',
            ];
        }
        ```
1.  <b>Creando relacion tipo factura detalle factura n a m. un pedido puede tener muchos productos, y de un producto 'hamburguesa' pueden hacer muchos pedidos</b>: para este ejemplo tenemos un ejemplo similar a factura detalle de factura, en este caso, la tabla ```Pedido``` seria equivalente a Factura, y el modelo ```detalleFactura``` seria similar al que crearemos llamado ```PedidoProducto```, algo como:
    ```
                        esta tabla es vista como la tabla intermedia de n a m
        _________          _________________
        |pedidos|------> | pedido_productos |
        |id     |        |  id              |
        |total  |        |  pedido_id       |          _________________
        _________        |  producto_id     |<--------| productos       |
                         |_________________ |         | id              |
                                                      | nombre          |
                                                      | precio          |
                                                      |_________________|
    ```

    para ello debemos ejecutar el comando

    ```
    php artisan make:model PedidoProducto --migration
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

# informacin sobre token de laravel

por default lavel utiliza una herramienta llamada ```sanctum```, esta se encarga de crear tokens, almacenarlos, refresh etc, lo hace excelente, registrandolos en una tabla y demas, de que si queremos eliminar el acceso a alguien podemos borrar su token de la tabla y la persona ya le cierra la sesion.

la observacion es que no utiliza ```jwt```, por ende su token es algo como: ```"2|i0ynAhCZxjXnDOIJxZXS2RFnyuykz5cnss760ycK64543e88"```, en lugar del clasico: ```asasdasdasd.asdashdjtgasdyasfdyastd.jasgduyasd``` de jwt
