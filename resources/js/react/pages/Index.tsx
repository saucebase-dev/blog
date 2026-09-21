import { PageHero } from '@/components/ui/saucebase';
import { useT } from '@/i18n';
import SiteLayout from '@/layouts/SiteLayout';
import { Head, Link } from '@inertiajs/react';

import type { ListingHeading, PaginatedPosts } from '../../types';
import CategoryNav from '../components/CategoryNav';
import PostCard from '../components/PostCard';

import IconNewspaper from '~icons/heroicons/newspaper';

const paginationClass =
    'bg-card text-card-foreground ring-border hover:bg-accent mt-8 cursor-pointer rounded-xl px-4 py-3 font-semibold shadow-lg ring-1 transition-all duration-200 ring-inset focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2';

export default function Index({
    posts,
    heading,
    categories,
    activeCategory,
}: {
    posts: PaginatedPosts;
    heading: ListingHeading | null;
    categories: Modules.Blog.Data.CategoryData[];
    activeCategory: string | null;
}) {
    const t = useT();
    const title = heading?.title ?? t('Blog');
    const description =
        heading?.description ?? t('Tips, insights, and updates from our team.');
    const canonical =
        posts.current_page > 1
            ? `${posts.path}?page=${posts.current_page}`
            : posts.path;

    return (
        <SiteLayout
            title={title}
            description={description}
            canonical={canonical}
        >
            <Head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={t('Blog')}
                    href={route('blog.feed')}
                />
            </Head>

            <PageHero
                testId="blog-hero"
                title={title}
                description={description}
                icon={IconNewspaper}
                width="5xl"
            />

            <div className="w-full">
                <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
                    <CategoryNav
                        categories={categories}
                        active={activeCategory}
                        allActive={heading === null}
                    />
                    {posts.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-muted-foreground">
                                {t('No posts yet. Check back soon!')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2">
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}

                    {posts.last_page > 1 && (
                        <div className="mt-14 flex justify-center gap-2">
                            {posts.prev_page_url && (
                                <Link
                                    href={posts.prev_page_url}
                                    data-testid="pagination-previous"
                                    className={paginationClass}
                                >
                                    {t('← Previous')}
                                </Link>
                            )}
                            {posts.next_page_url && (
                                <Link
                                    href={posts.next_page_url}
                                    data-testid="pagination-next"
                                    className={paginationClass}
                                >
                                    {t('Next →')}
                                </Link>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </SiteLayout>
    );
}
