<?php

namespace Modules\Blog\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class Category extends Model implements Sitemapable
{
    use HasFactory, Sluggable;

    protected $table = 'blog_categories';

    protected $fillable = ['name', 'slug'];

    /**
     * Slugs a category cannot take: its posts live at `/blog/{category}/{post}`,
     * and these two words already begin the tag and category page URLs, which are
     * matched first.
     */
    public const RESERVED_SLUGS = ['category', 'tag'];

    /**
     * @return array<string, array{source: string, reserved: list<string>}>
     */
    public function sluggable(): array
    {
        return [
            'slug' => ['source' => 'name', 'reserved' => self::RESERVED_SLUGS],
        ];
    }

    /**
     * @return HasMany<Post, $this>
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function url(): string
    {
        return route('blog.category', $this->slug);
    }

    public function toSitemapTag(): Url
    {
        return Url::create($this->url());
    }
}
