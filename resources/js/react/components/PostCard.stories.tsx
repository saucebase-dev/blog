import preview from '@/.storybook/preview';
import { expect } from 'storybook/test';
import PostCard from './PostCard';

/**
 * A post in a list: cover, category, title, excerpt, tags, author and date. The title's
 * link covers the whole card; the category and tags stay links of their own.
 *
 * Without a cover image, the title shows on a gradient in the theme's colours.
 */
const meta = preview.meta({
    title: 'Blog/PostCard',
    component: PostCard,
    args: {
        post: {
            id: 1,
            title: 'Shipping a SaaS in a weekend',
            slug: 'shipping-a-saas-in-a-weekend',
            excerpt:
                'What we cut, what we kept, and the three modules that did most of the work.',
            cover_url: '',
            card_url: '',
            published_at: '2026-11-20T09:00:00Z',
            updated_at: null,
            category: { name: 'Guides', slug: 'guides' },
            tags: [
                { name: 'billing', slug: 'billing' },
                { name: 'auth', slug: 'auth' },
            ],
            author: { name: 'Ada Lovelace', avatar_url: null },
            url: '/blog/shipping-a-saas-in-a-weekend',
            content: null,
        },
    },
    decorators: [
        (Story) => (
            <div className="max-w-sm">
                <Story />
            </div>
        ),
    ],
});
export default meta;

/** Every part filled in. */
export const Default = meta.story({
    play: async ({ canvas }) => {
        await expect(
            canvas.getByRole('link', { name: 'Shipping a SaaS in a weekend' }),
        ).toBeVisible();
        await expect(
            canvas.getByRole('link', { name: 'Guides' }),
        ).toBeVisible();
        await expect(
            canvas.getByRole('link', { name: '#billing' }),
        ).toBeVisible();
        await expect(canvas.getByText('Ada Lovelace')).toBeVisible();
    },
});

/** Only a title: no category, excerpt, tags or author. */
export const Minimal = meta.story({
    args: {
        post: {
            id: 2,
            title: 'Release notes: November',
            slug: 'release-notes-november',
            excerpt: null,
            cover_url: '',
            card_url: '',
            published_at: null,
            updated_at: null,
            category: null,
            tags: [],
            author: null,
            url: '/blog/release-notes-november',
            content: null,
        },
    },
    play: async ({ canvas }) => {
        await expect(canvas.getAllByRole('link')).toHaveLength(1);
    },
});
