import {
    CLOSE_DIALOG,
    SET_USER_INFO,
    RESET_APP,
    OPEN_LOGIN_PAGE,
    OPEN_ADD_TRIP_DIALOG,
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
