const { Router } = require('express');
const { getGenres } = require('../controllers/genres.controller');
const { getVideogames, getVideogamesById, createVideogame } = require('../controllers/videogames.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//videogames
router.get('/videogames', getVideogames)
router.get('/videogames/:id', getVideogamesById)
router.post('/videogames', createVideogame)

//genre
router.get('/genres', getGenres)

module.exports = router;