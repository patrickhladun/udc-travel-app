/**
 * Get the background for the pahe hero section
 */
export const getBackground = () => {
    fetch('http://localhost:8080/background')
    .then(response => response.json())
    .then(response => {
        const header = document.getElementById('header-bg');
        header.style.backgroundImage = `url(${response.url})`;
    });   
};