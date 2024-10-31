document.addEventListener("DOMContentLoaded", () => {
    const paths = document.querySelectorAll("#map-container path");
    const tooltip = document.getElementById("tooltip");

    paths.forEach(path => {
        // Show tooltip with country name
        path.addEventListener("mouseenter", (e) => {
            const countryName = path.getAttribute("name");
            tooltip.textContent = countryName;
            tooltip.style.display = "block";
        });

        // Update tooltip position
        path.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.pageX + 10 + "px";
            tooltip.style.top = e.pageY + 10 + "px";
        });

        // Hide tooltip on mouse leave
        path.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });
});
