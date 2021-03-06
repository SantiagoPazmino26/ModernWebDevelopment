import {
    CLOSE_DIALOG,
    SET_USER_INFO,
    RESET_APP, SET_CACHED_USERS,
    OPEN_LOGIN_PAGE,
    SET_BOATS,
    OPEN_ADD_TRIP_DIALOG,
    SET_DESTINATIONS,
    ADD_TRIP,
    SET_TRIPS
} from './actions'
import {
    LOGIN_LOGIN,
    DIALOG_ADD_TRIP
} from './constants'

const initialState = () => ({
    ui: {
        dialog: null,
        loginPage: LOGIN_LOGIN,
        addContact: {
            cachedUsers: [],
        }
    },
    data: {
        userInfo: null,
        contacts: [],
        boats: [],
        destinations: [],
        users: [],
        trips: []
    },
})

function uiReducer(uiState, {type, payload}) {
    switch (type) {
        case CLOSE_DIALOG: {
            return {...uiState, dialog: null}
        }
        case SET_CACHED_USERS: {
            const {addContact} = uiState
            return {...uiState, addContact: {...addContact, cachedUsers: payload}}
        }
        case OPEN_LOGIN_PAGE: {
            return {...uiState, loginPage: LOGIN_LOGIN}
        }
        case OPEN_ADD_TRIP_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_TRIP}
        }
        default:
            return uiState
    }
}

function dataReducer(dataState, {type, payload}) {
    switch (type) {
        case SET_USER_INFO: {
            return {...dataState, userInfo: payload}
        }
        case SET_BOATS: {
            return {...dataState, boats: payload}
        }
        case SET_DESTINATIONS: {
            return {...dataState, destinations: payload}
        }
        case ADD_TRIP: {
            const trips = [...dataState.trips, payload]
            return {...dataState, trips}
        }
        case SET_TRIPS: {
            return {...dataState, trips: payload}
        }
        default:
            return dataState
    }
}

export default function reducer(state = initialState(), action) {
    const {type} = action
    if (type === RESET_APP) {
        return initialState()
    } else if (type.startsWith('UI/')) {
        const ui = uiReducer(state.ui, action)
        return {...state, ui}
    } else if (type.startsWith('DATA/')) {
        const data = dataReducer(state.data, action)
        return {...state, data}
    } else {
        return state
    }
}
