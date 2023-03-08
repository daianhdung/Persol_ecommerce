<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Models\Category;
use App\Models\CategoryBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends ResponseController
{
    //

    public function getAllCategory(){
        $category = Category::with('brands')->get();

        return $this->successResponse($category, "Thaành công");
    }

    public function getCategoryById($id){
        $category = Category::with('brands')->find($id);

        return $this->successResponse($category, "Thành công");
    }

    public function createCategory(Request $request){
        $requestData = $request->all();

        $category = DB::transaction(function() use($requestData) {

            $category = Category::create($requestData);

            $listBrand = $requestData['brands'];
            $dataInsert = [];
            foreach($listBrand as $brand){
                $dataInsert[] = [
                    'category_id' => $category->id,
                    'brand_id' => $brand
                ];
            }
            CategoryBrand::insert($dataInsert);
        });
        return $this->successResponse($category, 'Tạo thể loại thành công !');
    }

    public function updateCategoryId( $id ,Request $request){
        $requestData = $request->all();

        $category = DB::transaction(function () use ($requestData, $id) {
            $listBrand = $requestData['brands'];
            $cate = Category::find($id);

            foreach ($listBrand as $brandId) {
                DB::table('category_brand')
                    ->updateOrInsert(
                        ['category_id' => $cate->id, 'brand_id' => $brandId],
                        ['category_id' => $cate->id, 'brand_id' => $brandId]
                    );
            }

            $existingBrandIds = DB::table('category_brand')
                ->where('category_id', $cate->id)
                ->pluck('brand_id');

            $idsToDelete = $existingBrandIds->diff($listBrand);

            $updatedRows =  DB::table('category_brand')
                ->where('category_id', $cate->id)
                ->whereIn('brand_id', $idsToDelete)
                ->delete();
            $cate->update($requestData);

            return $updatedRows;
        });
//        if($category){
            return $this->successResponse($category, 'Cập nhật thương hiệu thành công !');
//        }catch (Exception $e){
//            return $this->errorResponse($e, 'Cập nhật thương hiệu thất bại !');
//        }
    }

    public function deleteCategory($id){
        $user = Category::find($id);
        if(is_null($user)) {
            return $this->errorResponse("Không tìm thấy thương hiệu");
        }
        $user->delete();
        return $this->successResponse($user,'Xóa thương hiệu thành công');
    }
}
