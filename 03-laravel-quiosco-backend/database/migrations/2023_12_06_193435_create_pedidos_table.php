<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//* PEDIDO SE ESTA VIENDO COMO FACTURA, falta el detalle de la factura
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            // no lo he probado, pero intuyo que si borro un usuario tambien se debe borrar sus pedidos
            $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade');
            $table->double('total');
            // un pedido si tiene estado 1 es que ya hicieron su pedido, llamese hamburguesa o lo que sea
            // si el pedido tiene estado 0 es que aun no esta lista la hamburguesa, que la estan preparando
            $table->boolean('estado')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos');
    }
};
