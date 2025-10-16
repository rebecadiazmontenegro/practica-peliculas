import movies from "./movies.js" 
console.log(movies)

// -------------------------- Todas las peliculas + Botón Delete + Botón Editar --------------------------

const allPeliculas = document.getElementById("allPeliculas");
console.log(allPeliculas)

function mostrarPeliculas(movies) {
    let peliculaHTML = ""; 
    for (let i = 0; i < movies.length; i++) {
        peliculaHTML += `
         <article class="cardPelicula" data-index="${i}">
            <img class="portada" src="${movies[i].url_foto}">    
            <h3>${movies[i].titulo}</h3>
            <p>${movies[i].year}</p>
            <p>${movies[i].genero}</p>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </article>`;
    }
allPeliculas.innerHTML = peliculaHTML; //Aqui se renderizan todas las películas del array.


    //BOTÓN DE BORRAR (sigue siendo parte de la función)

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.parentElement.dataset.index; 
            Swal.fire({
                title: "¿Seguro que quieres borrar esta película?",
                text: "Si la eliminas no podras verla más en tu tablero",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#30d699ff",
                cancelButtonColor: "#f32321",
                confirmButtonText: "Si, eliminala"
            })
                .then((result) => {
                if (result.isConfirmed) {
                    movies.splice(index, 1);
                    mostrarPeliculas(movies);
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "Tu pelicula ha sido eliminada.",
                        icon: "success"
                    });
                }
            });

        });
    });

    //BOTÓN DE EDITAR (sigue siendo parte de la función)

    const editButtons = document.querySelectorAll(".edit-button"); // Seleccionan todos los botones de editar dentro del innerHTML
    editButtons.forEach((button) => { //Esto recorre el array que nos ha dado el paso anterior, osea cada uno de los botones
        button.addEventListener("click", () => {
            const article = button.parentElement; //Le atribuimos a la constante article el contenedor padre del boton que en mi caso es .cardPelicula, para que modifique la pelicula correcta
            const index = article.dataset.index; //Localiza el indice de la pelicula gracias al data-index puesto en el artículo antes

            //Cambiamos el contenido de la car por esto
              article.innerHTML = `
            <form class="edit-form">
                <label>Portada: <input type="text" name="url_foto" value="${movies[index].url_foto}" required></label>
                <label>Título: <input type="text" name="titulo" value="${movies[index].titulo}" required></label>
                <label>Año: <input type="number" name="year" value="${movies[index].year}" required></label>
                <label>Género:
                    <select name="generoFilterEdit" required> 
                        <option value="Romance" ${movies[index].genero === "Romance" ? "selected" : ""}>Romance</option>
                        <option value="Musical" ${movies[index].genero === "Musical" ? "selected" : ""}>Musical</option>
                        <option value="Comedia" ${movies[index].genero === "Comedia" ? "selected" : ""}>Comedia</option>
                        <option value="Acción" ${movies[index].genero === "Acción" ? "selected" : ""}>Acción</option>
                        <option value="Infantil" ${movies[index].genero === "Infantil" ? "selected" : ""}>Infantil</option>
                        <option value="Terror" ${movies[index].genero === "Terror" ? "selected" : ""}>Terror</option>
                    </select>
                </label>
                <button type="submit">Aceptar</button>
            </form>
        `; // Si el titulo de la pelicula coincide con el selector se queda puesto, asi se consigue que el selector salga con el genero que tiene la peli.
            //Seleccinamos el formulario que hemos creado
            const editForm = article.querySelector(".edit-form");
            editForm.addEventListener("submit", (event) => { //Lo. que va a pasar cuando le das al boton de guardar
                event.preventDefault();

                movies[index].url_foto = editForm.elements.url_foto.value.trim();
                movies[index].titulo = editForm.elements.titulo.value.trim();
                movies[index].year = editForm.elements.year.value.trim();
                movies[index].genero = editForm.elements.generoFilterEdit.value;

                mostrarPeliculas(movies);
            });
        });
    });
}
mostrarPeliculas(movies);


// -------------------------- Añadir película y validar formulario --------------------------

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
        formularioAñadir.reset(); // Para que se vacie el formulario 

// Para que ya no salga la validación una vez se ha subido la pelicula
        mensajeTitulo.textContent = "";
        mensajeYear.textContent = "";
        mensajePortada.textContent = "";
    }
});


// -------------------------- Buscar pelicula por título --------------------------

const mensajeBuscador = document.getElementById("mensajeBuscador")
const buscador = document.getElementById("buscador");
const botonBuscar = document.querySelector(".botonBuscar");
const peliculasEcontradas = document.getElementById("peliculasEcontradas");

buscador.addEventListener("input", () => { //Hace que el mensaje de alerta se quite cuando vuelves a escribir
    mensajeBuscador.textContent = "";
});

botonBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    const tituloBuscado = buscador.value.trim().toLowerCase();

    if (!tituloBuscado) {
        mensajeBuscador.textContent = "Introduzca un título";
        mensajeBuscador.style.color = "#f32321";
        return;
    }
    const peliculaEncontrada = movies.find(movie => movie.titulo.toLowerCase().includes(tituloBuscado));
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
            </table>`
    } else {
        peliculasEcontradas.innerHTML = `<p>No se encontró ninguna película con ese título.</p>`;
    }
});



// -------------------------- Filtrar por género --------------------------

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

 




