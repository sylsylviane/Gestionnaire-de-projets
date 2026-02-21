<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Affiche une liste de toutes les projets.
     */
    public function index()
    {
        if (auth()->user()->hasRole('admin')) {
            $projects = Project::with('users')->get();
        } else {
            $projects = auth()->user()
                ->projects()
                ->with('users')
                ->get();
        }

        return inertia('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Affiche le formulaire de création d'un nouveau projet.
     */
    public function create()
    {
        //
    }

    /**
     * Stocke un nouveau projet dans la base de données.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Affiche le projet spécifié.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Affiche le formulaire d'édition du projet spécifié.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Met à jour le projet spécifié dans la base de données.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Supprime le projet spécifié de la base de données.
     */
    public function destroy(Project $project)
    {
        //
    }
}
