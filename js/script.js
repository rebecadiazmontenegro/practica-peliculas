import movies from "./movies.js" 
console.log(movies)

const allPeliculas = document.getElementById("allPeliculas");
console.log(allPeliculas)

let pelicula = ""

for (let i = 0; i < movies.length; i++) {
    pelicula +=`
    <article class="cardPelicula">
        <img class="portada" src=${movies[i].url_foto}>    
        <h3>${movies[i].titulo}</h3>
        <p>${movies[i].year}</p>
        <p>${movies[i].genero}</p>
    </article>`
}

allPeliculas.innerHTML = pelicula;