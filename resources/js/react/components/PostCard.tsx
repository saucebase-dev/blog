import { Link } from '@inertiajs/react';

import PostCategory from './PostCategory';
import PostMeta from './PostMeta';
import PostTags from './PostTags';

export default function PostCard({
    post,
}: {
    post: Modules.Blog.Data.PostData;
}) {
    return (
        <article
            data-testid={`post-card-${post.id}`}
            className="group hover:bg-card relative flex flex-col overflow-hidden rounded-2xl p-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="aspect-video overflow-hidden rounded-xl">
                {post.card_url ? (
                    <img
                        src={post.card_url}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(45deg,var(--primary),var(--secondary))] p-6">
                        <span className="text-center text-lg leading-snug font-bold text-white/90 drop-shadow">
                            {post.title}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 px-1 pt-4 pb-2">
                {post.category && (
                    <div>
                        <PostCategory category={post.category} />
                    </div>
                )}

                {/* The title's link stretches over the whole card, so the card
                    still opens the post without wrapping the category and tag
                    links inside another link. */}
                <h2
                    data-testid={`post-title-${post.id}`}
                    className="text-foreground text-lg font-bold transition-colors group-hover:underline"
                >
                    <Link
                        href={post.url}
                        className="after:absolute after:inset-0"
                    >
                        {post.title}
                    </Link>
                </h2>

                {post.excerpt && (
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                        {post.excerpt}
                    </p>
                )}

                <PostTags tags={post.tags} />

                <div className="mt-auto pt-2">
                    <PostMeta
                        author={post.author}
                        publishedAt={post.published_at}
                    />
                </div>
            </div>
        </article>
    );
}
