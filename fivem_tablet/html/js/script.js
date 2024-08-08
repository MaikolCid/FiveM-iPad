document.addEventListener("DOMContentLoaded", function() {
    const appadm = document.getElementById("appadm");
    const apprule = document.getElementById("apprule");
    const dockAppadm = document.getElementById("dock-appadm");
    const dockApprule = document.getElementById("dock-apprule");
    const screen = document.getElementById("screen");
    const navBar = document.getElementById("nav-bar");
    const dock = document.querySelector(".dock");

    function loadAdminApp() {
        fetch('/fivem_tablet/funciones/admin.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('admin-mode');
                dock.style.display = "none";
            })
            .catch(error => console.log('Error loading admin.html:', error));
    }

    function loadRuleApp() {
        console.log("Normativas clicked");
        loadPDF('/fivem_tablet/html/normativas/normativa.pdf');
        screen.classList.remove('home-screen');
        screen.classList.add('rule-mode');
        dock.style.display = "none";
    }

    // Función para cargar el PDF y renderizarlo usando PDF.js
    function loadPDF(url) {
        const pdfContainer = document.createElement('div');
        pdfContainer.classList.add('pdf-container');

        screen.innerHTML = ''; // Limpiar la pantalla actual
        screen.appendChild(pdfContainer); // Añadir el contenedor del PDF

        // Usar PDF.js para renderizar el PDF
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                pdf.getPage(pageNumber).then(page => {
                    console.log('Page loaded');

                    const scale = 1.5;
                    const viewport = page.getViewport({ scale: scale });

                    // Prepare canvas using PDF page dimensions
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render PDF page into canvas context
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    const renderTask = page.render(renderContext);
                    renderTask.promise.then(() => {
                        console.log('Page rendered');
                    });

                    pdfContainer.appendChild(canvas);
                });
            }
        }, function (reason) {
            console.error(reason);
        });
    }

    if (appadm) {
        appadm.addEventListener("click", loadAdminApp);
    }

    if (apprule) {
        apprule.addEventListener("click", loadRuleApp);
    }

    if (dockAppadm) {
        dockAppadm.addEventListener("click", loadAdminApp);
    }

    if (dockApprule) {
        dockApprule.addEventListener("click", loadRuleApp);
    }

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

    setInterval(updateDateTime, 1000);
    updateDateTime();

    navBar.addEventListener("click", function() {
        location.reload();
    });
});