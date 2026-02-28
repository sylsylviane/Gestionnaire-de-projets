<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    /**
     * Affiche une liste de toutes les projets.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            $projects = Project::with('users')->get();
        } else {
            $projects = $user->projects()
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
        return inertia('projects/create');
    }

    /**
     * Stocke un nouveau projet dans la base de données.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_number' => 'required|string|unique:projects,project_number',
            'project_name' => 'required|string',
            'building_type' => 'required|in:combustible,incombustible_acier,incombustible_beton',
            'floors' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'electrical_done' => 'boolean',
            'sleeves_done' => 'boolean',
            'drainage_done' => 'boolean',
        ]);

        $validated['electrical_done'] = $request->boolean('electrical_done');
        $validated['sleeves_done'] = $request->boolean('sleeves_done');
        $validated['drainage_done'] = $request->boolean('drainage_done');

        $project = Project::create($validated);

        // S'assurer qu'il n'y a pas déjà un lead_drafter
        if ($project->users()
            ->wherePivot('project_role', 'lead_drafter')
            ->exists()
        ) {

            throw ValidationException::withMessages([
                'project_role' => 'Ce projet a déjà un dessinateur principal.',
            ]);
        }

        // Associer l'utilisateur connecté comme lead_drafter
        $project->users()->attach($request->user()->id, [
            'project_role' => 'lead_drafter',
        ]);

        return redirect()
            ->route('projects.index')
            ->with('success', 'Projet créé avec succès.');
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
