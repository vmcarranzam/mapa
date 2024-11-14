document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.querySelector(".map-container");
    const svg = document.getElementById("interactiveMap");
    const zoomInButton = document.getElementById("zoomIn");
    const zoomOutButton = document.getElementById("zoomOut");

    let isPanning = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    let zoomLevel = 1;

    // Zoom functionality
    mapContainer.addEventListener("wheel", function(event) {
        event.preventDefault();
        adjustZoom(event.deltaY < 0 ? 0.1 : -0.1);
    });

    // Disable page-wide zoom for touch devices, allowing only map zoom
    document.addEventListener("gesturestart", function(e) {
        e.preventDefault();
    });

    // Zoom with buttons
    zoomInButton.addEventListener("click", () => adjustZoom(0.1));
    zoomOutButton.addEventListener("click", () => adjustZoom(-0.1));

    function adjustZoom(delta) {
        zoomLevel = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    }

    // Pan functionality
    svg.addEventListener("mousedown", function(event) {
        isPanning = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        svg.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function(event) {
        if (!isPanning) return;

        translateX = event.clientX - startX;
        translateY = event.clientY - startY;

        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    });

    document.addEventListener("mouseup", function() {
        isPanning = false;
        svg.style.cursor = "grab";
    });

    // Country hover event
    document.querySelectorAll(".country").forEach(country => {
        country.addEventListener("mouseenter", (event) => {
            const name = event.target.getAttribute("name");
            console.log(name);
        });
    });
});
