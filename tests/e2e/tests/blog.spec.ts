import { expect, test } from '@e2e/fixtures';

test.describe('Blog public pages', () => {
    test.describe.configure({ mode: 'serial' });

    test('opens a published post from the index and returns', async ({
        page,
        laravel,
    }) => {
        const post = await laravel.factory('Modules\\Blog\\Models\\Post', {
            category_id: null,
            published_at: new Date(Date.now() - 60_000).toISOString(),
        });

        await page.goto('/blog');
        await expect(page).toHaveTitle(/Blog/);

        await page.getByTestId(`post-card-${post.id}`).click();
        await expect(page.getByTestId('post-title')).toBeVisible();
        await expect(page.getByTestId('post-content')).toBeVisible();

        await page.getByTestId('back-to-blog').click();
        await expect(page).toHaveURL(/\/blog$/);
    });

    test('post page publishes canonical and structured data', async ({
        page,
        laravel,
    }) => {
        const post = await laravel.factory('Modules\\Blog\\Models\\Post', {
            category_id: null,
            title: 'Structured </script> title',
            published_at: new Date(Date.now() - 60_000).toISOString(),
        });

        await page.goto('/blog');
        await page.getByTestId(`post-card-${post.id}`).click();
        await expect(page.getByTestId('post-title')).toBeVisible();

        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveAttribute('href', page.url());

        const jsonLd = JSON.parse(
            (await page
                .locator('script[type="application/ld+json"]')
                .textContent()) ?? '{}',
        );
        expect(jsonLd['@type']).toBe('Article');
        expect(jsonLd.headline).toBe('Structured </script> title');
        expect(jsonLd.url).toBe(page.url());
    });

    test('paginated index pages carry their own canonical URL', async ({
        page,
        laravel,
    }) => {
        await laravel.factory(
            'Modules\\Blog\\Models\\Post',
            {
                category_id: null,
                published_at: new Date(Date.now() - 60_000).toISOString(),
            },
            13,
        );

        await page.goto('/blog');
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
            'href',
            /\/blog$/,
        );

        await page.getByTestId('pagination-next').click();
        await expect(page).toHaveURL(/\/blog\?page=2$/);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
            'href',
            /\/blog\?page=2$/,
        );
        await expect(page.getByTestId('pagination-previous')).toBeVisible();
    });
});
