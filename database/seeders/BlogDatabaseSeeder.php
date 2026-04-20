<?php

namespace Modules\Blog\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Blog\Models\Category;
use Modules\Blog\Models\Post;

class BlogDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $author = User::first();

        $categories = Category::factory(3)->create();

        Post::factory(6)->published()->create([
            'category_id' => fn () => $categories->random()->id,
            'author_id' => $author?->id,
        ]);

        Post::factory(4)->published()->create([
            'category_id' => null,
            'author_id' => $author?->id,
        ]);
    }
}
