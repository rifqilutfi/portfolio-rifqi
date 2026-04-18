/**
 * render.js — DOM rendering layer
 *
 * Takes project data and renders it into the DOM
 * using the component factory from components.js.
 */

import { createProjectCard } from './components.js';

/**
 * Render a list of projects into the given container.
 * Clears the container first, then appends each card.
 *
 * @param {Array} projects - Array of project objects from the API
 * @param {HTMLElement} container - The DOM element to render into
 */
export function renderProjects(projects, container) {
    // Clear existing content
    container.textContent = '';

    if (projects.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'state-message';
        empty.textContent = 'NO PROJECTS FOUND.';
        container.appendChild(empty);
        return;
    }

    // Use DocumentFragment for efficient batch DOM insertion
    const fragment = document.createDocumentFragment();

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
