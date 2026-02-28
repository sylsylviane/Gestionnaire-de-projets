import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/projects';
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
    projects: Project[];
};

export default function ProjectsIndex({ projects }: Props) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Projects'),
            href: '',
        },
    ];

    // Badge dynamique selon status
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'en_cours':
                return 'default';
            case 'termine':
                return 'secondary';
            case 'suspendu':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    // Traduction type bâtiment
    const formatBuildingType = (type: string) => {
        switch (type) {
            case 'combustible':
                return t('Combustible');
            case 'incombustible_acier':
                return t('Steel');
            case 'incombustible_beton':
                return t('Concrete');
            default:
                return type;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Projects')} />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {t('Projects')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t('Manage your projects here')}
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={create.url()}>{t('Create Project')}</Link>
                    </Button>
                </div>

                {/* Empty state */}
                {projects.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                        <p className="mb-4 text-sm text-muted-foreground">
                            {t('No projects found')}
                        </p>

                        <Button asChild>
                            <Link href={create.url()}>
                                {t('Create your first project')}
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted">
                                    <th className="px-4 py-3 text-left font-medium">
                                        {t('Project Name')}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        {t('# Project')}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        {t('Building Type')}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        {t('Status')}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        {t('Drawer')}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {project.project_name}
                                        </td>

                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.project_number}
                                        </td>

                                        <td className="px-4 py-3">
                                            {formatBuildingType(
                                                project.building_type,
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={getStatusVariant(
                                                    project.status,
                                                )}
                                            >
                                                {t(project.status)}
                                            </Badge>
                                        </td>

                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.users.length > 0
                                                ? project.users
                                                      .map((u) => u.name)
                                                      .join(', ')
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
