import { Form, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { edit, update, index } from '@/routes/projects';
import type { Project } from '@/types';
import type { BreadcrumbItem } from '@/types';

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
                <h2 className="text-lg font-semibold">
                    {project.project_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {t('Edit the details of your project')}
                </p>
            </div>

            <Form {...update.form(project)} className="space-y-6 p-4">
                {({ processing, errors }) => (
                    <>
                        <div>
                            <h3 className="text-lg font-semibold">
                                {t('Edit Project')}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {t('Fill in the details to edit your project')}
                            </p>
                        </div>

                        {/* Project Number */}
                        <div>
                            <Label htmlFor="project_number">
                                {t('Project Number')}
                            </Label>
                            <Input
                                id="project_number"
                                name="project_number"
                                defaultValue={project.project_number}
                                required
                            />
                            <InputError message={errors.project_number} />
                        </div>

                        {/* Project Name */}
                        <div>
                            <Label htmlFor="project_name">
                                {t('Project Name')}
                            </Label>
                            <Input
                                id="project_name"
                                name="project_name"
                                defaultValue={project.project_name}
                                required
                            />
                            <InputError message={errors.project_name} />
                        </div>

                        {/* Building Type */}
                        <div>
                            <Label htmlFor="building_type">
                                {t('Building Type')}
                            </Label>

                            <Select
                                name="building_type"
                                defaultValue={project.building_type}
                                required
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue
                                        placeholder={t(
                                            'Select a building type',
                                        )}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="combustible">
                                        {t('Combustible')}
                                    </SelectItem>
                                    <SelectItem value="incombustible_acier">
                                        {t('Acier')}
                                    </SelectItem>
                                    <SelectItem value="incombustible_beton">
                                        {t('Béton')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.building_type} />
                        </div>

                        {/* Floors */}
                        <div>
                            <Label htmlFor="floors">
                                {t('Number of Floors')}
                            </Label>
                            <Input
                                id="floors"
                                defaultValue={project.floors}
                                type="number"
                                name="floors"
                                min={0}
                                required
                            />
                            <InputError message={errors.floors} />
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">
                                {t('Description')}
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                defaultValue={project.description || ''}
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Status */}
                        <div>
                            <Label htmlFor="status">{t('Status')}</Label>

                            <Select
                                name="status"
                                defaultValue={project.status}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en_cours">
                                        {t('En cours')}
                                    </SelectItem>
                                    <SelectItem value="termine">
                                        {t('Terminé')}
                                    </SelectItem>
                                    <SelectItem value="suspendu">
                                        {t('Suspendu')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {t('Edit Project')}
                        </Button>
                    </>
                )}
            </Form>
        </AppLayout>
    );
}
