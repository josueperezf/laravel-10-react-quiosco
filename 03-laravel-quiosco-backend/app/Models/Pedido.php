<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    //! EXPLICACION DE LA RELACION DE PEDIDOS Y PRODUCTOS
    /*
                        esta tabla es vista como la tabla intermedia de n a m
    _________          _________________
    |pedidos|------> | pedido_productos |
    |id     |        |  id              |
    |total  |        |  pedido_id       |          _________________
    _________        |  producto_id     |<--------| productos       |
                     |  cantidad        |         | id              |
                     |_________________ |         | nombre          |
                                                  | precio          |
                                                  |_________________|
    */
    public function productos() {
        // pedido_productos es el nombre de la tabla de muchos a muchos
        return $this->belongsToMany(Producto::class, 'pedido_productos')
            ->withPivot('cantidad'); //cantidad es el campo extra de la tabla relacional, si no colocamos esto no nos trae ese campo
    }
}
