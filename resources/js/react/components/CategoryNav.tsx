import { useT } from '@/i18n';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const base = 'rounded-full px-3 py-1.5 text-sm font-medium transition-colors';
const idle = 'bg-muted text-muted-foreground hover:text-foreground';
const current = 'bg-primary text-primary-foreground';

export default function CategoryNav({
    categories,
    active,
    allActive,
}: {
    categories: Modules.Blog.Data.CategoryData[];
    /** The category being listed; null on the blog index and on tag pages. */
    active: string | null;
    /** True on the blog index, where "All" is the current page. */
    allActive: boolean;
}) {
    const t = useT();

    if (categories.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label={t('Categories')}
            data-testid="category-nav"
            className="mb-10 flex flex-wrap gap-2"
        >
            <Link
                href={route('blog.index')}
                data-testid="category-nav-all"
                aria-current={allActive ? 'page' : undefined}
                className={cn(base, allActive ? current : idle)}
            >
                {t('All')}
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.slug}
                    href={route('blog.category', category.slug)}
                    data-testid={`category-nav-${category.slug}`}
                    aria-current={active === category.slug ? 'page' : undefined}
                    className={cn(
                        base,
                        active === category.slug ? current : idle,
                    )}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}
