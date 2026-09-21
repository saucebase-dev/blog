<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\BlogController;

Route::middleware('web')->group(function (): void {
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    // Before the post routes, which would otherwise read these as a post or a category.
    Route::get('/blog/feed', [BlogController::class, 'feed'])->name('blog.feed');
    Route::get('/blog/category/{category:slug}', [BlogController::class, 'category'])->name('blog.category');
    Route::get('/blog/tag/{tag:slug}', [BlogController::class, 'tag'])->name('blog.tag');
    Route::get('/blog/{category}/{slug}', [BlogController::class, 'show'])->name('blog.show.category');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
});
