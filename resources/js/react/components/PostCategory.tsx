import { Link } from '@inertiajs/react';

export default function PostCategory({
    category,
}: {
    category: Modules.Blog.Data.CategoryData;
}) {
    // `relative z-10` lifts the link above a card's stretched link, so it stays
    // clickable on its own.
    return (
        <Link
            href={route('blog.category', category.slug)}
            data-testid="post-category-link"
            className="bg-secondary/80 text-secondary-foreground/80 hover:bg-secondary relative z-10 self-start rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
        >
            {category.name}
        </Link>
    );
}
