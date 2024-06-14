<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class HomeController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function posts(): AnonymousResourceCollection
    {
        return PostResource::collection(Post::all());
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function categories(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::limit(8)->get());
    }

    /**
     * @param Category $category
     * @return AnonymousResourceCollection
     */
    public function category(Category $category): AnonymousResourceCollection
    {
        return PostResource::collection($category->posts);
    }
}
