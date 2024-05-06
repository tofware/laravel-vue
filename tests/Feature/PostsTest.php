<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Post;
use Tests\TestCase;

class PostsTest extends TestCase
{
    public function test_posts_page_contains_empty_table(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee(__('No posts found'));
    }

    public function test_homepage_contains_non_empty_table(): void
    {
        Post::factory(1)->create();

        $response = $this->get('/products');

        $response->assertStatus(200);
        $response->assertDontSee(__('No posts found'));
    }
}
