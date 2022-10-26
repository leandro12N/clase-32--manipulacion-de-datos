const { body } = require("express-validator");

module.exports = {
    createMovieValidar:[
        body("title")
        .notEmpty()
        .withMessage("campo title incompleto"),
        body("rating")
            .notEmpty()
            .withMessage("campo rating incompleto"),
        body("awards")
            .notEmpty()
            .withMessage("campo awards incompleto"),
        body("release_date")
            .notEmpty()
            .withMessage("campo release_date incompleto"),
        body("length")
            .notEmpty()
            .withMessage("campo length incompleto")
    ],
    updateMovieValidar:[
        body("title")
        .notEmpty()
        .withMessage("campo title incompleto"),
        body("rating")
            .notEmpty()
            .withMessage("campo rating incompleto"),
        body("awards")
            .notEmpty()
            .withMessage("campo awards incompleto"),
        body("release_date")
            .notEmpty()
            .withMessage("campo release_date incompleto"),
        body("length")
            .notEmpty()
            .withMessage("campo length incompleto")
    ]
}