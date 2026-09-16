<script setup lang="ts">
import SiteLayout from '@/layouts/SiteLayout.vue';
import { Link } from '@inertiajs/vue3';
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
        <!-- Hero -->
        <section
            data-testid="blog-hero"
            class="from-secondary-900 to-secondary/30 text-foreground bg-linear-to-br pt-8"
        >
            <div
                class="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:flex-row sm:items-center sm:justify-between"
            >
                <div class="flex items-center gap-5">
                    <div
                        class="bg-foreground/5 rounded-full p-7 backdrop-blur-sm"
                    >
                        <IconNewspaper class="size-14" />
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold tracking-tight">
                            {{ $t('Blog') }}
                        </h1>
                        <p class="mt-2 max-w-2xl text-white/80">
                            {{
                                $t('Tips, insights, and updates from our team.')
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

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
