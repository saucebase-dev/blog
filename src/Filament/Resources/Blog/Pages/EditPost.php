<?php

namespace Modules\Blog\Filament\Resources\Blog\Pages;

use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Modules\Blog\Filament\Resources\Blog\PostResource;
use Modules\Blog\Models\Post;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('view_post')
                ->label(fn (Post $record): string => $record->isPubliclyVisible() ? __('View Post') : __('Preview'))
                ->icon('heroicon-o-arrow-top-right-on-square')
                ->color('gray')
                ->url(fn (Post $record): string => $record->viewUrl())
                ->openUrlInNewTab(),
            DeleteAction::make(),
        ];
    }
}
