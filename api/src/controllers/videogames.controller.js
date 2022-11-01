const { getVideogamesApiDb, getVideogameApiId } = require("../helpers")
const { Videogame, Genre } = require('../db')
const { validate } = require('uuid')

//http://localhost:3001/videogames
const getVideogames = async (req, res) => {
    //http://localhost:3001/videogames?name=Crusader Kings II
    const { name } = req.query
    const videogames = await getVideogamesApiDb()
    try {
        if(!name) return res.status(200).json(videogames)
        const videogamesFiltered = videogames.filter(vgame => vgame.name.toLowerCase().includes(name.toLowerCase()))
        videogamesFiltered.length ? res.status(200).json(videogamesFiltered) : res.status(404).json({ msg: 'Not found' })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}

//http://localhost:3001/videogames/178e9687-3f4d-487a-ad65-f8c7da0ce02f
const getVideogamesById = async (req, res) => {
    const { id } = req.params
    // const videogames = await getVideogamesApiDb()
    // const existVideogame = videogames.find(vgame => vgame.id == id)

    // if(!existVideogame) return res.status(404).json({
    //     msg: 'Videogame not found'
    // }) 
    if(validate(id)){
        const videogameDB = await Videogame.findByPk(id, {
            include: {
                model: Genre,
                attributes: ['name'],
            }
        })
        return res.status(202).json(videogameDB)
    }
    const videoGameApi = await getVideogameApiId(id)
    return res.status(202).json(videoGameApi)
}

//http://localhost:3001/videogames
/* {
    "name":"Allianz",
    "description":"Best player",
    "launchDate":"2013-09-17",
    "rating": 10,
    "platforms":[
            "PC",
            "Xbox Series S/X",
            "PlayStation 4"],
    "genres":["2352f2db-b2fc-46b9-b978-e2ecbf8c7f8a", "4e5a7998-f76b-4dfe-b668-3666111a1bc9"]
} */
const createVideogame = async (req, res) => {
    const { id, name, description, launchDate, rating, platforms, genres } = req.body
    try {
        const existGame = await Videogame.findOne({
            where: {
                name
            }
        })

        if(existGame) {
            return res.status(400).json({ msg: 'Videogame already exists' })
        }else{
            const newVideogame = await Videogame.create({
                id,
                name,
                description,
                launchDate,
                rating,
                platforms
            })

            for(const id of genres){
                const genre = await Genre.findByPk(id)
                newVideogame.addGenre(genre)
            }

            res.status(201).json(newVideogame)
        }
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}


module.exports = {
    getVideogames,
    getVideogamesById,
    createVideogame
}