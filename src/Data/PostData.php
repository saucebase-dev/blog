<?php

namespace Modules\Blog\Data;

use Modules\Blog\Models\Post;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class PostData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $slug,
        public ?string $excerpt,
        public string $cover_url,
        public string $card_url,
        public ?string $published_at,
        public ?string $updated_at,
        public ?CategoryData $category,
        public ?AuthorData $author,
        public string $url,
        public ?string $content = null,
    ) {}

    public static function fromPost(Post $post): static
    {
        $cover = $post->getFirstMedia('cover');

        return new self(
            id: $post->id,
            title: $post->title,
            slug: $post->slug,
            excerpt: $post->excerpt,
            cover_url: $post->getFirstMediaUrl('cover'),
            card_url: $cover?->hasGeneratedConversion('card')
                ? $cover->getUrl('card')
                : $post->getFirstMediaUrl('cover'),
            published_at: $post->published_at?->toDateString(),
            updated_at: $post->updated_at?->toDateString(),
            category: $post->category ? CategoryData::from($post->category) : null,
            author: $post->author ? AuthorData::from($post->author) : null,
            url: $post->url(),
        );
    }

    public function withContent(string $content): static
    {
        return new self(
            id: $this->id,
            title: $this->title,
            slug: $this->slug,
            excerpt: $this->excerpt,
            cover_url: $this->cover_url,
            card_url: $this->card_url,
            published_at: $this->published_at,
            updated_at: $this->updated_at,
            category: $this->category,
            author: $this->author,
            url: $this->url,
            content: $content,
        );
    }
}
