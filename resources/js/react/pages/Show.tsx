import { useT } from '@/i18n';
import SiteLayout from '@/layouts/SiteLayout';
import { Head, Link } from '@inertiajs/react';

import PostCard from '../components/PostCard';
import PostMeta from '../components/PostMeta';

interface ShowProps {
    post: Modules.Blog.Data.PostData;
    related: Modules.Blog.Data.PostData[];
}

export default function Show({ post, related }: ShowProps) {
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

    return (
        <SiteLayout
            title={post.title}
            description={post.excerpt ?? undefined}
            image={post.cover_url || undefined}
            canonical={post.url}
            type="article"
        >
            <Head>
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
            </Head>
            <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-28">
                <Link
                    href={route('blog.index')}
                    data-testid="back-to-blog"
                    className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
                >
                    ← {t('Back to Blog')}
                </Link>

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
