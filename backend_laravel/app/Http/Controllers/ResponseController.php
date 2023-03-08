<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResponseController extends Controller
{
    public function successResponse($result, $message = null){

        // array response

        $response = [
            'success' => true,
            'data' => $result,
        ];

        if($message != null){
            $response['message'] = $message;
        }

        return response()->json($response, Response::HTTP_OK, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE);
    }

    public function errorResponse($error, $errorMessages = [], $code = 404){
        // array response
        $response = [
            'success' => false,
            'message' => $error
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
