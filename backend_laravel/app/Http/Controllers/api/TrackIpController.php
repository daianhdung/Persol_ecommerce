<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Models\Visitor;
use Illuminate\Http\Request;

class TrackIpController extends ResponseController
{
    //

    public function getVisitorCount(){
        $visitorCount = Visitor::count('count');
        return $this->successResponse($visitorCount, "thành công");
    }

    public function newVisitor(Request $request){
        $requestData = $request->all();
        $requestData['ip_address'] = $request->ip;
        $requestData['count'] = 1;

        $visitor = Visitor::create($requestData);

        return $this->successResponse($requestData, "thành công");
    }
}
