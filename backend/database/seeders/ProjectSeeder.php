<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Seed the projects table with demo data.
     */
    public function run(): void
    {
        $projects = [
            [
                'title'       => 'Personal Portfolio Website',
                'description' => 'A personal portfolio website built from scratch with a decoupled architecture. The backend runs as a Laravel REST API serving project data, while the frontend is pure vanilla JavaScript with ES modules. Features neo-brutalist design, dark mode toggle, scroll animations, and fully responsive layout.',
                'tech_stack'  => 'Laravel, MySQL, JavaScript, HTML, CSS',
                'github_link' => 'https://github.com/rifqilutfi/portfolio-rifqi',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
