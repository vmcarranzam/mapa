document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.createElement('div');
    tooltip.classList.add('country-label');
    mapContainer.appendChild(tooltip);

    document.getElementById('world-map').addEventListener('mousemove', (event) => {
        const target = event.target;
        if (target.tagName === 'path' && target.hasAttribute('name')) {
            const countryName = target.getAttribute('name');
            tooltip.textContent = countryName;
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.pageX}px`;
            tooltip.style.top = `${event.pageY}px`;
        } else {
            tooltip.style.display = 'none';
        }
    });
});
