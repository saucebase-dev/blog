import preview from '@/.storybook/preview';
import { expect } from 'storybook/test';
import PostMeta from './PostMeta';

/**
 * Who wrote a post and when: the author's photo (or initial), name and date, in the
 * visitor's language.
 */
const meta = preview.meta({
    title: 'Blog/PostMeta',
    component: PostMeta,
    args: {
        author: {
            name: 'Ada Lovelace',
            avatar_url: '/images/default-avatar.jpg',
        },
        publishedAt: '2026-11-20T09:00:00Z',
    },
});
export default meta;

/** Photo, name and date. */
export const Default = meta.story({
    play: async ({ canvas }) => {
        await expect(canvas.getByText('Ada Lovelace')).toBeVisible();
        await expect(canvas.getByText(/2026/)).toBeVisible();
    },
});

/** An author without a photo: their initial. */
export const WithoutPhoto = meta.story({
    args: { author: { name: 'Grace Hopper', avatar_url: null } },
    play: async ({ canvas }) => {
        await expect(canvas.getByText('G')).toBeVisible();
    },
});

/** No author, a date only. */
export const WithoutAuthor = meta.story({
    args: { author: null },
    play: async ({ canvas }) => {
        await expect(canvas.queryByText('Ada Lovelace')).toBeNull();
        await expect(canvas.getByText(/2026/)).toBeVisible();
    },
});
