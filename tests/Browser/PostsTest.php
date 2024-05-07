<?php

namespace Tests\Browser;

use App\Models\Post;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use Throwable;

class PostsTest extends DuskTestCase
{
    use DatabaseTruncation;

    /**
     * @throws Throwable
     */
    public function test_it_shows_no_posts_found_when_no_posts_exist(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('No posts found');
        });
    }

    /**
     * @throws Throwable
     */
    public function test_it_shows_the_posts()
    {
        $post = Post::factory(1)->create()->first();

        $this->browse(function (Browser $browser) use ($post){
            $browser->visit('/')
                    ->assertDontSee(__('No posts found'))
                    ->assertSee($post->title)
                    ->assertSee($post->content);
        });
    }
}
