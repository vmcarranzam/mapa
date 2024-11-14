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
    let initialDistance = null;

    // Zoom with wheel
    mapContainer.addEventListener("wheel", function(event) {
        event.preventDefault();
        adjustZoom(event.deltaY < 0 ? 0.1 : -0.1);
    });

    // Zoom with buttons
    zoomInButton.addEventListener("click", () => adjustZoom(0.1));
    zoomOutButton.addEventListener("click", () => adjustZoom(-0.1));

    // Adjust zoom function
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

    // Touch gesture: Pinch zoom for mobile devices
    mapContainer.addEventListener("touchstart", function(event) {
        if (event.touches.length === 2) {
            initialDistance = getDistance(event.touches[0], event.touches[1]);
        }
    });

    mapContainer.addEventListener("touchmove", function(event) {
        if (event.touches.length === 2 && initialDistance) {
            event.preventDefault();
            const newDistance = getDistance(event.touches[0], event.touches[1]);
            const delta = (newDistance - initialDistance) * 0.005; // Adjust sensitivity
            adjustZoom(delta);
            initialDistance = newDistance;
        }
    });

    mapContainer.addEventListener("touchend", function() {
        initialDistance = null;
    });

    function getDistance(touch1, touch2) {
        return Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
    }

    // Country hover event
    document.querySelectorAll(".country").forEach(country => {
        country.addEventListener("mouseenter", (event) => {
            const name = event.target.getAttribute("name");
            console.log(name);
        });
    });
});
