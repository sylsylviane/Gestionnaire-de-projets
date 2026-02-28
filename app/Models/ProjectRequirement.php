<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectRequirement extends Model
{
    protected $fillable = [
        'project_id',
        'type',
        'status',
        'is_compliant',
        'sprinkler_required',
        'completed_at',
        'completed_by',
    ];

    protected $casts = [
        'is_compliant' => 'boolean',
        'sprinkler_required' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Retourne le projet associé à cette exigence.
     * Relation : une exigence appartient à un projet.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Retourne l'utilisateur qui a complété cette exigence.
     * Relation : une exigence peut être complétée par un utilisateur (dessinateur).
     */
    public function completedBy()
    {
        return $this->belongsTo(User::class, 'completed_by');       
    }
}
