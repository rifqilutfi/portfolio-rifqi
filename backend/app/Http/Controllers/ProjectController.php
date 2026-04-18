<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Return all projects as JSON via API Resource.
     */
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();

        return ProjectResource::collection($projects);
    }

    /**
     * Store a new project with validation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'tech_stack'  => 'nullable|string|max:255',
            'github_link' => 'nullable|url|max:255',
        ]);

        $project = Project::create($validated);

        return new ProjectResource($project, 201);
    }
}
