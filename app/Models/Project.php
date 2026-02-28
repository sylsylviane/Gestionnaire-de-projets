<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'project_name',
        'project_number',
        'building_type',
        'floors',
        'description',
        'status',
        'created_at',
        'updated_at',
    ];

    /**
     * Retourne les utilisateurs (dessinateurs) associés à ce projet.
     * Relation : un projet peut être assigné à plusieurs utilisateurs.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('project_role')
            ->withTimestamps();
    }

    /**
     * Retourne les exigences associées à ce projet.
     * Relation : un projet peut avoir plusieurs exigences (electrical, drainage, sleeves, elevator).
     */
    public function requirements(): HasMany
    {
        return $this->hasMany(ProjectRequirement::class);
    }
}
