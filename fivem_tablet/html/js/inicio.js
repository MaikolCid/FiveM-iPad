document.addEventListener("DOMContentLoaded", function() {
    const navBar = document.getElementById("nav-bar");
    const dock = document.querySelector(".dock");
    const screen = document.getElementById("screen");
    let currentTrackImg = document.getElementById('current-track-img');
    let currentTrackTitle = document.getElementById('current-track-title');
    let currentTrackArtist = document.getElementById('current-track-artist');
    let musicAppIcon = document.getElementById('music-app-icon');
    let currentAudio = null;
    let currentTrackInfo = {
        imgSrc: '',
        title: 'Música',
        artist: ''
    };
    let currentVolume = 50; // Initial volume level
    let volumeTimeout;

    // Función para inicializar el widget de música
    function initializeMusicWidget() {
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
                currentAudio.volume = currentVolume / 100;
                currentAudio.play();

                // Actualizar el estado de la pista actual
                currentTrackInfo = {
                    imgSrc: trackImg,
                    title: trackTitle,
                    artist: trackArtist
                };
                updateWidget(currentTrackInfo.imgSrc, currentTrackInfo.title, currentTrackInfo.artist);
            });
        });
    }

    // Función para actualizar el widget de música
    function updateWidget(imgSrc, title, artist) {
        currentTrackImg.src = imgSrc;
        currentTrackImg.classList.remove('hidden');
        currentTrackTitle.textContent = title;
        currentTrackArtist.textContent = artist;
        musicAppIcon.classList.add('hidden');
    }

    // Funciones para mostrar y ocultar el control deslizante de volumen
    function showVolumeDisplay() {
        const volumeDisplay = document.getElementById('volume-display');
        volumeDisplay.classList.add('show');
        volumeDisplay.classList.remove('fade-out');
        clearTimeout(volumeTimeout);
    }

    function hideVolumeDisplay() {
        const volumeDisplay = document.getElementById('volume-display');
        clearTimeout(volumeTimeout);
        volumeTimeout = setTimeout(() => {
            volumeDisplay.classList.add('fade-out');
            volumeTimeout = setTimeout(() => {
                volumeDisplay.classList.remove('show');
                volumeDisplay.classList.remove('fade-out');
            }, 500); // Duration of fade-out animation in CSS
        }, 1500); // Hide after 1.5 seconds
    }

    function updateVolume(increase) {
        const volumeLevel = document.getElementById('volume-level');
        if (increase) {
            currentVolume = Math.min(currentVolume + 10, 100);
        } else {
            currentVolume = Math.max(currentVolume - 10, 0);
        }
        volumeLevel.style.height = `${currentVolume}%`;
        if (currentAudio) {
            currentAudio.volume = currentVolume / 100;
        }
        showVolumeDisplay();
        hideVolumeDisplay();
    }

    // Función para inicializar los controles de volumen
    function initializeVolumeControls() {
        const volumeDownButton = document.getElementById('volume-down');
        const volumeUpButton = document.getElementById('volume-up');

        // Remover event listeners existentes antes de reasignar
        volumeDownButton.removeEventListener('mousedown', handleVolumeDown);
        volumeUpButton.removeEventListener('mousedown', handleVolumeUp);
        volumeDownButton.removeEventListener('mouseup', hideVolumeDisplay);
        volumeUpButton.removeEventListener('mouseup', hideVolumeDisplay);
        volumeDownButton.removeEventListener('mouseleave', hideVolumeDisplay);
        volumeUpButton.removeEventListener('mouseleave', hideVolumeDisplay);

        // Reasignar event listeners
        volumeDownButton.addEventListener('mousedown', handleVolumeDown);
        volumeUpButton.addEventListener('mousedown', handleVolumeUp);
        volumeDownButton.addEventListener('mouseup', hideVolumeDisplay);
        volumeUpButton.addEventListener('mouseup', hideVolumeDisplay);
        volumeDownButton.addEventListener('mouseleave', hideVolumeDisplay);
        volumeUpButton.addEventListener('mouseleave', hideVolumeDisplay);
    }

    // Funciones manejadoras para el control de volumen
    function handleVolumeDown() {
        updateVolume(false);
    }

    function handleVolumeUp() {
        updateVolume(true);
    }

    // Funciones de carga de aplicaciones
    function loadAdminApp() {
        fetch('aplicaciones/admin.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('admin-mode');
                dock.style.display = "none";
            })
            .catch(error => console.log('Error loading admin.html:', error));
    }

    function loadAjustesApp() {
        fetch('aplicaciones/ajustes.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('ajustes-mode');
                dock.style.display = "none";
    
                const existingScript = document.getElementById('ajustes-script');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
    
                const ajustesScript = document.createElement('script');
                ajustesScript.src = 'js/ajustes.js';
                ajustesScript.id = 'ajustes-script';
                document.body.appendChild(ajustesScript);
    
                ajustesScript.onload = function() {
                    if (typeof initializeAjustes === 'function') {
                        initializeAjustes();
                    }
                };
            })
            .catch(error => console.log('Error loading ajustes.html:', error));
    }

    function loadCalcApp() {
        fetch('aplicaciones/calculator.html')
            .then(response => response.text())
            .then(data => {
                screen.innerHTML = data;
                screen.classList.remove('home-screen');
                screen.classList.add('calc-mode');
                dock.style.display = "none";

                const existingScript = document.getElementById('calculator-script');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }

                const calculatorScript = document.createElement('script');
                calculatorScript.src = 'js/calculator.js';
                calculatorScript.id = 'calculator-script';
                document.body.appendChild(calculatorScript);
                
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
        loadPDF('normativas/normativa.pdf');
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

    function initializeAppButtons() {
        const appadmin = document.getElementById("appadmin");
        const apprule = document.getElementById("apprule");
        const appcalc = document.getElementById("appcalc");
        const appajustes = document.getElementById("appajustes");
        const dockAppadmin = document.getElementById("dock-appadmin");
        const dockApprule = document.getElementById("dock-apprule");
        const dockAppcalc = document.getElementById("dock-appcalc");
        const dockAppajustes = document.getElementById("dock-appajustes");
        
        if (appadmin) {
            appadmin.addEventListener("click", loadAdminApp);
        }

        if (apprule) {
            apprule.addEventListener("click", loadRuleApp);
        }

        if (appcalc) {
            appcalc.addEventListener("click", loadCalcApp);
        }

        if (appajustes) {
            appajustes.addEventListener("click", loadAjustesApp);
        }
        
        //DOCK
        if (dockAppadmin) {
            dockAppadmin.addEventListener("click", loadAdminApp);
        }

        if (dockApprule) {
            dockApprule.addEventListener("click", loadRuleApp);
        }

        if (dockAppcalc) {
            dockAppcalc.addEventListener("click", loadCalcApp);
        }

        if (dockAppajustes) {
            dockAppajustes.addEventListener("click", loadAjustesApp);
        }
    }

    navBar.addEventListener("click", function() {
        // Restaurar la clase de la pantalla a home-screen
        screen.classList.add('home-screen');
        screen.classList.remove('admin-mode', 'ajustes-mode', 'calc-mode', 'rule-mode');
    
        // Volver a mostrar el dock
        dock.style.display = "flex";
    
        fetch(`https://${GetParentResourceName()}/loadBackground`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
        
        screen.innerHTML = `
            <div class="left-column">
                <div id="datetime"></div>
    
                <!-- Music Widget con reproducción integrada -->
                <div class="music-widget">
                    <div class="current-track">
                        <img id="music-app-icon" src="widget-musica/icon/apple-music-logo.png" alt="Apple Music Icon">
                        <div class="current-track-info">
                            <img id="current-track-img" class="hidden" src="" alt="Current Track">
                            <div>
                                <span id="current-track-title">Música</span>
                                <span id="current-track-artist"></span>
                            </div>
                        </div>
                    </div>
    
                    <div class="track-list">
                        <div class="track" data-audio="widget-musica/songs/alocate-remake.mp3" data-img="widget-musica/img/alocate-remake.jpg" data-title="Alocate Remake" data-artist="Mora">
                            <img src="widget-musica/img/alocate-remake.jpg" alt="Alocate Remake - Mora">
                            <span>Alocate Remake</span>
                        </div>
                        <div class="track" data-audio="widget-musica/songs/clima-deiv.mp3" data-img="widget-musica/img/clima.jpeg" data-title="Clima" data-artist="Deiv">
                            <img src="widget-musica/img/clima.jpeg" alt="Clima - Deiv">
                            <span>Clima</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div class="app" id="appadmin">
                    <img src="images/apps-imgs/app-admin.png" alt="App Icon">
                    <span>Administración</span>
                </div>
                <div class="app" id="apprule">
                    <img src="images/apps-imgs/app-rule.png" alt="App Icon">
                    <span>Normativas</span>
                </div>
                <div class="app" id="appcalc">
                    <img src="images/apps-imgs/app-calc.png" alt="App Icon">
                    <span>Calculadora</span>
                </div>
                <div class="app" id="appajustes">
                    <img src="images/apps-imgs/settings.png" alt="App Icon">
                    <span>Ajustes</span>
                </div>
            </div>
        `;
        updateDateTime();
    
        // Obtener las referencias actualizadas de los elementos
        currentTrackImg = document.getElementById('current-track-img');
        currentTrackTitle = document.getElementById('current-track-title');
        currentTrackArtist = document.getElementById('current-track-artist');
        musicAppIcon = document.getElementById('music-app-icon');
    
        // Restaurar la información de la pista actual en el widget si existe
        if (currentAudio && !currentAudio.paused) {
            updateWidget(currentTrackInfo.imgSrc, currentTrackInfo.title, currentTrackInfo.artist);
        } else {
            currentTrackImg.classList.add('hidden');
            musicAppIcon.classList.remove('hidden');
        }
    
        initializeMusicWidget(); // Re-inicializar el widget de música para asegurarse de que sigue funcionando.
        initializeAppButtons(); // Re-inicializar los botones de las aplicaciones
        initializeVolumeControls(); // Re-inicializar los controles de volumen
    
        // Reasignar el evento de togglePlayPause a los elementos actualizados
        currentTrackImg.addEventListener('click', togglePlayPause);
        currentTrackTitle.addEventListener('click', togglePlayPause);
        currentTrackArtist.addEventListener('click', togglePlayPause);
    });
    
    initializeMusicWidget(); // Inicialización inicial del widget de música
    initializeAppButtons(); // Inicialización inicial de los botones de las aplicaciones
    initializeVolumeControls(); // Inicialización inicial de los controles de volumen

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
    currentTrackTitle.addEventListener('click', togglePlayPause);
    currentTrackArtist.addEventListener('click', togglePlayPause);

    function updateDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = now.toLocaleDateString('es-ES', options);
    
        const datetimeContainer = document.getElementById('datetime');
        if (datetimeContainer) {
            datetimeContainer.innerHTML = `
                <span id="time">${time}</span>
                <span id="date">${date.charAt(0).toUpperCase() + date.slice(1)}</span>
            `;
        }
    }
});