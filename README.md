# Blog Module

<div align="center">

[![Tests](https://github.com/saucebase-dev/blog/actions/workflows/test.yml/badge.svg)](https://github.com/saucebase-dev/blog/actions/workflows/test.yml)
[![Release](https://img.shields.io/github/v/release/saucebase-dev/blog)](https://github.com/saucebase-dev/blog/releases)
[![Saucebase](https://img.shields.io/badge/Saucebase-1.1+-FF6B35)](https://github.com/saucebase-dev/saucebase)
[![PHP](https://img.shields.io/badge/PHP-8.4+-777BB4?logo=php&logoColor=white)](https://php.net)

Works with:<br/>
[![Vue 3.5](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org) [![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)

</div>

A blog for [Saucebase](https://github.com/saucebase-dev/saucebase), a Laravel SaaS starter kit.

Adds `/blog` with posts, categories, tags, cover images and an RSS feed. Write in the admin, schedule for later, and the pages are server-rendered so search engines can read them.

**[Full documentation →](https://saucebase-dev.github.io/docs/modules/blog)**

## Features

- **Posts** — rich text editor, cover image, excerpt and author
- **Categories** — one per post, with the category in the URL and its own page
- **Tags** — as many per post as you like, each with its own page
- **Browse by topic** — a category menu on every listing page
- **Scheduling** — set a publish date and the post goes live on its own
- **Old links keep working** — change a slug or move a post to another category, and the old URL redirects to the new one
- **Built for search** — server-rendered pages, meta tags, breadcrumbs, and structured data
- **RSS feed** — at `/blog/feed`
- **Safe by default** — post HTML is cleaned before it reaches the page
- **Admin panel** — manage posts, categories and tags at `/admin`
- **Vue and React** — works on both

## Requirements

| | |
| --- | --- |
| Saucebase core | `^1.1` |
| Modules | [Auth](https://github.com/saucebase-dev/auth) |
| PHP packages | `spatie/laravel-feed` |

## Installation

```bash
composer require saucebase/blog
php artisan migrate
npm run build
```

Then go to `/admin` → Blog and write your first post. There is nothing to configure.

### Sample data (optional)

```bash
php artisan modules:seed --module=blog --demo
```

Adds sample posts and categories so you can see the layout before writing anything.

## Writing a post

In `/admin` → Blog → Posts:

- **Status** — Draft or Published
- **Published at** — leave it empty to go live now, or set a future date to schedule it

A post is only live when it is Published *and* its date has passed.

Posts are reachable two ways: `/blog/my-post` and `/blog/my-category/my-post`. If the post has a category, the second one is the canonical URL — that is what search engines are told to use.

Each category has a page at `/blog/category/my-category`, and each tag at `/blog/tag/my-tag`. A post has one category, which decides its URL, and as many tags as you like, which don't.

Three words are reserved and can't be used as slugs: `category` and `tag` for categories, `feed` for posts.

## Extending

**Change the pages.** The index and post pages are normal Vue and React pages in `resources/js/`. Edit them like any other.

**Add a field.** Add it to a migration and the model, then to `PostData` — that is the one place the frontend gets its data from. Regenerate the types afterwards.

## Configuration

Nothing to set up. Everything is in the admin.

See the [documentation](https://saucebase-dev.github.io/docs/modules/blog) for customising the feed, the layout and the metadata.

## License

Proprietary. Part of [Saucebase](https://github.com/saucebase-dev/saucebase).
