<?php

use App\Http\Controllers\API\ProductoController;
use Illuminate\Support\Facades\Route;

// para inidicar que debe estar autenticado para poder consumir productos. si siento que deberia de tener police o middleware para limitar al perfil de usuario
//!IMPORTANTEEEE
/*
aqui estamos diciendo que para poder utilizar los endpoint debe estar logueado PEROOOO,
Como estamos utilizando request personalizado como por ejemplo
1. StoreProductoRequest.php
2. UpdateProductoRequest.php

debemos tener en esos archivos php, en el metodo 'authorize' un return true

si esos archivos php retornamos un falso, estamos diciendo que solo podra acceder peticiones que no esten logueadas, por ender,
para este caso necesitamos un return trueeeeeeeeeeeeeeeeeeeeeeeee
*/
Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('/productos', ProductoController::class);
})
?>
