<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    // Valida que los campos sean obligatorios para guardar en la base de datos
    static $rules = [
        'title' => 'required|min:3|max:255',
        'descripcion' => 'required|min:3|max:500',
        'start' => 'required|date',
        'end' => 'required|date',
    ];

    // Atributos que se pueden guardar en la base de datos
    protected $fillable = [
        'title',
        'descripcion',
        'start',
        'end',
    ];
}