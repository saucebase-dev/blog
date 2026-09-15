<?php

namespace Modules\Blog\Models;

use App\Models\User;
use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;
use Modules\Blog\Enums\PostStatus;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $excerpt
 * @property PostStatus $status
 * @property Carbon|null $published_at
 * @property int|null $category_id
 * @property int|null $author_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Post extends Model implements HasMedia, Sitemapable
{
    use HasFactory, InteractsWithMedia, Sluggable;

    protected $table = 'blog_posts';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'status',
        'published_at',
        'category_id',
        'author_id',
    ];

    protected static function booted(): void
    {
        static::saving(function (Post $post): void {
            if ($post->status === PostStatus::Published && $post->published_at === null) {
                $post->published_at = now();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'status' => PostStatus::class,
            'published_at' => 'datetime',
        ];
    }

    /**
     * @return array<string, array<string, string>>
     */
    public function sluggable(): array
    {
        return [
            'slug' => ['source' => 'title'],
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        if (! extension_loaded('gd') && ! extension_loaded('imagick')) {
            Log::warning('Blog: skipping the card image conversion because neither the GD nor the Imagick PHP extension is installed. Cards will use the full cover image.');

            return;
        }

        $this->addMediaConversion('card')
            ->performOnCollections('cover')
            ->nonQueued()
            ->width(800)
            ->format('webp');
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * The canonical public URL: under the category when the post has one.
     */
    public function url(): string
    {
        return $this->category
            ? route('blog.show.category', [$this->category->slug, $this->slug])
            : route('blog.show', $this->slug);
    }

    public function toSitemapTag(): Url
    {
        return Url::create($this->url())->setLastModificationDate($this->updated_at);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', PostStatus::Published)
            ->where(function (Builder $q): void {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }
}
