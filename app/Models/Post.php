<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Post
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property Carbon|null $created_at
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
    ];
}
