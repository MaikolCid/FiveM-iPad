document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById("screen");

    function loadBackground(background) {
        screen.style.backgroundImage = `url('${background}')`;
    }

    // Escuchar mensajes enviados desde el cliente Lua
    window.addEventListener('message', function(event) {
        const data = event.data;
        const tablet = document.querySelector('.tablet');

        if (data.action === "showTablet") {
            tablet.style.display = "block";  // Muestra la tablet
            // Solicitar el fondo de pantalla guardado
            fetch(`https://${GetParentResourceName()}/loadBackground`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
        } else if (data.action === "hideTablet") {
            tablet.style.display = "none";   // Oculta la tablet
        } else if (data.action === "setBackground") {
            loadBackground(data.background); // Establecer el fondo de pantalla
        }
    });
});


function initializeAjustes() {
    const wallpaperMenuItem = document.getElementById("wallpaper-menu-item");
    const wallpaperContent = document.getElementById("wallpaper-content");
    const screen = document.querySelector('.screen');
    const wallpaperGrid = document.getElementById("wallpaper-grid");

    // Function to add wallpapers to the grid
    function addWallpapersToGrid(wallpapers) {
        wallpaperGrid.innerHTML = ''; // Clear the grid before adding new images
        wallpapers.forEach(wallpaper => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/fondos/${wallpaper}`;
            imgElement.alt = `Wallpaper ${wallpaper}`;
            imgElement.addEventListener('click', () => {
                screen.style.backgroundImage = `url('images/fondos/${wallpaper}')`;

                // Enviar la selección de fondo al servidor
                fetch(`https://${GetParentResourceName()}/saveBackground`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        background: `images/fondos/${wallpaper}`
                    })
                }).then(response => {
                    if (response.ok) {
                        console.log('Background saved successfully.');
                    } else {
                        console.error('Failed to save background.');
                    }
                });
            });
            wallpaperGrid.appendChild(imgElement);
        });
    }

    // Default fallback wallpapers (1.jpg to 17.jpg)
    let wallpapers = [];
    for (let i = 1; i <= 17; i++) {
        wallpapers.push(`${i}.jpg`);
    }

    // Add default wallpapers to the grid
    addWallpapersToGrid(wallpapers);

    // Show the wallpaper section when the menu item is clicked
    wallpaperMenuItem.addEventListener("click", function() {
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
        wallpaperMenuItem.classList.add('selected');
        wallpaperContent.style.display = "block";
    });
}

// Export the function to be called from script.js
window.initializeAjustes = initializeAjustes;
