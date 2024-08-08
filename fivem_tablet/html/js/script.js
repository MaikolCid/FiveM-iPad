document.addEventListener("DOMContentLoaded", function() {
    const app1 = document.getElementById("app1");
    const screen = document.getElementById("screen");
    const navBar = document.getElementById("nav-bar");

    if (app1) {
        app1.addEventListener("click", function() {
            console.log("App 1 clicked");
            fetch('/fivem_tablet/funciones/admin.html')
                .then(response => response.text())
                .then(data => {
                    screen.innerHTML = data;
                    screen.classList.remove('home-screen'); // Eliminar clase home-screen
                    screen.classList.add('admin-mode'); // Aplicar clase para el estilo de admin si es necesario
                })
                .catch(error => console.log('Error loading admin.html:', error));
        });
    } else {
        console.log("Element with id 'app1' not found");
    }

    // Función para actualizar la hora y la fecha
    function updateDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = now.toLocaleDateString('es-ES', options);

        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        
        if (timeElement && dateElement) {
            timeElement.textContent = time;
            dateElement.textContent = date.charAt(0).toUpperCase() + date.slice(1);
        }
    }

    // Actualizar la hora y la fecha cada segundo
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Actualizar inmediatamente al cargar

    // Event listener para volver al inicio al hacer clic en la barra de navegación
    navBar.addEventListener("click", function() {
        location.reload(); // Recargar la página para volver al inicio
    });
});
