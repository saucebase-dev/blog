# Saucebase Blog

<div align="center">

[![Tests](https://github.com/saucebase-dev/blog/actions/workflows/test.yml/badge.svg)](https://github.com/saucebase-dev/blog/actions/workflows/test.yml)
[![Release](https://img.shields.io/github/v/release/saucebase-dev/blog)](https://github.com/saucebase-dev/blog/releases)
[![Saucebase Core](https://img.shields.io/packagist/dependency-v/saucebase/blog/saucebase%2Fcore?label=Saucebase%20Core&color=FF6B35)](https://github.com/saucebase-dev/core)
[![License](https://img.shields.io/github/license/saucebase-dev/blog)](LICENSE)

</div>

A blog for Saucebase: posts, categories, tags, RSS and SEO, managed from the admin.

A module for [Saucebase](https://github.com/saucebase-dev/saucebase), the AI-ready Laravel SaaS kit. Modules are Composer packages you add to a Saucebase app; once installed, the code is yours to change.

## Features

- **Posts** with a rich text editor, cover image, excerpt and author
- **Categories and tags**, each with its own page
- **Scheduling**: posts go live on their publish date
- **Draft preview** on the real page before publishing
- **Old links keep working**: changed slugs redirect to the new URL
- **Built for search**: server-rendered pages, meta tags, breadcrumbs and structured data
- **RSS feed** at `/blog/feed`
- **Safe by default**: post HTML is cleaned before it reaches the page
- **Admin panel** for posts, categories and tags
- **Vue and React**

## Install

**New to Saucebase?** Start a new app and pick **blog** when it asks for modules:

```bash
curl -fsSL https://install.saucebase.dev | bash
```

It installs PHP and Composer if they're missing. With the CLI already installed, run `saucebase new my-app` instead.

**Already have a Saucebase app?** Add it with:

```bash
php artisan saucebase:module-install blog
npm install && npm run build
```

## Configuration

Nothing to set up. Everything is in the admin panel, under **Blog**.

## Show latest posts on the homepage (optional)

The module ships `LatestPostsSection` for this. To show it, use core's `home::content.after` slot. Paths below are relative to the module's `resources/js/`. A flat install keeps one stack there; a checkout with both keeps them in `vue/` and `react/`, so use the folder of the stack you run.

1. Share the newest posts on the homepage only, from `shareInertiaData()` in `src/Providers/BlogServiceProvider.php` (core's hook for shared props, called from `boot()`):

   ```php
   use Inertia\Inertia;
   use Modules\Blog\Data\PostData;
   use Modules\Blog\Models\Post;

   protected function shareInertiaData(): void
   {
       Inertia::share('blog.home', fn () => request()->routeIs('index')
           ? Post::published()
               ->with(['category', 'tags', 'author', 'media'])
               ->orderByDesc('published_at')
               ->limit(3)
               ->get()
               ->map(fn (Post $post) => PostData::fromPost($post))
           : null);
   }
   ```

2. Add `components/HomeLatestPosts`, next to `LatestPostsSection`:

   ```vue
   <!-- Vue: components/HomeLatestPosts.vue -->
   <script setup lang="ts">
   import { usePage } from '@inertiajs/vue3';
   import { computed } from 'vue';
   import LatestPostsSection from './LatestPostsSection.vue';

   const posts = computed(() => usePage().props.blog?.home);
   </script>

   <template>
       <LatestPostsSection v-if="posts?.length" :posts="posts" />
   </template>
   ```

   ```tsx
   // React: components/HomeLatestPosts.tsx
   import { usePage } from '@inertiajs/react';
   import LatestPostsSection from './LatestPostsSection';

   export function HomeLatestPosts() {
       const posts = usePage().props.blog?.home;

       return posts?.length ? <LatestPostsSection posts={posts} /> : null;
   }
   ```

3. Register it inside `setup()` in the module's `app` entry. A lower `order` renders first; billing's pricing example uses `10`. Use your stack's alias, `@saucebase/vue` or `@saucebase/react`:

   ```ts
   import { registerGlobalComponent } from '@saucebase/<stack>/lib/globalComponents';
   import HomeLatestPosts from './components/HomeLatestPosts.vue'; // React: import { HomeLatestPosts } from './components/HomeLatestPosts';

   // inside setup()
   registerGlobalComponent('home::content.after', HomeLatestPosts, { order: 20 });
   ```

Run `npm run build` afterwards.

## Demo data

```bash
php artisan modules:seed --module=blog --demo
```

Adds sample posts, categories and tags, and a staff account (`blog@saucebase.dev`) that only sees the blog in the admin. It uses the `DEMO_PASSWORD` from `.env`.

## License

MIT. See [LICENSE](LICENSE).
