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
            imgElement.src = `/fivem_tablet/html/images/fondos/${wallpaper}`;
            imgElement.alt = `Wallpaper ${wallpaper}`;
            imgElement.addEventListener('click', () => {
                screen.style.backgroundImage = `url('/fivem_tablet/html/images/fondos/${wallpaper}')`;
            });
            wallpaperGrid.appendChild(imgElement);
        });
    }

    // Default fallback wallpapers (1.jpg to 10.jpg)
    let wallpapers = [];
    for (let i = 1; i <= 17; i++) {
        wallpapers.push(`${i}.jpg`);
    }

    // Add default wallpapers to the grid
    addWallpapersToGrid(wallpapers);

    // Listen for the wallpapers list from Lua (only when available)
    window.addEventListener('message', function(event) {
        if (event.data.type === 'wallpapersList') {
            let wallpapers = event.data.wallpapers;

            // If the list is empty, use the default fallback wallpapers
            if (wallpapers.length === 0) {
                wallpapers = [];
                for (let i = 1; i <= 17; i++) {
                    wallpapers.push(`${i}.jpg`);
                }
            }

            addWallpapersToGrid(wallpapers);
        }
    });

    // Show the wallpaper section when the menu item is clicked
    wallpaperMenuItem.addEventListener("click", function() {
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
        wallpaperMenuItem.classList.add('selected');
        wallpaperContent.style.display = "block";
    });
}

// Export the function to be called from script.js
window.initializeAjustes = initializeAjustes;
