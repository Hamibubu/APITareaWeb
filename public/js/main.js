$(document).ready(function() {
    function eliminar(id, row) {
        $.ajax({
            url: 'http://localhost:3000/movies',
            method: 'DELETE',
            data: JSON.stringify({ id: id }), // Reemplaza con el ID correcto
            contentType: 'application/json',
            success: function(response) {
                alert('Película eliminada con éxito');
                row.remove();
            },
            error: function(error) {
                console.error('Error:', error);
                alert('Hubo un error al eliminar la película. Inténtalo de nuevo.');
            }
        });
    }

    if($("form").length){
        $('#link').on('click', function() {
            window.location.href = "./../views/index.html";
        });
        $("form").on('submit', function(event) {
            event.preventDefault();

            if (this.checkValidity() === false) {
                event.stopPropagation();
            } else {
                const movieData = {
                    name: $('#pelicula').val(),
                    synopsis: $('#sinopsis').val(),
                    genre: $('#genero').val(),
                    duration: $('#duracion').val(),
                    director: $('#director').val(),
                    actors: $('#actores').val()
                };

                $.ajax({
                    url: 'http://localhost:3000/movies',
                    method: 'POST',
                    data: JSON.stringify(movieData),
                    contentType: 'application/json',
                    success: function(response) {
                        alert('Película registrada con éxito!');
                        window.location.href = "./../views/index.html";
                        $("form")[0].reset();
                    },
                    error: function(error) {
                        console.error('Error:', error);
                        alert('Hubo un error al registrar la película. Inténtalo de nuevo.');
                    }
                });
            }
            $(this).addClass('was-validated');
        });
    } else {
        $('#link').on('click', function() {
            window.location.href = "./../views/postmovies.html";
        });
        $.ajax({
            url: 'http://localhost:3000/movies', // Asegúrate de que esta sea la URL correcta para obtener los datos
            method: 'GET',
            success: function(response) {
                if(!response.length){
                    alert('Aún no has agregado películas');
                };
                let cont = 0;
                response.forEach(function(movie) {
                    cont++;
                    const movieRow = `
                        <tr>
                            <td>${cont}</td>
                            <td>${movie.name}</td>
                            <td>${movie.synopsis}</td>
                            <td>${movie.genre}</td>
                            <td>${movie.duration}</td>
                            <td>${movie.director}</td>
                            <td>${movie.actors}</td>
                            <td><button class="btn btn-danger btn-sm eliminar-pelicula" data-id="${movie._id}">Eliminar</button></td
                        </tr>
                    `;
                    $('#table').append(movieRow);
                });
                $('.eliminar-pelicula').on('click', function() {
                    const button = $(this);
                    const id = button.data('id');
                    const row = button.closest('tr');
                    eliminar(id,row);
                });
            },
            error: function(error) {
                console.error('Error:', error);
                alert('Hubo un error al cargar las películas. Inténtalo de nuevo.');
            }
        });
    }
});

