# Blog Module

## Overview

Full-featured blog with posts, categories, cover images, author attribution, and SEO metadata. Public pages are SSR-enabled (`->withSSR()`). Filament admin at `/admin` → Blog section.

Supports Vue and React: `resources/js/vue/` and `resources/js/react/` mirror each other. Change both.

---

## Non-Obvious Design

### Published Scope

`scopePublished()` requires **both** conditions: `status = Published` AND (`published_at IS NULL` OR `published_at <= now()`). A post with status Published but a future `published_at` is not yet live.

### Dual-Slug Routing

Two routes resolve a post — with and without category prefix:
- `/blog/{slug}` → `blog.show`
- `/blog/{category}/{slug}` → `blog.show.category` (404 when the post is not in that category)

`PostData::url` always points at the category route when the post has one, and the Show page uses it as the canonical URL.

### Post Content Is Sanitized on Output

The rich-editor HTML is rendered with `v-html` / `dangerouslySetInnerHTML`. `BlogController::show()` passes it through `Str::sanitizeHtml()` (Filament's Symfony sanitizer) first, so scripts and event handlers never reach the page. Keep that call if the controller changes.

The JSON-LD `<script>` escapes `<` as `<` so a title containing `</script>` cannot break out of it.

### PHP → TypeScript Contract

`Modules\Blog\Data\PostData` (spatie/laravel-data, `#[TypeScript]`) is the contract with the frontend; its types generate into `resources/js/types/generated.d.ts`. `content` is only set on the Show page via `withContent()`.

When adding a frontend field: migration + model `$fillable`, then `PostData`, then regenerate types.

### RSS Feed

`/blog/feed` (`blog.feed`) is RSS 2.0 via spatie/laravel-feed. It is built directly in `BlogController::feed()` — a `Spatie\Feed\Feed` is `Responsable` — rather than through the package's `feed.feeds` config and `Route::feeds()` macro. The macro reads that config while registering routes, which races module config merging, and going without it keeps the app free of a published `config/feed.php`.

The route must stay **above** `/blog/{slug}` in `routes/web.php`, or the catch-all resolves `feed` as a post slug.

`Post::toFeedItem()` reuses `url()`, so feed links match the canonical category URLs.

### Dates

`published_at` is sent as a date string (`2025-04-19`). `PostMeta` formats it with `timeZone: 'UTC'` so it shows the same day on the server render and in every browser time zone.

---

## Testing

```bash
# PHPUnit — this module only
php -d memory_limit=2048M artisan test --compact modules/blog/tests

# E2E
npx playwright test --project="@blog*"
```
