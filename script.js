window.onload = function () {
    // Variables

    // Añadir las tres imágenes del directorio "img" al array IMAGENES.
    const IMAGENES = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;

    // posición actual guarda el indice de la imágen que se está mostrando (del array IMAGENES)
    let posicionActual = 0;

    // variables con los elementos del DOM HTML, aplicar el selector necesario.
    let $botonRetroceder = document.getElementById("retroceder");
    let $botonAvanzar = document.getElementById("avanzar");
    let $imagen = document.getElementById("imagen");
    let $botonPlay = document.getElementById("play");
    let $botonStop = document.getElementById("stop");


    // Identificador del proceso que se ejecuta con setInterval().
    let intervalo;

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual++;
        if (posicionActual === IMAGENES.length) {
            posicionActual = 0;
        }

        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual--;
        if (posicionActual === -1) {
            posicionActual = IMAGENES.length - 1;
        }

        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        // Documentación de la función setInterval: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // Mediante la función setInterval() se ejecuta la función pasarFoto cada TIEMPO_INTERVALO_MILESIMAS_SEG.
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);

        // Desactivamos los botones de control necesarios. Utilizando setAttribute y removeAttribute.
        $botonPlay.setAttribute("disabled", "");
        $botonStop.removeAttribute("disabled");
        $botonAvanzar.setAttribute("disabled", "");
        $botonRetroceder.setAttribute("disabled", "");


    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        // Desactivar la ejecución de intervalo.
        clearInterval(intervalo);

        // Activamos los botones de control. Utilizando setAttribute y removeAttribute.
        $botonPlay.removeAttribute("disabled");
        $botonStop.setAttribute("disabled", "");
        $botonAvanzar.removeAttribute("disabled");
        $botonRetroceder.removeAttribute("disabled");
    }

    function showInfoImagen() {
        $imagen.innerText = `url(${IMAGENES[posicionActual]})`;
    }

    function leaveInfoImagen() {
        $imagen.innerText = "";
    }


    // Eventos
    // Añadimos los eventos necesarios para cada boton. Mediante addEventListener.

    $botonStop.addEventListener("click", stopIntervalo);
    $botonPlay.addEventListener("click", playIntervalo);
    $botonAvanzar.addEventListener("click", pasarFoto);
    $botonRetroceder.addEventListener("click", retrocederFoto);
    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            //Boton de la Izquierda
            case 37:
                retrocederFoto();
                break;
            //Boton de la Derecha
            case 39:
                pasarFoto();
                break;
        }
    });
    $imagen.addEventListener("mouseover",showInfoImagen);
    $imagen.addEventListener("mouseleave",leaveInfoImagen);


    // Iniciar
    renderizarImagen();


} 
