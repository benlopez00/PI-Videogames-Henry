import axios from 'axios'
import { CLEAN_VIDEOGAME, GET_VIDEOGAME, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL } from '../types'

export const getVideogames = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('http://localhost:3001/videogames')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const searchVideogame = videogame => ({
    type: GET_VIDEOGAME,
    payload: videogame
})

export const getVideogameDetail = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanVideogameDetail = () => ({
    type: CLEAN_VIDEOGAME
})