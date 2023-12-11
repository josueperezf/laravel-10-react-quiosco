<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// inicio de rutas sin loguear
Route::post('/registro', [AuthController::class, 'registro'])->name('auth.registro');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
// fin de rutas sin loguear

// inicio de rutas logueadas por token
//* middleware(['auth:sanctum', 'verified'])  es para decir que ademas de estar logueado debe de confirmar el correo o algo que nosotros le demos para verificar que la cuenta es real
Route::middleware('auth:sanctum')->group(function() {
    // rutas logueadas
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
})
// fin de rutas logueadas por token
?>
