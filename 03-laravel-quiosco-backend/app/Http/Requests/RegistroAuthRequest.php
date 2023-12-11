<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegistroAuthRequest extends FormRequest
{
    //* ESTE METODO SIRVE PARA INDICAR QUE QUIEN UTILICE NUESTRO METODO DEBE ESTAR LOGUEADO O NO, A LO QUE RETORNAMOS TRUE, SIGNIFICA QUE NO DEBE ESTAR LOGUEADO
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'name'  => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => [
                'required',
                'confirmed', // confirmed lo que hace es que valida que exista un campo llamado 'password_confirmation', y que el contenido de este sea exactamente igual a lo que tenga el campo password
                Password::min(8)->letters()->symbols()->numbers() //* IMPORTANTE,  Con esta linea valida que el password tenga minimo 8 caracteres, que contenga letras, simbolos y numeros EXCELENTE
            ]
        ];
    }

    public function messages() {
        return [
            'name.required' => 'El nombre es requerido',
            'email.required' => 'El email es requerido',
            'email.email' => 'Debe ser un email valido',
            'email.unique' => 'Este email ya esta en uso',
            'password' => 'El password debe contener 8 caracteres, letras, simbolos y numeros',
            // 'password.required' => 'El password es requerido',
            // 'password.confirmed' => 'El password su confirmacion deben ser iguales',
        ];
    }
}
