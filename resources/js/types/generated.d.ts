declare namespace Modules.Blog.Data {
export type AuthorData = {
name: string;
avatar_url: string | null;
};
export type CategoryData = {
name: string;
slug: string;
};
export type PostData = {
id: number;
title: string;
slug: string;
excerpt: string | null;
cover_url: string;
published_at: string | null;
category: Modules.Blog.Data.CategoryData | null;
author: Modules.Blog.Data.AuthorData | null;
url: string;
content: string | null;
};
}
declare namespace Modules.Blog.Enums {
export type PostStatus = 'draft' | 'published';
}
