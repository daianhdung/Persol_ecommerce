<?php

namespace App\Http\Controllers\api;

use App\Models\ImageProduct;
use App\Models\Product;
use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;

class ProductsController extends ResponseController
{
    public function getAllProduct()
    {
        $product = Product::with('brand', 'category')->get();

        return $this->successResponse($product, 'thanh cong');
    }

    public function detailProduct($id)
    {
        $product = Product::with('imageProduct', 'brand', 'category')->find($id);
        if (is_null($product)) {
            return response()->json(['message' => 'Product not found']);
        }
        return $this->successResponse($product, "Thành công");
    }

    public function detailListProduct(Request $request)
    {
        $productIds = explode(',', $request->input('ids'));
        $product = Product::whereIn('id', $productIds)->get();

        return $this->successResponse($product, "Thành công");
    }

    public function createProduct(Request $request)
    {
        $requestData = $request->all();
        $requestData['brand_id'] = $requestData['brand'];
        $requestData['category_id'] = $requestData['category'];

//        Upload main_image
        $file = $request->file('mainImage');
        $fileMainName = $file->getClientOriginalName();
        $file->storeAs('public/images/product', $fileMainName);
        $requestData['main_image'] = $fileMainName;

        try {
            $product = Product::create($requestData);
            //Upload images
            $files = $request->file('images');
            foreach ($files as $image) {
                $fileName = $image->getClientOriginalName();
                $image->storeAs('public/images/product_image', $fileName);
                $productImage = new ImageProduct();
                $productImage->product_id = $product->id;
                $productImage->name = $fileName;
                $productImage->save();
            }
            return $this->successResponse($product, "Tạo sản phẩm thành công");
        } catch (\Exception $e) {
            return $this->errorResponse($e, "Thất bại");
        }
    }

    public function updateProductById(Request $request, $id)
    {

        $requestData = $request->all();
        $product = Product::find($id);
        $requestData['brand_id'] = $request->brand;
        $requestData['category_id'] = $request->category;

        $product->update($requestData);

        return $this->successResponse($product, "Cập nhật sản phẩm thành công");
    }


    public function deleteProduct($id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return $this->errorResponse('message', 'Product not found');
        }
        $product->delete();
        return $this->successResponse($product, 'Xóa sản phẩm thành công');

    }

    public function productFilterPagination(Request $request)
    {
        $categoryIds = $request->categoryIds;
        $brandIds = $request->brandIds;
        $keyword = $request->keyword;
        $sort = $request->sort;

        $productQuery = Product::where('name', 'like', '%' . $keyword . '%');

        if (!empty($categoryIds)) {
            $productQuery->whereIn("category_id", $categoryIds);
        }
        if (!empty($brandIds)) {
            $productQuery->whereIn("brand_id", $brandIds);
        }


        if ($sort === 'az') {
            $productQuery->orderBy('name', 'asc');
        } elseif ($sort === 'za') {
            $productQuery->orderBy('name', 'desc');
        } elseif ($sort === 'ascPrice') {
            $productQuery->orderBy('price', 'asc');
        } elseif ($sort === 'descPrice') {
            $productQuery->orderBy('price', 'desc');
        }

        $product = $productQuery->paginate(12);

        return $this->successResponse($product, "Thành công");
    }

    public function getTopSellingProduct()
    {
        $product = Product::orderBy('amount_of_sold', 'desc')->take(10)->get();
        return $this->successResponse($product, "Thành công");
    }

    public function getFeatureProduct()
    {
        $products = Product::whereIn('price', function ($query) {
            $query->selectRaw('MAX(price)')
                ->from('product')
                ->groupBy('brand_id');
        })
            ->get();

        return $this->successResponse($products, "Thành công");
    }

    public function getTodayBestDealProduct()
    {
        $products = Product::whereIn('price', function ($query) {
            $query->selectRaw('MIN(price)')
                ->from('product')
                ->groupBy('brand_id');
        })
            ->get();

        return $this->successResponse($products, "Thành công");
    }
}
