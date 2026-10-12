import { Link } from '@inertiajs/react';

export default function PostTags({
    tags,
}: {
    tags: Modules.Blog.Data.TagData[];
}) {
    if (tags.length === 0) {
        return null;
    }

    // `relative z-10` lifts the links above a card's stretched link, so they
    // stay clickable on their own.
    return (
        <div className="relative z-10 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
                <Link
                    key={tag.slug}
                    href={route('blog.tag', tag.slug)}
                    data-testid={`post-tag-${tag.slug}`}
                    className="bg-muted group-hover:bg-background text-muted-foreground hover:text-foreground rounded-full px-2.5 py-1 text-sm font-medium transition-colors"
                >
                    #{tag.name}
                </Link>
            ))}
        </div>
    );
}
