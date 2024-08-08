document.addEventListener("DOMContentLoaded", function() {
    const appadm = document.getElementById("appadm");
    const apprule = document.getElementById("apprule");
    const appcalc = document.getElementById("appcalc");
    const dockAppadm = document.getElementById("dock-appadm");
    const dockApprule = document.getElementById("dock-apprule");
    const dockAppcalc = document.getElementById("dock-appcalc");
    const screen = document.getElementById("screen");
    const navBar = document.getElementById("nav-bar");
    const dock = document.querySelector(".dock");
    const currentTrackImg = document.getElementById('current-track-img');
    const currentTrackTitle = document.getElementById('current-track-title');
    const currentTrackArtist = document.getElementById('current-track-artist');
    const musicAppIcon = document.getElementById('music-app-icon');
    const currentTrackInfo = document.querySelector('.current-track-info');
    let currentAudio = null;

    function loadAdminApp() {
        fetch('/fivem_tablet/Aplicaciones/admin.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('admin-mode');
                dock.style.display = "none";
            })
            .catch(error => console.log('Error loading admin.html:', error));
    }

    function loadCalcApp() {
        fetch('/fivem_tablet/Aplicaciones/calculator.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('calc-mode');
                dock.style.display = "none";

                // Eliminar el script de la calculadora si ya existe
                const existingScript = document.getElementById('calculator-script');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }

                // Crear y cargar el script de la calculadora
                const calculatorScript = document.createElement('script');
                calculatorScript.src = '/fivem_tablet/html/js/calculator.js';
                calculatorScript.id = 'calculator-script';
                document.body.appendChild(calculatorScript);
                
                // Esperar a que el script de la calculadora se cargue
                calculatorScript.onload = function() {
                    if (typeof initializeCalculator === 'function') {
                        initializeCalculator();
                    }
                };
            })
            .catch(error => console.log('Error loading calculator.html:', error));
    }

    function loadRuleApp() {
        console.log("Normativas clicked");
        loadPDF('/fivem_tablet/html/normativas/normativa.pdf');
        screen.classList.remove('home-screen');
        screen.classList.add('rule-mode');
        dock.style.display = "none";
    }

    function loadPDF(url) {
        const pdfContainer = document.createElement('div');
        pdfContainer.classList.add('pdf-container');

        screen.innerHTML = ''; 
        screen.appendChild(pdfContainer);

        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                pdf.getPage(pageNumber).then(page => {
                    console.log('Page loaded');

                    const scale = 1.5;
                    const viewport = page.getViewport({ scale: scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    const renderTask = page.render(renderContext);
                    renderTask.promise.then(() => {
                        console.log('Page rendered');
                    });
                    const pageWrapper = document.createElement('div');
                    pageWrapper.classList.add('pdf-page'); 

                    pageWrapper.appendChild(canvas); 
                    pdfContainer.appendChild(pageWrapper); 
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
    if (appcalc) {
        appcalc.addEventListener("click", loadCalcApp);
    }

    if (dockAppadm) {
        dockAppadm.addEventListener("click", loadAdminApp);
    }

    if (dockApprule) {
        dockApprule.addEventListener("click", loadRuleApp);
    }

    if (dockAppcalc) {
        dockAppcalc.addEventListener("click", loadCalcApp);
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

    const volumeDown = document.getElementById('volume-down');
    const volumeUp = document.getElementById('volume-up');
    const volumeDisplay = document.getElementById('volume-display');
    const volumeLevel = document.getElementById('volume-level');
    let currentVolume = 50; // Initial volume level
    

    volumeDown.addEventListener('click', function() {
        if (currentVolume > 0) {
            currentVolume -= 10;
            setVolume(currentVolume);
            showVolumeDisplay();
        } else {
            showVolumeDisplay(); // Mostrar el display incluso si no cambia el volumen
        }
    });

    volumeUp.addEventListener('click', function() {
        if (currentVolume < 100) {
            currentVolume += 10;
            setVolume(currentVolume);
            showVolumeDisplay();
        } else {
            showVolumeDisplay(); // Mostrar el display incluso si no cambia el volumen
        }
    });

    function setVolume(value) {
        if (currentAudio) {
            currentAudio.volume = value / 100;
        }
        volumeLevel.style.height = value + '%';
    }

    function showVolumeDisplay() {
        volumeDisplay.classList.add('show');
        volumeDisplay.classList.remove('fade-out'); // Ensure fade-out is removed
        clearTimeout(volumeTimeout);
    }

    function hideVolumeDisplay() {
        clearTimeout(volumeTimeout);
        volumeTimeout = setTimeout(() => {
            volumeDisplay.classList.add('fade-out');
            volumeTimeout = setTimeout(() => {
                volumeDisplay.classList.remove('show');
                volumeDisplay.classList.remove('fade-out');
            }, 500); // Duration of fade-out animation in CSS
        }, 1500); // Hide after 1.5 seconds
    }
    

    // Ensure that when a new track is played, the volume is set according to the currentVolume
    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        track.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio');
            const trackImg = this.getAttribute('data-img');
            const trackTitle = this.getAttribute('data-title');
            const trackArtist = this.getAttribute('data-artist');

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            currentAudio = new Audio(audioSrc);
            currentAudio.volume = currentVolume / 100; // Set volume based on currentVolume
            currentAudio.play();

            currentTrackImg.src = trackImg;
            currentTrackImg.classList.remove('hidden');
            currentTrackTitle.textContent = trackTitle;
            currentTrackArtist.textContent = trackArtist;
            musicAppIcon.classList.add('hidden');
        });
    });

    function togglePlayPause() {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
            } else {
                currentAudio.pause();
            }
        }
    }

    currentTrackImg.addEventListener('click', togglePlayPause);
    currentTrackInfo.addEventListener('click', togglePlayPause);

    // Mostrar el icono de Apple Music cuando no se esté reproduciendo ninguna canción
    if (!currentAudio || currentAudio.paused) {
        musicAppIcon.classList.remove('hidden');
    }

});
