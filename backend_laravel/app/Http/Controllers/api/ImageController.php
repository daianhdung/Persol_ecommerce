<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends ResponseController
{
    //
    public function uploadFile(Request $request){
        $category = $request->category;
        $file = $request->file('image');
        $fileName = $file->getClientOriginalName();
        $path = $file->storeAs('public/'.$category. '/images', $fileName);

        return response()->json([
            'path' => $path,
            'url' => Storage::url($path)
        ]);
    }

    public function getImage($category, $fileName){
        $path = "public/images/{$category}/{$fileName}";
        if(!Storage::exists($path)){
            return $this->errorResponse('Image not found');
        }
        $image = Storage::get($path);
        return response($image, 200)->header('Content-Type', Storage::mimeType($path));
    }
}
