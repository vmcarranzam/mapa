// script.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const map = document.getElementById("world-map");
    const slideContent = document.getElementById("slide-content");
    const dotsContainer = document.getElementById("dots-container");
    const prevSlideButton = document.getElementById("prev-slide");
    const nextSlideButton = document.getElementById("next-slide");

    let directoryData = [];
    let currentSlides = [];
    let currentSlideIndex = 0;

    // Cargar datos de directorio.json
    fetch("directorio.json")
        .then(response => response.json())
        .then(data => {
            directoryData = data;
        })
        .catch(error => console.error("Error al cargar directorio.json:", error));

    // Función para mostrar el pop-up con datos filtrados
    function openPopup(country) {
        // Filtrar datos por país
        currentSlides = directoryData.filter(item => item.pais === country);
        if (currentSlides.length === 0) return; // Si no hay datos, no abrir el pop-up

        currentSlideIndex = 0;
        updateSlide();
        popup.classList.remove("hidden");
    }

    // Función para actualizar el contenido del slide
    function updateSlide() {
        if (currentSlides.length === 0) return;

        // Obtener datos del slide actual
        const slideData = currentSlides[currentSlideIndex];
        slideContent.innerHTML = `
            <img src="${slideData.logo}" alt="Logo de ${slideData.nombre}" class="slide-logo">
            <h2>${slideData.nombre}</h2>
            <p><strong>Dirección:</strong> ${slideData.direccion}</p>
            <p><strong>Teléfono:</strong> ${slideData.telefono}</p>
            <p><strong>Email:</strong> <a href="mailto:${slideData.email}">${slideData.email}</a></p>
        `;

        // Actualizar los puntos de navegación
        dotsContainer.innerHTML = '';
        currentSlides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === currentSlideIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentSlideIndex = index;
                updateSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Evento para cambiar al slide anterior
    prevSlideButton.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
        updateSlide();
    });

    // Evento para cambiar al siguiente slide
    nextSlideButton.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex + 1) % currentSlides.length;
        updateSlide();
    });

    // Evento para abrir el pop-up al hacer clic en un país
    map.addEventListener("click", (event) => {
        const country = event.target.getAttribute("data-country");
        if (country) openPopup(country);
    });

    // Evento para cerrar el pop-up
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
});
