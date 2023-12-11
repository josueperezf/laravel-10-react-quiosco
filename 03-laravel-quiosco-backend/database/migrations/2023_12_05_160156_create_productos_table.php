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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->double('precio'); // doble se utiliza para moneda
            $table->string('imagen');
            $table->boolean('disponible')->default(1); // 1 disponible , 0 no disponible
            $table->foreignId('categoria_id')->constrained()->onDelete('cascade'); // creo que si borra la categoria tambien se borre todos los productos que existan de esa categoria
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
        Schema::dropIfExists('productos');
    }
};
