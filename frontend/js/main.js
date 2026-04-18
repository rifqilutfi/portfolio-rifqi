/**
 * main.js — Application entry point
 *
 * Initializes the app: fetches project data from the API,
 * manages loading/error/success states, triggers rendering,
 * handles scroll-based reveal animations, and theme toggling.
 */

import { getProjects } from './api.js';
import { renderProjects } from './render.js';

/* ═══════════════════════════════════════════════════════════════
   DOM REFERENCES
   ═══════════════════════════════════════════════════════════════ */
const projectsGrid    = document.getElementById('projects-grid');
const loadingState     = document.getElementById('projects-loading');
const errorState       = document.getElementById('projects-error');
const errorText        = errorState.querySelector('.error-text');
const retryBtn         = document.getElementById('retry-btn');
const projectCountEl   = document.getElementById('project-count');
const currentYearEl    = document.getElementById('current-year');
const themeToggleBtn   = document.getElementById('theme-toggle');

/* ═══════════════════════════════════════════════════════════════
   THEME SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const THEME_KEY = 'portfolio-theme';
const DARK_CLASS = 'dark';
const ICON_LIGHT = '☀';  // shown when dark mode is active (click to go light)
const ICON_DARK  = '●';  // shown when light mode is active (click to go dark)

/**
 * Apply theme to the page.
 * @param {'light'|'dark'} theme
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add(DARK_CLASS);
        themeToggleBtn.textContent = ICON_LIGHT;
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        document.body.classList.remove(DARK_CLASS);
        themeToggleBtn.textContent = ICON_DARK;
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
}

/**
 * Get saved theme or default to light.
 * @returns {'light'|'dark'}
 */
function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // Check system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * Toggle between light and dark theme.
 */
function toggleTheme() {
    const isDark = document.body.classList.contains(DARK_CLASS);
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
}

/**
 * Initialize theme on page load (before animations).
 */
function initTheme() {
    const theme = getSavedTheme();
    applyTheme(theme);
    themeToggleBtn.addEventListener('click', toggleTheme);
}

/* ═══════════════════════════════════════════════════════════════
   STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

/**
 * Show a state and hide the others.
 * @param {'loading'|'error'|'success'} state
 * @param {string} [errorMessage]
 */
function setState(state, errorMessage = '') {
    loadingState.classList.toggle('hidden', state !== 'loading');
    errorState.classList.toggle('hidden', state !== 'error');
    projectsGrid.classList.toggle('hidden', state !== 'success');

    if (state === 'error') {
        errorText.textContent = errorMessage;
    }
}

/* ═══════════════════════════════════════════════════════════════
   CARD REVEAL ANIMATION
   ═══════════════════════════════════════════════════════════════ */

/**
 * Stagger-reveal project cards with animation delay.
 */
function revealProjectCards() {
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('is-revealed');
        }, index * 120);
    });
}

/* ═══════════════════════════════════════════════════════════════
   DATA LOADING
   ═══════════════════════════════════════════════════════════════ */

/**
 * Fetch projects from the API and render them.
 */
async function loadProjects() {
    setState('loading');

    try {
        const projects = await getProjects();

        renderProjects(projects, projectsGrid);
        setState('success');

        // Update project count in about stats
        projectCountEl.textContent = projects.length;

        // Trigger card reveal animation
        requestAnimationFrame(() => {
            revealProjectCards();
        });
    } catch (error) {
        console.error('[Portfolio] Failed to load projects:', error);
        setState('error', error.message || 'SOMETHING WENT WRONG. IS THE API RUNNING?');
    }
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Set up IntersectionObserver for fade-in animations.
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    fadeElements.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */

/**
 * Initialize the application.
 */
function init() {
    // Theme must be set first (before animations kick in)
    initTheme();

    // Set current year in footer
    currentYearEl.textContent = new Date().getFullYear();

    // Initialize scroll-based animations
    initScrollAnimations();

    // Load projects from API
    loadProjects();

    // Retry button handler
    retryBtn.addEventListener('click', loadProjects);
}

// ─── Boot ───
document.addEventListener('DOMContentLoaded', init);
