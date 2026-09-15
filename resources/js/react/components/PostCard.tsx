import { Link } from '@inertiajs/react';

import PostMeta from './PostMeta';

export default function PostCard({
    post,
}: {
    post: Modules.Blog.Data.PostData;
}) {
    return (
        <article
            data-testid={`post-card-${post.id}`}
            className="group hover:bg-card flex flex-col overflow-hidden rounded-2xl p-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
            <Link href={post.url} className="flex flex-1 flex-col">
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
                            <span className="bg-secondary/80 text-secondary-foreground/80 inline-block rounded-full px-2.5 py-1 text-xs font-semibold">
                                {post.category.name}
                            </span>
                        </div>
                    )}

                    <h2
                        data-testid={`post-title-${post.id}`}
                        className="text-foreground text-lg font-bold transition-colors group-hover:underline"
                    >
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3 text-sm">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-auto pt-2">
                        <PostMeta
                            author={post.author}
                            publishedAt={post.published_at}
                        />
                    </div>
                </div>
            </Link>
        </article>
    );
}
