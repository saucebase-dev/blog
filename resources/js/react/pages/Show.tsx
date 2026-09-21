import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useT } from '@/i18n';
import SiteLayout from '@/layouts/SiteLayout';
import { Head, Link } from '@inertiajs/react';

import PostCard from '../components/PostCard';
import PostCategory from '../components/PostCategory';
import PostMeta from '../components/PostMeta';
import PostTags from '../components/PostTags';

interface ShowProps {
    post: Modules.Blog.Data.PostData;
    related: Modules.Blog.Data.PostData[];
    /** An admin viewing a post that is not public yet. */
    preview: boolean;
}

export default function Show({ post, related, preview }: ShowProps) {
    const t = useT();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt ?? undefined,
        image: post.cover_url || undefined,
        datePublished: post.published_at ?? undefined,
        dateModified: post.updated_at ?? undefined,
        author: post.author
            ? { '@type': 'Person', name: post.author.name }
            : undefined,
        url: post.url,
    };

    // The same trail as the visible breadcrumbs, which search results can show
    // in place of the raw URL.
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { name: t('Blog'), item: route('blog.index') },
            ...(post.category
                ? [
                      {
                          name: post.category.name,
                          item: route('blog.category', post.category.slug),
                      },
                  ]
                : []),
            { name: post.title, item: post.url },
        ].map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            ...crumb,
        })),
    };

    return (
        <SiteLayout
            title={post.title}
            description={post.excerpt ?? undefined}
            image={post.cover_url || undefined}
            canonical={post.url}
            type="article"
        >
            <Head>
                {preview && <meta name="robots" content="noindex, nofollow" />}
                {post.published_at && (
                    <meta
                        property="article:published_time"
                        content={post.published_at}
                    />
                )}
                {post.author && (
                    <meta
                        property="article:author"
                        content={post.author.name}
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbJsonLd).replace(
                            /</g,
                            '\\u003c',
                        ),
                    }}
                />
            </Head>
            <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-28">
                {preview && (
                    <p
                        data-testid="post-preview-banner"
                        role="status"
                        className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                    >
                        {t(
                            'Preview: this post is not published, and only admins can see it.',
                        )}
                    </p>
                )}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    href={route('blog.index')}
                                    data-testid="back-to-blog"
                                >
                                    {t('Blog')}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {post.category && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={route(
                                                'blog.category',
                                                post.category.slug,
                                            )}
                                        >
                                            {post.category.name}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        )}
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="min-w-0">
                            <BreadcrumbPage className="truncate">
                                {post.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1
                    data-testid="post-title"
                    className="text-foreground mb-4 text-4xl leading-tight font-bold sm:text-5xl"
                >
                    {post.title}
                </h1>

                <div className="mb-10">
                    <PostMeta
                        author={post.author}
                        publishedAt={post.published_at}
                    />
                </div>

                {post.cover_url && (
                    <div className="bg-muted mb-12 overflow-hidden rounded-2xl">
                        <img
                            src={post.cover_url}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <div
                    data-testid="post-content"
                    className="prose dark:prose-invert max-w-none leading-loose"
                    dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                />

                {/* Filed under: after the post, once read, they point to more
                    on the same topics. */}
                {(post.category || post.tags.length > 0) && (
                    <div
                        data-testid="post-filed-under"
                        className="border-border mt-12 space-y-3 border-t pt-8"
                    >
                        {post.category && (
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-sm font-medium">
                                    {t('Category')}:
                                </span>
                                <PostCategory category={post.category} />
                            </div>
                        )}
                        {post.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground shrink-0 text-sm font-medium">
                                    {post.tags.length === 1
                                        ? t('Tag')
                                        : t('Tags')}
                                    :
                                </span>
                                <PostTags tags={post.tags} />
                            </div>
                        )}
                    </div>
                )}
            </main>

            {related.length > 0 && (
                <section>
                    <div className="mx-auto mb-16 w-full max-w-6xl px-6 py-8">
                        <h2 className="text-foreground mb-10 text-2xl font-bold tracking-tight">
                            {t('You might also like')}
                        </h2>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <PostCard key={item.id} post={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
