import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface Project {
    id: number;
    project_name: string;
    project_number: string;
    building_type: string;
    floors: number;
    status: string;
    description?: string;
    users: Array<{ id:number; name: string }>;
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

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={t('Projects')} />
                <div className="space-y-6 p-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {t('Projects')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t('Manage your projects here')}
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                {t('No projects found')}
                            </p>
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
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3">
                                                {project.project_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {project.project_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                {project.building_type}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {project.users
                                                    .map((u) => u.name)
                                                    .join(', ')}
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
