/**
 * components.js — Dynamic Component Loader
 *
 * Loads nav and footer HTML fragments into the page.
 * Include this script in the <head> with defer, or at end of body.
 *
 * Usage: Add these placeholder elements to your HTML:
 *   <div data-component="nav"></div>
 *   <div data-component="footer"></div>
 */

(function () {
  'use strict';

  const componentMap = {
    'nav': 'components/nav.html',
    'footer': 'components/footer.html'
  };

  /**
   * Load a component into a placeholder element
   */
  async function loadComponent(placeholder) {
    const componentName = placeholder.dataset.component;
    const componentPath = componentMap[componentName];

    if (!componentPath) {
      console.warn(`Unknown component: ${componentName}`);
      return;
    }

    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
      
      let html = await response.text();
      
      // Handle nav-scrolled attribute for pages that need nav in scrolled state
      if (componentName === 'nav' && placeholder.dataset.navScrolled === 'true') {
        html = html.replace('class="nav"', 'class="nav nav--scrolled"');
      }
      
      // Replace placeholder with component HTML
      placeholder.outerHTML = html;
      
    } catch (error) {
      console.error(`Error loading component "${componentName}":`, error);
    }
  }

  /**
   * Initialize all components on the page
   */
  async function initComponents() {
    const placeholders = document.querySelectorAll('[data-component]');
    
    // Load all components in parallel
    await Promise.all(Array.from(placeholders).map(loadComponent));
    
    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('components:loaded'));
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }

})();
