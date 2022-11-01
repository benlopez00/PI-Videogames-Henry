const axios = require('axios')
const { Videogame, Genre } = require('../db')

const getVideogamesApi = async () => {
    const wantedPages = 8
    let url = ''
    let result = []
    for (let i = 1; i <= wantedPages; i++) {
        url = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`
        const { data : { results } } = await axios(url)
        const objVideogames = results.map(videogame => ({
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            launchDate: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms.map(p => p.platform.name),
            image: videogame.background_image,
            genres: videogame.genres ? videogame.genres.map(genre => genre.name) : 'Undefined'
        })) 
        result = [...result, ...objVideogames]
    }
    return result
}

const getVideogameApiId = async id => {
    const url = `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
    const { data: game } = await axios(url)
    return {
        name: game.name,
        description: game.description,
        launchDate: game.released,
        rating: game.rating,
        platforms: game.platforms.map(p => p.platform.name),
        image: game.background_image,
        genres: game.genres.map(g => g.name)
    }
}

const getVideogamesDB = async () => {
    try {
        const videogames = await Videogame.findAll({
            attributes: [
                'id',
                'name',
                'image',
                'created'
            ],
            include: Genre
        })

        return videogames.map(videogame => ({
            id: videogame.id,
            name: videogame.name,
            image: videogame.image ? videogame.image : 'https://www.softzone.es/app/uploads-softzone.es/2020/03/Programaci%C3%B3n-Videojuegos.jpg',
            genres: videogame.genres.map(el => el.name),
            created: videogame.created
        }))

    } catch (error) {
        console.log(error)
    }
}

const getVideogamesApiDb = async () => {
    try {
        const [resultApi, resultDb] = await Promise.all([getVideogamesApi(), getVideogamesDB()])
        return resultApi.concat(resultDb)
    } catch (error) {
        console.log(error)
    }
}

const getGenresApi = async () => {
    const url = `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
    const { data: { results } } = await axios(url)
    return results.map(genre => ({
        id: genre.id,
        name: genre.name
    }))
}


module.exports = {
    getVideogamesApiDb,
    getVideogameApiId,
    getGenresApi
}
