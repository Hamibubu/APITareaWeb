const router = require('express').Router();
const movieController = require('../controller/movieC');

// Obtener pelis
router.get('/movies',movieController.getMovies);
// Agregar pelis
router.post('/movies',movieController.createMovie);
// Borrar pelis
router.delete('/movies', movieController.deleteMovie);


module.exports = router;