<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedido_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('pedidos', 'id')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos', 'id')->onDelete('cascade');
            $table->integer('cantidad');
            //* para mi deberia de guardar aqui el precio del producto, ya que con el tiempo si se quiere ver un historico no se podria saber en cuanto se vendio este producto, ya que pudo subir de precio en la tabla original, pero asi lo hizo el profesor
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
        Schema::dropIfExists('pedido_productos');
    }
};
