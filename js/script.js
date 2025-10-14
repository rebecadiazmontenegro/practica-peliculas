import movies from "./movies.js" 
console.log(movies)

// -------- Todas las peliculas --------

const allPeliculas = document.getElementById("allPeliculas");
console.log(allPeliculas)

function mostrarPeliculas(movies) {
    let peliculaHTML = ""; 

    for (let i = 0; i < movies.length; i++) {
        peliculaHTML += `
         <article class="cardPelicula">
            <img class="portada" src="${movies[i].url_foto}">    
            <h3>${movies[i].titulo}</h3>
            <p>${movies[i].year}</p>
            <p>${movies[i].genero}</p>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </article>`;
    }

    allPeliculas.innerHTML = peliculaHTML; 

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.parentElement.dataset.index; //Asi conseguimos acceder al indice de la pelicula que queremos eliminar
            movies.splice(index, 1); // con splice se elimina un elemento del array del array
            mostrarPeliculas(movies); // vuelve a cargar las peliculas
        });
    });
}
mostrarPeliculas(movies); 


// const allPeliculas = document.getElementById("allPeliculas");
// console.log(allPeliculas);

// function mostrarPeliculas(movies) {
//     let peliculaHTML = `
//         <table class="tablaPeliculas">
//             <thead>
//                 <tr>
//                     <th>Portada</th>
//                     <th>Título</th>
//                     <th>Año</th>
//                     <th>Género</th>
//                     <th>Acciones</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     for (let i = 0; i < movies.length; i++) {
//         peliculaHTML += `
//             <tr>
//                 <td><img class="portada" src="${movies[i].url_foto}" alt="${movies[i].titulo}" style="width:100px;"></td>
//                 <td>${movies[i].titulo}</td>
//                 <td>${movies[i].year}</td>
//                 <td>${movies[i].genero}</td>
//                 <td>
//                     <button class="edit-button">Edit</button>
//                     <button class="delete-button">Delete</button>
//                 </td>
//             </tr>
//         `;
//     }

//     peliculaHTML += `
//             </tbody>
//         </table>
//     `;

//     allPeliculas.innerHTML = peliculaHTML;


mostrarPeliculas(movies);


// -------- Añadir película y validar formulario --------

const formularioAñadir = document.getElementById("formularioAñadir");
const formularioYear = document.getElementById("year");
const formularioTitulo = document.getElementById("titulo");
const formularioPortada = document.getElementById("portada");

const mensajeTitulo = document.getElementById("mensajeTitulo");
const mensajeYear = document.getElementById("mensajeYear");
const mensajePortada = document.getElementById("mensajePortada");

formularioAñadir.addEventListener("submit", (e) => {
    e.preventDefault();

//Defino cada uno de los Regex
    const regexTitulo = /^(?!\s*$).+/;
    const regexYear = /^\d{4}$/;
    const regexPortada = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

    const titulo = formularioTitulo.value.trim();
    const year = formularioYear.value.trim();
    const url_foto = formularioPortada.value.trim();
    const genero = document.querySelector(".generoSelector").value;

// Se comienza pensando que todo es valido, por eso se pone true
    let valido = true;

    if (!regexTitulo.test(titulo)) {
        mensajeTitulo.textContent = "El título debe contener al menos un carácter.";
        mensajeTitulo.style.color = "#f32321";
        valido = false; // Si pasa esto no es valido por lo que se pone false

    } else {
        mensajeTitulo.textContent = "Título válido";
        mensajeTitulo.style.color = "#21f3b4ff";
    }

    if (!regexYear.test(year)) {
        mensajeYear.textContent = "El año debe tener 4 cifras numéricas.";
        mensajeYear.style.color = "#f32321";
        valido = false;
    } else if (year < 1800 || year > 2025) {
        mensajeYear.textContent = "El año debe estar entre 1800 y 2025.";
        mensajeYear.style.color = "#f32321";
        valido = false;
    } else {
        mensajeYear.textContent = "Año válido";
        mensajeYear.style.color = "#21f3b4ff";
    }

    if (!regexPortada.test(url_foto)) {
        mensajePortada.textContent = "Debe ser una URL válida (jpg, png, jpeg, gif, webp).";
        mensajePortada.style.color = "#f32321";
        valido = false;
    } else {
        mensajePortada.textContent = "URL válida";
        mensajePortada.style.color = "#21f3b4ff";
    }

// Si todo es válido, añadir la película
    if (valido) {
        const nuevaPelicula = {
            titulo: titulo,
            year: year,
            url_foto: url_foto,
            genero: genero
        };

        movies.push(nuevaPelicula); //Aquí se hace push al array de movies
        mostrarPeliculas(movies); // Vuelve a llamar a la función para que se actualice con la pelicula nueva
        formularioAñadir.reset();

// Para que ya no salga la validación una vez se ha subido la pelicula
        mensajeTitulo.textContent = "";
        mensajeYear.textContent = "";
        mensajePortada.textContent = "";
    }
});
// --- Buscar pelicula por título ----

