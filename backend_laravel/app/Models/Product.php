<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model{
    protected $table = 'product';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'main_image',
        'amount_of_sold',
        'detail',
        'price',
        'category_id',
        'brand_id',
    ];

    public function imageProduct()
    {
        return $this->hasMany(ImageProduct::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
?>
