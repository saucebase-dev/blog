<?php

namespace Modules\Blog\Http\Controllers;

use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Blog\Data\PostData;
use Modules\Blog\Models\Category;
use Modules\Blog\Models\Post;
use Saucebase\Core\Settings\GeneralSettings;
use Spatie\Feed\Feed;

class BlogController
{
    public function index(): Response
    {
        $posts = Post::published()
            ->with(['category', 'author'])
            ->orderByDesc('published_at')
            ->paginate(12);

        return Inertia::render('Blog::Index', [
            'posts' => $posts->through(fn (Post $post) => PostData::fromPost($post)),
        ])->withSSR();
    }

    /**
     * The RSS feed of published posts.
     *
     * Built here rather than through the package's `feed.feeds` config and route
     * macro: the module owns its route, and the app publishes no feed config.
     */
    public function feed(GeneralSettings $settings): Feed
    {
        $posts = Post::published()
            ->with(['category', 'author'])
            ->orderByDesc('published_at')
            ->limit(50)
            ->get();

        return new Feed(
            title: $settings->site_name,
            items: $posts,
            url: route('blog.feed'),
            view: 'feed::rss',
            description: $settings->site_description ?? $settings->site_tagline ?? __('Blog'),
            language: app()->getLocale(),
            format: 'rss',
        );
    }

    public function show(string $categoryOrSlug, ?string $slug = null): Response
    {
        $query = Post::published()->with(['category', 'author']);

        if ($slug !== null) {
            $category = Category::where('slug', $categoryOrSlug)->firstOrFail();
            $post = $query->where('category_id', $category->id)->where('slug', $slug)->firstOrFail();
        } else {
            $post = $query->where('slug', $categoryOrSlug)->firstOrFail();
        }

        $related = Post::published()
            ->with(['category', 'author'])
            ->whereKeyNot($post->id)
            ->when($post->category_id, fn ($query, int $categoryId) => $query->orderByRaw('category_id = ? desc', [$categoryId]))
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Post $p) => PostData::fromPost($p));

        return Inertia::render('Blog::Show', [
            'post' => PostData::fromPost($post)->withContent(Str::sanitizeHtml($post->content)),
            'related' => $related,
        ])->withSSR();
    }
}
