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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();

            // Datos que puede escribir el usuario
            /* 
            * Teniendo en cuenta que el calendario de Google
            * admite guardar eventos nullos, los campos
            ! title y descripcion son opcionales.
            */
            $table->string('title', 255)->nullable();
            $table->text('descripcion')->nullable();

            // Fichas de los eventos
            $table->dateTime('start');
            $table->dateTime('end');

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
        Schema::dropIfExists('eventos');
    }
};