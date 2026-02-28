import { Head,} from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/projects';
import type { BreadcrumbItem } from '@/types';

interface Project {
    id: number;
    project_name: string;
    project_number: string;
    building_type: string;
    floors: number;
    status: string;
    description?: string;
    users: Array<{ id: number; name: string }>;
}

type Props = {
    project: Project;
};

export default function ProjectsEdit({ project }: Props) {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Projects'),
            href: index().url,
        },
        {
            title: t('Edit Project'),
            href: edit.url(project.id),
        },
        {
            title: project.project_name,
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Edit Project')} />
            <h1 className="sr-only">{t('Edit Project')}</h1>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{project.project_name}</h2>
                <p className="text-sm text-muted-foreground">
                    {t('Edit the details of your project')}
                </p>
            </div>

        </AppLayout>
    );
}