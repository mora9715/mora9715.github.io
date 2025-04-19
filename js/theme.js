// Theme handling
let currentTheme = 'light';

// Function to get CSS variable value
function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// Function to save theme preference to localStorage
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

// Function to get theme preference from localStorage
function getThemePreference() {
    return localStorage.getItem('theme') || 'light'; // Default to light if not set
}

// Function to apply theme
function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    currentTheme = theme;

    // Dispatch a custom event that pages can listen for
    const themeChangeEvent = new CustomEvent('themeChanged', { 
        detail: { theme: currentTheme } 
    });
    document.dispatchEvent(themeChangeEvent);
}

// Function to toggle theme
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    saveThemePreference(newTheme);
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme preference
    const savedTheme = getThemePreference();
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById('themeToggle');

    if (themeToggleBtn) {
        // Add event listener for theme toggle
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});
