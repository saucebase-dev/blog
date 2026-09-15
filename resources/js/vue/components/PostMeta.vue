<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

defineProps<{
    author: Modules.Blog.Data.AuthorData | null;
    publishedAt: string | null;
}>();

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
}
</script>

<template>
    <div class="flex items-center gap-2">
        <Avatar v-if="author" class="size-6">
            <AvatarImage :src="author.avatar_url ?? ''" :alt="author.name" />
            <AvatarFallback
                class="bg-primary/20 text-primary text-xs font-bold"
            >
                {{ author.name.charAt(0).toUpperCase() }}
            </AvatarFallback>
        </Avatar>
        <div class="flex items-center gap-3 text-sm">
            <span v-if="author" class="text-foreground font-semibold">{{
                author.name
            }}</span>
            <time v-if="publishedAt" class="text-muted-foreground">{{
                formatDate(publishedAt)
            }}</time>
        </div>
    </div>
</template>
