<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model{
    protected $table = 'brand';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'image',
    ];

    public function categories(){
        return $this->belongsToMany(Category::class, 'category_brand');
    }
}
?>
