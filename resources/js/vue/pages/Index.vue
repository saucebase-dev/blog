<script setup lang="ts">
import { PageHero } from '@/components/ui/saucebase';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

import PostCard from '../components/PostCard.vue';
import type { PaginatedPosts } from '../../types';

import IconNewspaper from '~icons/heroicons/newspaper';

const props = defineProps<{
    posts: PaginatedPosts;
}>();

const canonical = computed(() =>
    props.posts.current_page > 1
        ? route('blog.index', { page: props.posts.current_page })
        : route('blog.index'),
);
</script>

<template>
    <SiteLayout
        :title="$t('Blog')"
        :description="$t('Tips, insights, and updates from our team.')"
        :canonical="canonical"
    >
        <Head>
            <link
                rel="alternate"
                type="application/rss+xml"
                :title="$t('Blog')"
                :href="route('blog.feed')"
            />
        </Head>

        <PageHero
            test-id="blog-hero"
            :title="$t('Blog')"
            :description="$t('Tips, insights, and updates from our team.')"
            :icon="IconNewspaper"
            width="5xl"
        />

        <div class="w-full">
            <main class="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
                <!-- Empty state -->
                <div
                    v-if="posts.data.length === 0"
                    class="flex flex-col items-center justify-center py-20 text-center"
                >
                    <p class="text-muted-foreground">
                        {{ $t('No posts yet. Check back soon!') }}
                    </p>
                </div>

                <!-- Post grid -->
                <div
                    v-else
                    class="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2"
                >
                    <PostCard
                        v-for="post in posts.data"
                        :key="post.id"
                        :post="post"
                    />
                </div>

                <!-- Pagination -->
                <div
                    v-if="posts.last_page > 1"
                    class="mt-14 flex justify-center gap-2"
                >
                    <Link
                        v-if="posts.prev_page_url"
                        data-testid="pagination-previous"
                        :href="posts.prev_page_url"
                        class="bg-card text-card-foreground ring-border hover:bg-accent mt-8 cursor-pointer rounded-xl px-4 py-3 font-semibold shadow-lg ring-1 transition-all duration-200 ring-inset focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {{ $t('← Previous') }}
                    </Link>
                    <Link
                        v-if="posts.next_page_url"
                        data-testid="pagination-next"
                        :href="posts.next_page_url"
                        class="bg-card text-card-foreground ring-border hover:bg-accent mt-8 cursor-pointer rounded-xl px-4 py-3 font-semibold shadow-lg ring-1 transition-all duration-200 ring-inset focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {{ $t('Next →') }}
                    </Link>
                </div>
            </main>
        </div>
    </SiteLayout>
</template>
