<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends ResponseController
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }


    public function login(Request $request){

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return $this->errorResponse('Thông tin đăng nhập không đúng !', [], 401);
        }

        $expirationTime = config('jwt.ttl');


        $user = Auth::user();
        $token = auth()->claims(['sub1' => ['email' => $user->email, 'fullname' =>$user->fullname, 'roleId' =>$user->role_id , 'id' => $user->id
        ]])->attempt($credentials);
        return $this->successResponse([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'expiration' => $expirationTime,
            ]
        ], 'Đăng nhập thành công');

    }

}
