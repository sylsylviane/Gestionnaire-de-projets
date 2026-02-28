<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Affiche une liste de toutes les projets.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            $projects = Project::with(['users', 'requirements'])->get();
        } else {
            $projects = $user->projects()
                ->with(['users', 'requirements'])
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
            'status' => 'required|string',
        ]);

        DB::transaction(function () use ($validated, $request) {

            // Création du projet
            $project = Project::create($validated);

            // Attache le dessinateur principal (lead_drafter)
            $project->users()->attach($request->user()->id, [
                'project_role' => 'lead_drafter',
            ]);

            // Création automatique des requirements
            $defaultRequirements = [
                'electrical',
                'drainage',
                'sleeves',
                'elevator',
            ];

            foreach ($defaultRequirements as $type) {
                $project->requirements()->create([
                    'type' => $type,
                    'status' => 'pending',
                ]);
            }
        });

        return redirect()
            ->route('projects.index')
            ->with('success', 'Projet créé avec succès.');
    }

    /**
     * Affiche le projet spécifié.
     */
    public function show(Project $project)
    {
        return inertia('projects/show', [
            'project' => $project->load(['users', 'requirements']),
        ]);
    }

    /**
     * Affiche le formulaire d'édition du projet spécifié.
     */
    public function edit(Project $project)
    {
        return inertia('projects/edit', [
            'project' => $project->load(['users', 'requirements']),
        ]);
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
