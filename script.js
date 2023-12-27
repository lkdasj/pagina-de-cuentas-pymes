let menuVisible = false;
let currentPage = 1;
const boxesPerPage = 12;
const boxesPerPageMobile = 9;


function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

function mostrarSeleccion() {
    var opciones = document.getElementById("opciones");
    var seleccion = opciones.options[opciones.selectedIndex].value;

    if (seleccion) {
        var secciones = document.querySelectorAll('.tab-content');
        for (var i = 0; i < secciones.length; i++) {
            secciones[i].style.display = "none";
        }

        // Oculta la caja de presentación
        var cajaPresentacion = document.getElementById("cajacategory");
        if (cajaPresentacion) {
            cajaPresentacion.style.display = "none";
        }

        var seleccionada = document.querySelector('.' + seleccion);
        if (seleccionada) {
            seleccionada.style.display = "grid";
            showPage(currentPage, seleccionada);
        }
    }
}

document.getElementById("opciones").addEventListener("change", function () {
    currentPage = 1;
    mostrarSeleccion();
});

function showPage(page, category) {
    const allCategories = document.querySelectorAll('.tab-content');

    allCategories.forEach((cat) => {
        const boxes = cat.querySelectorAll('.box-1, .box-2, .box-3, .box-4');
        boxes.forEach((box) => {
            box.style.display = "none";
        });
    });

    if (!category) {
        updatePaginationButtons(0); 
        return;
    }

    const boxes = category.querySelectorAll('.box-1, .box-2, .box-3, .box-4');
    const startIndex = (page - 1) * (isMobile() ? boxesPerPageMobile : boxesPerPage);
    const endIndex = startIndex + (isMobile() ? boxesPerPageMobile : boxesPerPage);

    boxes.forEach((box, index) => {
        if (index >= startIndex && index < endIndex) {
            box.style.display = "inline-block";
        } else {
            box.style.display = "none";
        }
    });

    updatePaginationButtons(Math.ceil(boxes.length / (isMobile() ? boxesPerPageMobile : boxesPerPage)));
}
function isMobile() {
    // Aquí puedes agregar la lógica para determinar si estás en un dispositivo móvil.
    // Puedes utilizar la anchura de la ventana (window.innerWidth) o alguna biblioteca de detección de dispositivos.
    // El siguiente es solo un ejemplo de cómo puedes implementar esta función.
    return window.innerWidth <= 767; // Cambia el valor según tus necesidades.
}

function updatePaginationButtons(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                const categoriaVisible = document.querySelector('.tab-content:not([style*="none"])');
                showPage(currentPage, categoriaVisible);
            });

            paginationContainer.appendChild(button);
        }

        const paginaActual = document.getElementById('paginaActual');
        if (paginaActual) {
            paginaActual.innerText = currentPage;
        }
    }
}

function cambiarPagina(direccion) {
    currentPage += direccion;
    const categoriaVisible = document.querySelector('.tab-content.visible');
    showPage(currentPage, categoriaVisible);
}

function initializePagination() {
    showPage(currentPage, null);
}

function initializePagination() {
    const categoriaVisible = document.querySelector('.tab-content:not([style*="none"])');
    
    if (categoriaVisible) {
        showPage(currentPage, categoriaVisible);
    } 
    else {
        console.error("No se encontró la categoría visible en la inicialización de la paginación.");
    }
}

mostrarSeleccion();
initializePagination();
