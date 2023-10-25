const Movie = require('../model/movie');
const { response } = require('express');

class MovieController {
    async getMovies(req,res) {
        try {
            const movies = await Movie.find();
            res.json(movies);
        } catch(err) {
            res.status(500).send(err);
        }
    }
    async createMovie(req,res) {
        const movie = new Movie(req.body);
        try {
            await movie.save();
            res.status(201).send(movie);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async deleteMovie(req, res) {
        const { id } = req.body;
        try {
            const deletedMovie = await Movie.findByIdAndRemove(id);
    
            if (!deletedMovie) {
                return res.status(404).json({ message: 'La película no existe' });
            }
    
            res.json({ message: 'Película eliminada con éxito' });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new MovieController();