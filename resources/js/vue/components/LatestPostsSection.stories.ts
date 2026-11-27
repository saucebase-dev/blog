import preview from '@/.storybook/preview';
import { expect } from 'storybook/test';
import LatestPostsSection from './LatestPostsSection.vue';

/** The newest posts on another page, such as the home page, with a link to the blog. */
const meta = preview.meta({
    title: 'Blog/LatestPostsSection',
    component: LatestPostsSection,
    parameters: { layout: 'fullscreen' },
    args: {
        posts: [
            {
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
                tags: [],
                author: { name: 'Ada Lovelace', avatar_url: null },
                url: '/blog/shipping-a-saas-in-a-weekend',
                content: null,
            },
            {
                id: 2,
                title: 'Why we moved billing to Stripe Checkout',
                slug: 'stripe-checkout',
                excerpt:
                    'Fewer forms to keep up to date, and tax handled for us.',
                cover_url: '',
                card_url: '',
                published_at: '2026-11-12T09:00:00Z',
                updated_at: null,
                category: { name: 'Engineering', slug: 'engineering' },
                tags: [{ name: 'billing', slug: 'billing' }],
                author: { name: 'Grace Hopper', avatar_url: null },
                url: '/blog/stripe-checkout',
                content: null,
            },
            {
                id: 3,
                title: 'Release notes: November',
                slug: 'release-notes-november',
                excerpt: null,
                cover_url: '',
                card_url: '',
                published_at: '2026-11-01T09:00:00Z',
                updated_at: null,
                category: { name: 'Product', slug: 'product' },
                tags: [],
                author: null,
                url: '/blog/release-notes-november',
                content: null,
            },
        ],
    },
});
export default meta;

/** Three posts and the link to the blog. */
export const Default = meta.story({
    play: async ({ canvas }) => {
        await expect(
            canvas.getByRole('heading', { name: 'From the blog' }),
        ).toBeVisible();
        await expect(canvas.getAllByRole('article')).toHaveLength(3);
        await expect(
            canvas.getByRole('link', { name: /View all/ }),
        ).toBeVisible();
    },
});
