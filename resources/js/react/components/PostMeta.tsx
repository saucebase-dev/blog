import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/i18n';
import { formatDate } from '@js/lib/dates';

interface PostMetaProps {
    author: Modules.Blog.Data.AuthorData | null;
    publishedAt: string | null;
}

export default function PostMeta({ author, publishedAt }: PostMetaProps) {
    const { locale } = useTranslation();

    return (
        <div className="flex items-center gap-2">
            {author && (
                <Avatar className="size-6">
                    <AvatarImage
                        src={author.avatar_url ?? undefined}
                        alt={author.name}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                        {author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}
            <div className="flex items-center gap-3 text-sm">
                {author && (
                    <span className="text-foreground font-semibold">
                        {author.name}
                    </span>
                )}
                {publishedAt && (
                    <time className="text-muted-foreground">
                        {formatDate(publishedAt, locale)}
                    </time>
                )}
            </div>
        </div>
    );
}
