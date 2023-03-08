<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\ResponseController;
use App\Mail\PersolMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Mockery\Exception;


class ContactController extends ResponseController
{
    //
    public function sendMail(Request $request)
    {

        $data = [
            'subject' => "Thank you for contacting us",
            'body' => "Dear valued customer,\r\nThank you for contacting us. We have received your message and will respond as soon as possible. If your inquiry requires an urgent response, please call our support team at 1-800-123-4567.\n\nBest regards,\nThe Support Team"
        ];

        try {
            Mail::to($request->email)->send(new PersolMail($data));
            $request->fullname = $request->firstName . ' ' . $request->lastName;
            \App\Models\Mail::create($request->all());
            return $this->successResponse($data, "Thành công");
        }catch (Exception $exception){
            return $this->errorResponse($exception, 'Thất bại');
        }
    }

    public function getAllMail(){
        $mails = \App\Models\Mail::all();
        return $this->successResponse($mails,'Thành công');
    }

    public function deteleMail($id){
        $mails = \App\Models\Mail::find($id);
        if(is_null($mails)) {
            return response()->json(['message' => 'Mail not found']);
        }
        $mails->delete();
        return $this->successResponse($mails,'Thành công');
    }
}
