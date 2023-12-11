<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginAuthRequest extends FormRequest
{
    //* RETURN TRUE ES PARA QUE EL CONTROLADOR QUE UTILICE ESTE REQUEST LO PUEDA HACER SIN NECESIDAD DE ESTAR LOGUEADO
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email', 'exists:users,email' ],
            'password' => ['required'],
        ];
    }

    public function messages() {
        return [
            'email.required' => 'El email es obligatorio',
            'email.email' => 'Debe ser un correo válido',
            'email.exists' => 'Esa cuenta no existe',
            'password' => 'El password es obligatorio',
        ];
    }
}
