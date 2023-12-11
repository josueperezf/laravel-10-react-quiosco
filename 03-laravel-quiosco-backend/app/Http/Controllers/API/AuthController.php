<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginAuthRequest;
use App\Http\Requests\RegistroAuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {

    // con el LoginAuthRequest hasta validamos que el email exista en la tabla users
    public function login(LoginAuthRequest $request) {
        $data = $request->validated();

        // verificar si el password es correcto,
        //* attempt trata de autenticar con los valores de que se le pasa en el array, para este ejemplo ['email'=>'miEmail', password: 'mipassword']
        if (!Auth::attempt($data)) {
            // si no se autentica
            return response([
                'errors' => ['Email o password incorrectos'], // debe ser array para seguir el standar
            ], 422);
        }

        // si sus credenciales son correctas, debemos crear un token
        $user = $request->user();
        // $user = Auth::user(); // esta linea hace lo mismo que la anterior

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user'  => $user
        ]);
    }

    // entra aca solo si esta autenticado
    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return [
            'user' => null
        ];
    }

    public function registro(RegistroAuthRequest $request) {
        // al entrar aqui va el pasa por todas las validaciones que colocamos en RegistroAuthRequest
        // guardamos en data los valores ya validados
        $data = $request->validated();

        // creamos el usuario en la db
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);


        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user'  => $user
        ]);
    }

}