const buscador = document.getElementById("buscador");
const botonBuscar = document.querySelector(".botonBuscar");
const peliculasEcontradas = document.getElementById("peliculasEcontradas");
botonBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    const tituloBuscado = buscador.value.trim().toLowerCase();
    const peliculaEncontrada = movies.find(movie => movie.titulo.toLowerCase() === tituloBuscado);
    if (peliculaEncontrada) {
        peliculasEcontradas.innerHTML = `
            <table class=tablaPelicula>
                <tr>
                    <th colspan="2">${peliculaEncontrada.titulo}</th>
                </tr>
                <tr>
                    <td rowspan="3">
                        <img class="portadaBuscar" src="${peliculaEncontrada.url_foto}" alt="Portada">
                    </td>
                    <td><b>Año:</b> ${peliculaEncontrada.year}</td>
                </tr>
                <tr>
                    <td><b>Género:</b> ${peliculaEncontrada.genero}</td>
                </tr>
                <tr>
                    <td class=botonesTabla>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    </td>
                </tr>
            </table>`
    } else {
        peliculasEcontradas.innerHTML = `<p>No se encontró ninguna película con ese título.</p>`;
    }
});

// -------- Filtrar por género --------

const generoFilter = document.querySelector(".generoFilter");
const botonFiltrar = document.querySelector(".botonFiltrar");

botonFiltrar.addEventListener("click", () => { //Aqui le digo que cada vez que pulse el botón pasará lo siguiente:
    const generoSeleccionado = generoFilter.value;

    if (generoSeleccionado === "Todas") {
        let pelicula = ""
        for (let i = 0; i < movies.length; i++) {
            pelicula +=`
            <article class="cardPelicula">
                <img class="portada" src=${movies[i].url_foto}>    
                <h3>${movies[i].titulo}</h3>
                <p>${movies[i].year}</p>
                <p>${movies[i].genero}</p>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </article>`
        }
        allPeliculas.innerHTML = pelicula;
    } else {
        const filtradas = movies.filter(movie => movie.genero === generoSeleccionado); 
        if (filtradas.length > 0) { //Si hay más de una película pasa lo siguiente:
            let peliculaFiltrada = ""
            for (let i = 0; i < filtradas.length; i++) {
                peliculaFiltrada +=`
                <article class="cardPelicula">
                    <img class="portada" src=${filtradas[i].url_foto}>    
                    <h3>${filtradas[i].titulo}</h3>
                    <p>${filtradas[i].year}</p>
                    <p>${filtradas[i].genero}</p>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </article>` 
            }
            allPeliculas.innerHTML = peliculaFiltrada;
        } else {
            allPeliculas.innerHTML = `<p>No hay películas del género "${generoSeleccionado}".</p>`;
        }
    }
});

 




