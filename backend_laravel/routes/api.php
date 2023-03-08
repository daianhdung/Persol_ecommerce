<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//authentication api
Route::post('/signup', [\App\Http\Controllers\api\UserController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\api\AuthController::class, 'login']);

//product api
Route::get('/products', [\App\Http\Controllers\api\ProductsController::class, 'getAllProduct']);
Route::get('/product-detail', [\App\Http\Controllers\api\ProductsController::class, 'detailListProduct']);
Route::get('/product/{id}', [\App\Http\Controllers\api\ProductsController::class, 'detailProduct']);
Route::post('/product', [\App\Http\Controllers\api\ProductsController::class, 'createProduct']);
Route::put('/product/{id}', [\App\Http\Controllers\api\ProductsController::class, 'updateProductById']);
Route::delete('/product/{id}', [\App\Http\Controllers\api\ProductsController::class, 'deleteProduct']);

//Product customized
Route::get('/product-topsell', [\App\Http\Controllers\api\ProductsController::class, 'getTopSellingProduct']);
Route::get('/product-feature', [\App\Http\Controllers\api\ProductsController::class, 'getFeatureProduct']);
Route::get('/product-bestdeal', [\App\Http\Controllers\api\ProductsController::class, 'getTodayBestDealProduct']);

Route::post('/product-filter', [\App\Http\Controllers\api\ProductsController::class, 'productFilterPagination']);

//image api
Route::post('/images', [\App\Http\Controllers\api\ImageController::class, 'uploadFile']);
Route::get('/images/{category}/{fileName}', [\App\Http\Controllers\api\ImageController::class, 'getImage']);

//user api
Route::get('/users', [\App\Http\Controllers\api\UserController::class, 'getAllUser']);
Route::get('/user/{id}', [\App\Http\Controllers\api\UserController::class, 'getUserById']);
Route::post('/user', [\App\Http\Controllers\api\UserController::class, 'createUser']);
Route::put('/user/{id}', [\App\Http\Controllers\api\UserController::class, 'updateUserById']);
Route::delete('/user/{id}', [\App\Http\Controllers\api\UserController::class, 'deleteUser']);

//Role API
Route::get('/roles', [\App\Http\Controllers\api\RoleController::class, 'getAllRole']);

//mail
Route::get('/mails', [\App\Http\Controllers\api\ContactController::class, 'getAllMail']);
Route::post('/mail', [\App\Http\Controllers\api\ContactController::class, 'sendMail']);
Route::delete('/mail/{id}', [\App\Http\Controllers\api\ContactController::class, 'deteleMail']);

//Brand
Route::get('/brands', [\App\Http\Controllers\api\BrandController::class, 'getAllBrand']);
Route::get('/brand/{id}', [\App\Http\Controllers\api\BrandController::class, 'getBrandById']);
Route::get('/categories/{idCate}/brands', [\App\Http\Controllers\api\BrandController::class, 'getAllBrandByIdCategory']);
Route::post('/brand', [\App\Http\Controllers\api\BrandController::class, 'createBrand']);
Route::put('/brand/{id}', [\App\Http\Controllers\api\BrandController::class, 'updateBrandId']);
Route::delete('/brand/{id}', [\App\Http\Controllers\api\BrandController::class, 'deleteBrand']);

Route::get('/test22', [\App\Http\Controllers\api\BrandController::class, 'getBrandCategory']);

//Category
Route::get('/categories', [\App\Http\Controllers\api\CategoryController::class, 'getAllCategory']);
Route::get('/category/{id}', [\App\Http\Controllers\api\CategoryController::class, 'getCategoryById']);
Route::post('/category', [\App\Http\Controllers\api\CategoryController::class, 'createCategory']);
Route::put('/category/{id}', [\App\Http\Controllers\api\CategoryController::class, 'updateCategoryId']);
Route::delete('/category/{id}', [\App\Http\Controllers\api\CategoryController::class, 'deleteCategory']);

//Word Download
Route::get('/word/{id}', [\App\Http\Controllers\api\WordController::class, 'downloadWord']);

//Route::get('/test1', [\App\Http\Controllers\api\CategoryBrandController::class, 'getBrandByCategory']);
//Visitor
Route::get('/visitor', [\App\Http\Controllers\api\TrackIpController::class, 'getVisitorCount']);
Route::post('/visitor', [\App\Http\Controllers\api\TrackIpController::class, 'newVisitor']);

