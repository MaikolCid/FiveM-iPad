function initializeAjustes() {
    const wallpaperMenuItem = document.getElementById("wallpaper-menu-item");
    const wallpaperContent = document.getElementById("wallpaper-content");
    const screen = document.querySelector('.screen');
    const wallpaperGrid = document.getElementById("wallpaper-grid");

    // Cargar las imágenes del fondo de pantalla desde la carpeta
    const wallpapers = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg'
    ];

    wallpapers.forEach(wallpaper => {
        const imgElement = document.createElement('img');
        imgElement.src = `/fivem_tablet/html/images/fondos/${wallpaper}`;
        imgElement.alt = `Wallpaper ${wallpaper}`;
        imgElement.addEventListener('click', () => {
            screen.style.backgroundImage = `url('/fivem_tablet/html/images/fondos/${wallpaper}')`;
        });
        wallpaperGrid.appendChild(imgElement);
    });

    // Muestra la sección de fondos de pantalla cuando se selecciona el menú correspondiente
    wallpaperMenuItem.addEventListener("click", function() {
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
        wallpaperMenuItem.classList.add('selected');
        wallpaperContent.style.display = "block";
    });
}

// Exporta la función para que pueda ser llamada desde script.js
window.initializeAjustes = initializeAjustes;
