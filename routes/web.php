<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\BlogController;

Route::middleware('web')->group(function (): void {
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    // Before the catch-all post slug, or "feed" reads as one.
    Route::get('/blog/feed', [BlogController::class, 'feed'])->name('blog.feed');
    Route::get('/blog/{category}/{slug}', [BlogController::class, 'show'])->name('blog.show.category');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
});
