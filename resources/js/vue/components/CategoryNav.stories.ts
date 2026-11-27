import preview from '@/.storybook/preview';
import { expect } from 'storybook/test';
import CategoryNav from './CategoryNav.vue';

/**
 * The blog's categories above its posts, with "All" first. The current one is filled.
 * Renders nothing when the blog has no categories.
 */
const meta = preview.meta({
    title: 'Blog/CategoryNav',
    component: CategoryNav,
    args: {
        categories: [
            { name: 'Guides', slug: 'guides' },
            { name: 'Product', slug: 'product' },
            { name: 'Engineering', slug: 'engineering' },
        ],
        active: null,
        allActive: true,
    },
});
export default meta;

/** On the blog's index: "All" is current. */
export const Default = meta.story({
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('link', { name: 'All' })).toHaveAttribute(
            'aria-current',
            'page',
        );
    },
});

/** On a category's page: that category is current. */
export const CategorySelected = meta.story({
    args: { active: 'product', allActive: false },
    play: async ({ canvas }) => {
        await expect(
            canvas.getByRole('link', { name: 'Product' }),
        ).toHaveAttribute('aria-current', 'page');
        await expect(
            canvas.getByRole('link', { name: 'All' }),
        ).not.toHaveAttribute('aria-current');
    },
});

/** No categories: nothing renders. */
export const Empty = meta.story({
    args: { categories: [] },
    play: async ({ canvas }) => {
        await expect(canvas.queryByRole('navigation')).toBeNull();
    },
});
