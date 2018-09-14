import {
    OPEN_ADD_CONTACT_DIALOG,
    CLOSE_DIALOG,
    SET_CONTACTS,
    SET_USER_INFO,
    RESET_APP, SET_CACHED_USERS,
    REMOVE_CONTACT,
    ADD_CONTACT,
    OPEN_LOGIN_PAGE,
    OPEN_SIGNUP_PAGE,
    ADD_BOAT,
    SET_BOATS,
    OPEN_ADD_BOAT_DIALOG,
    OPEN_ADD_DESTINATION_DIALOG,
    OPEN_ADD_TRIP_DIALOG,
    ADD_DESTINATION,
    SET_DESTINATIONS,
    ADD_TRIP,
    SET_TRIPS
} from './actions'
import {
    DIALOG_ADD_CONTACT,
    LOGIN_LOGIN,
    LOGIN_SIGNUP,
    DIALOG_ADD_BOAT,
    DIALOG_ADD_DESTINATION,
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
        trips: [],
        user: null
    },
})

function uiReducer(uiState, {type, payload}) {
    switch (type) {
        case OPEN_ADD_CONTACT_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_CONTACT}
        }
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
        case OPEN_SIGNUP_PAGE: {
                return {...uiState, loginPage: LOGIN_SIGNUP}
        }
        case OPEN_ADD_BOAT_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_BOAT}
        }
        case OPEN_ADD_DESTINATION_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_DESTINATION}
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
        case SET_CONTACTS: {
            return {...dataState, contacts: payload}
        }
        case ADD_CONTACT: {
            const contacts = [...dataState.contacts, payload]
            return {...dataState, contacts}
        }
        case REMOVE_CONTACT: {
            const contacts = dataState.contacts.filter(contact => contact._id !== payload)
            return {...dataState, contacts}
        }
        case ADD_BOAT: {
            const boats = [...dataState.boats, payload]
            return {...dataState, boats}
        }
        case SET_BOATS: {
            return {...dataState, boats: payload}
        }
        case ADD_DESTINATION: {
            const destinations = [...dataState.destinations, payload]
            return {...dataState, destinations}
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
