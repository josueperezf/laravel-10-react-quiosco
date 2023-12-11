<?php

use App\Http\Controllers\API\CategoriaController;
use Illuminate\Support\Facades\Route;

Route::get('categorias', [CategoriaController::class, 'index'])->name('categorias.index');

?>
