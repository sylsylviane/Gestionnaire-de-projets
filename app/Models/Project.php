<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    protected $fillable = [
        'project_name',
        'project_number',
        'building_type',
        'floors',
        'description',
        'electrical_done',
        'sleeves_done',
        'drainage_done',
        'status',
        'created_at',
        'updated_at',
        'user_id',
    ];

    /**
     * Retourne les utilisateurs (dessinateurs) associés à ce projet.
     * Relation : un projet peut être assigné à plusieurs utilisateurs.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->withTimestamps();
    }
}
