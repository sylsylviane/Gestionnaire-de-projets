<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Détermine si l'utilisateur peut voir n'importe quel projet.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Détermine si l'utilisateur peut voir le modèle projet.
     */
    public function view(User $user, Project $project): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $project->users()->where('user_id', $user->id)->exists();
    }

    /**
     * Détermine si l'utilisateur peut créer des modèles projet.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
    * Détermine si l'utilisateur peut mettre à jour le modèle projet.
     */
    public function update(User $user, Project $project): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $project->users()->where('user_id', $user->id)->exists();
    }

    /**
    * Détermine si l'utilisateur peut supprimer le modèle projet.
     */
    public function delete(User $user, Project $project): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Détermine si l'utilisateur peut restaurer le modèle projet.
     */
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
    * Détermine si l'utilisateur peut supprimer définitivement le modèle projet.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return false;
    }
}
