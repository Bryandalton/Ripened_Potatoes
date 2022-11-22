const router = require('express').Router();
const { User, Review, Movie, Tag } = require('../models');
const withAuth = require('../utils/auth');
const { move } = require('./api');

router.get('/', async (req, res) => { 
    try{
        const movieData = await Movie.findAll({
            include: [
                {
                    model: Review,
                    attributes: ['description', 'rating']
                },
                {
                    model: Tag,
                    attributes: ['tag_name']
                },
            ],
        });
        const movies = movieData.map((movie) => movie.get({ plain: true }));
        res.render('homePage', {
            movies,
            //login?
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/movie/:id', async (req, res) => {
    try{
        const movieData = await Movie.findByPk(req.params.id,{
            include: [
                {
                    model: Review,
                    attributes: ['description', 'rating']
                },
                {
                    model: Tag,
                    attributes: ['tag_name']
                },
            ],
        });
        const movie = movieData.get({plain: true});
        res.render('movie', {
            ...movie,
            logged_in: req.session.logged_in
        });
    }
    catch(err){
    res.status(500).json(err);
    }
});