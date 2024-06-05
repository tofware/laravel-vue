<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::all());
    }

    /**
     * @param StoreCategoryRequest $request
     * @return CategoryResource
     */
    public function store(StoreCategoryRequest $request): CategoryResource
    {
        Gate::authorize('categories.create');

        $category = Category::create($request->validated());

        return new CategoryResource($category);
    }

    /**
     * @param Category $category
     * @return CategoryResource
     */
    public function show(Category $category): CategoryResource
    {
        Gate::authorize('categories.update');

        return new CategoryResource($category);
    }

    /**
     * @param Category $category
     * @param StoreCategoryRequest $request
     * @return CategoryResource
     */
    public function update(Category $category, StoreCategoryRequest $request): CategoryResource
    {
        Gate::authorize('categories.update');

        $category->update($request->validated());

        return new CategoryResource($category);
    }

    /**
     * @param Category $category
     * @return Response
     */
    public function destroy(Category $category): Response
    {
        Gate::authorize('categories.delete');

        $category->delete();

        return response()->noContent();
    }
}
