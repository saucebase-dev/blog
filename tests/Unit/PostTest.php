<?php

namespace Modules\Blog\Tests\Unit;

use Modules\Blog\Models\Post;
use Tests\TestCase;

class PostTest extends TestCase
{
    /** Every read is safe markup, so no page or endpoint has to remember to clean it. */
    public function test_content_is_sanitised_on_read(): void
    {
        $post = new Post;
        $post->setRawAttributes(['content' => '<p><em>Hi</em><img src=x onerror="alert(1)"><script>alert(2)</script></p>']);

        $this->assertStringContainsString('<em>Hi</em>', $post->content);
        $this->assertStringNotContainsString('onerror', $post->content);
        $this->assertStringNotContainsString('<script', $post->content);
    }

    public function test_cover_media_collection_is_registered_as_single_file(): void
    {
        $post = new Post;
        $post->registerMediaCollections();

        $collection = $post->getMediaCollection('cover');

        $this->assertNotNull($collection);
        $this->assertTrue($collection->singleFile);
    }
}
