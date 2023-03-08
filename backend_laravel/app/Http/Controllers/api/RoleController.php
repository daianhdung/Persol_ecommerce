<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends ResponseController
{
    //

    public function getAllRole(){
        $roles = Role::all();
        return $this->successResponse($roles, "Thành công");
    }
}
