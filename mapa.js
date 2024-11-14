document.addEventListener("DOMContentLoaded", () => {
    let providersData = [];
    let currentProviderIndex = 0;
    let filteredProviders = [];

    // Cargar el archivo JSON con los datos de los proveedores
    fetch("providers.json")
        .then(response => response.json())
        .then(data => {
            providersData = data;
        })
        .catch(error => console.error("Error al cargar providers.json:", error));

    // Referencias a elementos del DOM
    const mapContainer = document.getElementById("map-container");
    const entityCard = document.getElementById("entity-card");
    const providerName = document.getElementById("provider-name");
    const providerAddress = document.getElementById("provider-address");
    const providerPhone = document.getElementById("provider-phone");
    const providerCountry = document.getElementById("provider-country");
    const providerWebsite = document.getElementById("provider-website");
    const providerFb = document.getElementById("provider-fb");
    const providerIg = document.getElementById("provider-ig");
    const providerService = document.getElementById("provider-service");
    const providerRequirements = document.getElementById("provider-requirements");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    // Función para mostrar el proveedor actual en la tarjeta de entidad
    function showProvider(provider) {
        providerName.textContent = provider.name;
        providerAddress.textContent = provider.address;
        providerPhone.textContent = provider.phone;
        providerCountry.textContent = provider.country.join(", ");
        providerWebsite.href = provider.website;
        providerWebsite.textContent = provider.website;
        providerFb.href = provider.fb;
        providerIg.href = provider.ig;
        providerService.textContent = provider.service.join(", ");
        providerRequirements.textContent = provider.requirements.join(", ");
    }

    // Función para actualizar la tarjeta con el proveedor actual en el índice actual
    function updateEntityCard() {
        if (filteredProviders.length > 0) {
            showProvider(filteredProviders[currentProviderIndex]);
            entityCard.style.display = "block";
            prevButton.style.display = filteredProviders.length > 1 ? "inline-block" : "none";
            nextButton.style.display = filteredProviders.length > 1 ? "inline-block" : "none";
        } else {
            entityCard.style.display = "none";
        }
    }

    // Evento de click en cada país del mapa
    mapContainer.addEventListener("click", (event) => {
        const selectedCountry = event.target.getAttribute("data-country");
        if (selectedCountry) {
            // Filtrar proveedores por país seleccionado
            filteredProviders = providersData.filter(provider => provider.country.includes(selectedCountry));
            currentProviderIndex = 0; // Reiniciar al primer proveedor
            updateEntityCard();
        }
    });

    // Eventos de navegación en la tarjeta de entidad
    prevButton.addEventListener("click", () => {
        if (currentProviderIndex > 0) {
            currentProviderIndex--;
        } else {
            currentProviderIndex = filteredProviders.length - 1; // Ir al último proveedor
        }
        updateEntityCard();
    });

    nextButton.addEventListener("click", () => {
        if (currentProviderIndex < filteredProviders.length - 1) {
            currentProviderIndex++;
        } else {
            currentProviderIndex = 0; // Volver al primer proveedor
        }
        updateEntityCard();
    });

    // Agregar panning y zoom con scroll para el contenedor del mapa
    let isPanning = false;
    let startX, startY, scrollLeft, scrollTop;

    mapContainer.addEventListener("mousedown", (e) => {
        isPanning = true;
        startX = e.pageX - mapContainer.offsetLeft;
        startY = e.pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
    });

    mapContainer.addEventListener("mouseleave", () => {
        isPanning = false;
    });

    mapContainer.addEventListener("mouseup", () => {
        isPanning = false;
    });

    mapContainer.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - mapContainer.offsetLeft;
        const y = e.pageY - mapContainer.offsetTop;
        const walkX = (x - startX) * 1; // Ajustar factor de movimiento si es necesario
        const walkY = (y - startY) * 1; // Ajustar factor de movimiento si es necesario
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });

    // Zoom con scroll
    mapContainer.addEventListener("wheel", (e) => {
        e.preventDefault();
        const scaleAmount = 0.1;
        let scale = 1;

        if (e.deltaY < 0) {
            // Zoom in
            scale += scaleAmount;
        } else {
            // Zoom out
            scale = Math.max(1, scale - scaleAmount);
        }

        mapContainer.style.transform = `scale(${scale})`;
    });
});
