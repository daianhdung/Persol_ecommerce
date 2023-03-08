<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Response;

class WordController extends Controller
{
    //
    public function downloadWord($id)
    {
        // Create a new PhpWord instance
        $test = Product::find($id);
        $result = $this->convertText($test);

        return Response::make($result, 200, [
            'Content-type' => 'application/vnd.msword',
            'Content-Disposition' => "attachment;Filename=report.doc",
            'Expires' => 0,
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0'
        ]);
    }

    public function convertText($item)
    {
        $result = '<html>';
        $result .= '<div style="color: #28a1b6">' . 'Name: ' . $item['name'] . '</div> </br>';
        $result .= '<div style="color: #28a1b6">' . 'Category: ' . $item['category']->name . '</div> </br>';
        $result .= '<div style="color: #28a1b6">'. 'Brand: ' . $item['brand']->name . '</div> </br>';
        $result .= '<div style="color: #28a1b6">' . 'Price: '. $item['price'] . '</div> </br>';
        $result .= '<div style="color: #28a1b6">' . 'Description: '. $item['detail'] . '</div> </br>';
        $result .= '</html>';
        return $result;
    }
}
