/**
 * Add click event to dynamically created elements
 */
export const accordions = () => {
    document.querySelector('body').addEventListener('click', e => {
        if(e.target.matches("[data-accordion='toggle']") || e.target.closest("[data-accordion='toggle']")) {
            const item = e.target;
            
            if(item.hasAttribute('data-accordion') && item.getAttribute('data-accordion') === 'toggle') {
                const parent = item.closest("[data-accordion='item']");
                const toggle = parent.querySelector("[data-accordion='toggle']");
                const panel = parent.querySelector("[data-accordion='panel']");
                toggle.classList.toggle('active');
                panel.classList.toggle('active');
            }
        }
    });
}