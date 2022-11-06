import { CLEAN_VIDEOGAME, GET_VIDEOGAME, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL } from "../types"

const initialState = {
    videogames: [],
    videogamesFiltered: [],
    genresSelect: [],
    videogameSelected: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesFiltered: action.payload
            }
        case GET_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload !== '' ? state.videogamesFiltered.filter(vgame => vgame.name.toLowerCase().includes(action.payload.toLowerCase()) && vgame)
                : [...state.videogamesFiltered]
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameSelected: action.payload
            }
        case CLEAN_VIDEOGAME:
            return {
                ...state,
                videogameSelected: {}
            }
        default:
            return state
    }
}