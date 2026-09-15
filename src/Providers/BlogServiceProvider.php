<?php

namespace Modules\Blog\Providers;

use Modules\Blog\Models\Post;
use Saucebase\Core\Providers\ModuleServiceProvider;
use Saucebase\Core\Sitemap\SitemapRegistry;
use Spatie\Sitemap\Sitemap;

class BlogServiceProvider extends ModuleServiceProvider
{
    public function boot(): void
    {
        parent::boot();

        $this->app->make(SitemapRegistry::class)->add(fn (Sitemap $sitemap) => $sitemap
            ->add(route('blog.index'))
            ->add(Post::published()->with('category')->get()));
    }
}
