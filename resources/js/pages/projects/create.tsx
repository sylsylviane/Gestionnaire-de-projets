import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import type { BreadcrumbItem } from '@/types';

export default function ProjectsCreate() {
    const { t } = useTranslation();
    const [buildingType, setBuildingType] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Create a new project'),
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Create a new project')} />
            <div className="space-y-6 p-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {t('Create a new project')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {t('Fill in the details to create a new project')}
                    </p>
                </div>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="project_name">
                            {t('Project Name')}
                        </Label>
                        <Input
                            id="project_name"
                            name="project_name"
                            placeholder={t('Enter project name')}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="project_number">
                            {t('Project Number')}
                        </Label>
                        <Input
                            id="project_number"
                            name="project_number"
                            placeholder={t('Enter project number')}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="building_type">
                            {t('Building Type')}
                        </Label>
                        <Select
                            value={buildingType}
                            onValueChange={setBuildingType}
                        >
                            <SelectTrigger id="building_type" className="mt-1">
                                <SelectValue
                                    placeholder={t('Select a building type')}
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
                    </div>

                    <div>
                        <Label htmlFor="floors">{t('Number of Floors')}</Label>
                        <Input
                            id="floors"
                            name="floors"
                            type="number"
                            placeholder={t('Enter number of floors')}
                            className="mt-1"
                        />
                    </div>
                    <Button type="submit">{t('Create Project')}</Button>
                </div>
            </div>
        </AppLayout>
    );
}
