<?php

use App\Http\Controllers\API\PedidoController;
use Illuminate\Support\Facades\Route;

// inicio de rutas logueadas por token. lo siguiente valida si esta autenticado
Route::middleware('auth:sanctum')->group(function() {
    // rutas logueadas

    // lo siguiente agrupa todos los metodos del crud de una api de laravel, recordemos que no va los metodos edit, ni create
    Route::apiResource('/pedidos', PedidoController::class);
})
// fin de rutas logueadas por token
?>
