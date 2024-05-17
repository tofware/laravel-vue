<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $orderColumn = request('order_column', 'created_at');
        if(!in_array($orderColumn, ['id', 'title', 'created_at'])) {
            $orderColumn = 'created_at';
        }

        $orderDirection = request('order_direction', 'desc');
        if(!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $posts = Post::with('category')
            ->when(request('search_category'), function (Builder $query) {
                $query->where('category_id', request('search_category'));
            })
            ->when(request('search_id'), function (Builder $query) {
                $query->where('id', request('search_id'));
            })
            ->when(request('search_title'), function (Builder $query) {
                $query->where('title', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_content'), function (Builder $query) {
                $query->where('content', 'like', '%' . request('search_content') . '%');
            })
            ->when(request('search_global'), function (Builder $query) {
                $query->whereAny([
                    'id',
                    'title',
                    'content',
                ], 'LIKE', '%' . request('search_global') . '%');
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * @param StorePostRequest $request
     * @return PostResource
     */
    public function store(StorePostRequest $request): PostResource
    {
        Gate::authorize('posts.create');

        if ($request->hasFile('thumbnail')) {
            $filename = $request->file('thumbnail')->getClientOriginalName();
        }

        $post = Post::create($request->validated());

        return new PostResource($post);
    }

    /**
     * @param Post $post
     * @return PostResource
     */
    public function show(Post $post): PostResource
    {
        Gate::authorize('posts.update');

        return new PostResource($post);
    }

    /**
     * @param Post $post
     * @param StorePostRequest $request
     * @return PostResource
     */
    public function update(Post $post, StorePostRequest $request): PostResource
    {
        Gate::authorize('posts.update');

        $post->update($request->validated());

        return new PostResource($post);
    }

    /**
     * @param Post $post
     * @return Response
     */
    public function destroy(Post $post): Response
    {
        Gate::authorize('posts.delete');

        $post->delete();

        return response()->noContent();
    }
}
