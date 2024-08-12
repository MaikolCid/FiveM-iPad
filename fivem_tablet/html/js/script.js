document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById("screen");

    function loadPDF(url) {
        screen.innerHTML = ''; 

        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');

            const pdfContainer = document.createElement('div');
            pdfContainer.classList.add('pdf-container');
            screen.appendChild(pdfContainer);

            const renderPage = (page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => console.log('Page rendered'));

                const pageWrapper = document.createElement('div');
                pageWrapper.classList.add('pdf-page');
                pageWrapper.appendChild(canvas);
                pdfContainer.appendChild(pageWrapper);
            };

            for (let i = 1; i <= pdf.numPages; i++) {
                pdf.getPage(i).then(renderPage);
            }
        }).catch(reason => console.error(reason));
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
});
