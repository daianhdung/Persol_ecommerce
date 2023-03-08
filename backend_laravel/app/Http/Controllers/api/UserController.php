<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\ResponseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Mosquitto\Exception;

class UserController extends ResponseController
{
    public function getAllUser(){
        $users = User::with('role')->get();

        return $this->successResponse($users, "Thành công");
    }

    public function getUserById($id){
        $user = User::with('role')->find($id);

        return $this->successResponse($user, "Thành công");
    }

    public function register(Request $request){
        $requestData = $request->all();

        $requestData['password'] = Hash::make($requestData['password']);
        $requestData['role_id'] = 2;
        $user = User::create($requestData);

        return $this->successResponse($user, 'Đăng ký tài khoản thành công !');
    }

    public function createUser(Request $request){
        $requestData = $request->all();

        $requestData['password'] = Hash::make($requestData['password']);
        $requestData['role_id'] = $requestData['role'];
        $user = User::create($requestData);

        return $this->successResponse($user, 'Tạo tài khoản thành công !');
    }

    public function updateUserById( $id ,Request $request){
        $requestData = $request->all();
        $user = User::find($id);

        if(isset($request->password)){
            if(!Hash::check($requestData['oldPassword'], $user->password)){
                return $this->errorResponse('Lỗi r', 'Mật khẩu cũ không đúng !', 400);
            }else{
                $requestData['password'] = Hash::make($requestData['password']);
            }
        }
        if(isset($request->role)){
            $requestData['role_id'] = $requestData['role'];
        }
        try{
            $user->update($requestData);
            return $this->successResponse($user, 'Cập nhật tài khoản thành công !');
        }catch (Exception $e){
            return $this->errorResponse($e, 'Cập nhật tài khoản thất bại !');
        }
    }

    public function deleteUser($id){
        $user = User::find($id);
        if(is_null($user)) {
            return $this->errorResponse("Không tìm thấy user");
        }
        $user->delete();
        return $this->successResponse($user,'Xóa account thành công');

    }

}
