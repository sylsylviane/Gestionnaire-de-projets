export type ProjectRole = 'lead_drafter' | 'assistant' | 'auditor';

export interface ProjectUser {
    id: number;
    name: string;
    email: string;

    pivot: {
        project_id: number;
        user_id: number;
        project_role: ProjectRole;
        created_at: string;
        updated_at: string;
    };
}
export type ProjectStatus = 'en_cours' | 'termine' | 'suspendu';

export type BuildingType =
    | 'combustible'
    | 'incombustible_acier'
    | 'incombustible_beton';

export interface ProjectRequirement {
    id: number;
    project_id: number;
    type: string;
    status: string;
    is_compliant: boolean;
    sprinkler_required: boolean;
    completed_at: string | null;
    completed_by: number | null;
}

export interface Project {
    id: number;
    project_name: string;
    project_number: string;
    building_type: BuildingType;
    floors: number;
    status: ProjectStatus;
    description?: string | null;

    users: ProjectUser[];
    requirements: ProjectRequirement[];

    created_at: string;
    updated_at: string;
}
