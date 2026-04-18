/**
 * api.js — API communication layer
 *
 * Handles all fetch requests to the Laravel backend.
 * Exports functions for getting and creating projects.
 */

/** Base URL for the Laravel API. Change this if your backend runs on a different port. */
const BASE_URL = 'http://localhost:8000';

/**
 * Fetch all projects from the API.
 * @returns {Promise<Array>} Array of project objects
 * @throws {Error} If the request fails
 */
export async function getProjects() {
    const response = await fetch(`${BASE_URL}/api/projects`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    // Laravel API Resource wraps data in a "data" key
    return json.data;
}

/**
 * Create a new project via the API.
 * @param {Object} projectData - { title, description, tech_stack, github_link }
 * @returns {Promise<Object>} The created project
 * @throws {Error} If the request fails
 */
export async function createProject(projectData) {
    const response = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message = errorBody?.message || `${response.status} ${response.statusText}`;
        throw new Error(`Failed to create project: ${message}`);
    }

    const json = await response.json();
    return json.data;
}
