const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render("moviesAdd") 
    },
    create: function (req, res) {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            
            Movies.create({
                title: req.body.title,
                rating: req.body.rating,
                length: req.body.length,
                awards: req.body.awards,
                release_date: req.body.release_date
            })
            .then(function(){
                res.redirect("/movies")
            })
            .catch(error => res.send(error))
        }else{
            res.render("moviesAdd", { errors: errors.mapped()})
        }
    },
    edit: function(req, res) {
        let movieId = req.params.id;
        Movies.findByPk(movieId)
        .then(function(movie){
            res.render("moviesEdit", {Movie: movie})
        })
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        const errors = validationResult(req);
        if(errors.isEmpty()){
        let movieId = req.params.id;
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            awards: req.body.awards,
            release_date: req.body.release_date
        },{
           where:{
            id: movieId
           } 
        })
        .then(function(){
            res.redirect("/movies")
        })
        .catch(error => res.send(error))
    }else{
        res.render("moviesEdit", { errors: errors.mapped()})
    }
    },
    delete: function (req, res) {
        let movieId = req.params.id;
        Movies.findByPk(movieId)
        .then(function(movie){
            res.render("moviesDelete", {Movie: movie})
        })
        .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies.destroy({
            where:{
                id: movieId
            },
            force: true
        })
        .then(function(){
            res.redirect("/movies")
        })
        .catch(error => res.send(error))
    }

}

module.exports = moviesController;