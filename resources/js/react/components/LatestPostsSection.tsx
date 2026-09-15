import { useT } from '@/i18n';
import { Link } from '@inertiajs/react';

import PostCard from './PostCard';

export default function LatestPostsSection({
    posts,
}: {
    posts: Modules.Blog.Data.PostData[];
}) {
    const t = useT();

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <h2 className="text-foreground text-4xl font-bold tracking-tight">
                        {t('From the blog')}
                    </h2>
                    <p className="text-muted-foreground mt-2 text-lg">
                        {t('Tips, insights, and updates from our team.')}
                    </p>
                </div>
                <Link
                    href={route('blog.index')}
                    className="text-primary shrink-0 text-sm font-medium underline-offset-4 hover:underline"
                >
                    {t('View all')} →
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
