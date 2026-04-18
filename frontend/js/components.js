/**
 * components.js — DOM component factory
 *
 * Creates individual DOM elements using createElement.
 * No innerHTML abuse — structured, readable DOM construction.
 */

/** Color palette for card accent bars (cycles through) */
const CARD_COLORS = [
    '#C8F7C5', // mint green
    '#A8D8EA', // sky blue
    '#FFD3B6', // peach
    '#FFAAA5', // coral
    '#D5AAFF', // lavender
];

/**
 * Create a single project card as a DOM element.
 * @param {Object} project - Project data from API
 * @param {number} index - Index for numbering and color cycling
 * @returns {HTMLElement} The complete card element
 */
export function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    // ─── Color Bar ───
    const colorBar = document.createElement('div');
    colorBar.className = 'project-card__color-bar';
    colorBar.style.backgroundColor = CARD_COLORS[index % CARD_COLORS.length];
    card.appendChild(colorBar);

    // ─── Card Body ───
    const body = document.createElement('div');
    body.className = 'project-card__body';

    // Project Number
    const number = document.createElement('span');
    number.className = 'project-card__number';
    number.textContent = `PROJECT ${String(index + 1).padStart(2, '0')}`;
    body.appendChild(number);

    // Title
    const title = document.createElement('h3');
    title.className = 'project-card__title';
    title.textContent = project.title;
    body.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'project-card__description';
    description.textContent = project.description;
    body.appendChild(description);

    // Tech Stack Badges
    if (project.tech_stack) {
        const techContainer = document.createElement('div');
        techContainer.className = 'project-card__tech';

        const techs = project.tech_stack.split(',').map(t => t.trim()).filter(Boolean);
        techs.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'tech-badge';
            badge.textContent = tech;
            techContainer.appendChild(badge);
        });

        body.appendChild(techContainer);
    }

    card.appendChild(body);

    // ─── Card Footer ───
    const footer = document.createElement('div');
    footer.className = 'project-card__footer';

    const link = document.createElement('a');
    if (project.github_link) {
        link.href = project.github_link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'project-card__link';
        link.textContent = 'VIEW CODE ↗';
    } else {
        link.className = 'project-card__link project-card__link--disabled';
        link.textContent = 'PRIVATE REPO';
    }

    footer.appendChild(link);
    card.appendChild(footer);

    return card;
}
