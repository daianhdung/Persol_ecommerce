<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $table = 'visitor';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'ip_address',
        'count',
        'start_time',
        'end_time'
    ];
}
