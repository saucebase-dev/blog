<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import PostMeta from './PostMeta.vue';
defineProps<{
    post: Modules.Blog.Data.PostData;
}>();
</script>

<template>
    <article
        :data-testid="`post-card-${post.id}`"
        class="group flex flex-col overflow-hidden p-2 transition-all duration-200 hover:-translate-y-1 hover:rounded-2xl hover:shadow-xl hover:bg-card"
    >
        <Link :href="post.url" class="flex flex-col flex-1">
        <!-- Cover image -->
        <div class="aspect-video overflow-hidden rounded-xl">
            <img
                v-if="post.cover_url"
                :src="post.cover_url"
                :alt="post.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
                v-else
                class="relative flex h-full w-full items-center justify-center bg-[linear-gradient(45deg,var(--primary),var(--secondary))] p-6"
            >
                <span class="text-center text-lg font-bold leading-snug text-white/90 drop-shadow">
                    {{ post.title }}
                </span>
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-6">
            <!-- Category badge -->
            <div v-if="post.category">
                <span class="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary dark:bg-primary/20">
                    {{ post.category.name }}
                </span>
            </div>

            <!-- Title -->
            <h2
                :data-testid="`post-title-${post.id}`"
                class="text-foreground text-lg font-bold transition-colors group-hover:underline"
            >
                {{ post.title }}
            </h2>

            <!-- Excerpt -->
            <p v-if="post.excerpt" class="text-muted-foreground line-clamp-3 text-sm">
                {{ post.excerpt }}
            </p>

            <!-- Author + publish date -->
            <div class="mt-auto pt-2">
                <PostMeta :author="post.author" :published-at="post.published_at" />
            </div>
        </div>
        </Link>
    </article>
</template>
