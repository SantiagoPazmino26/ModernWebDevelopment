import axios from 'axios'

// plain actions

export const RESET_APP = 'RESET_APP'
export const resetApp = () => ({type: RESET_APP})

// ui

export const OPEN_ADD_CONTACT_DIALOG = 'UI/OPEN_ADD_CONTACT_DIALOG'
export const openAddContactDialog = () => ({type: OPEN_ADD_CONTACT_DIALOG})

export const CLOSE_DIALOG = 'UI/CLOSE_DIALOG'
export const closeDialog = () => ({type: CLOSE_DIALOG})

export const SET_CACHED_USERS = 'UI/SET_CACHED_USERS'
export const setCachedUsers = cachedUsers => ({type: SET_CACHED_USERS, payload: cachedUsers})

export const OPEN_LOGIN_PAGE = 'UI/OPEN_LOGIN_PAGE'
export const openLoginPage = () => ({type: OPEN_LOGIN_PAGE})

export const OPEN_SIGNUP_PAGE = 'UI/OPEN_SIGNUP_PAGE'
export const openSignupPage =  () => ({type: OPEN_SIGNUP_PAGE})

//ui//boat

export const OPEN_ADD_BOAT_DIALOG = 'UI/OPEN_ADD_BOAT_DIALOG'
export const openAddBoatDialog = () => ({type: OPEN_ADD_BOAT_DIALOG})

// data

export const SET_USER_INFO = 'DATA/SET_USER_INFO'
export const setUserInfo = userInfo => ({type: SET_USER_INFO, payload: userInfo})

export const SET_CONTACTS = 'DATA/SET_CONTACTS'
export const setContacts = contacts => ({type: SET_CONTACTS, payload: contacts})

export const ADD_CONTACT = 'DATA/ADD_CONTACT'
export const addContact = contact => ({type: ADD_CONTACT, payload: contact})

export const REMOVE_CONTACT = 'DATA/REMOVE_CONTACT'
export const removeContact = _id => ({type: REMOVE_CONTACT, payload: _id})

//data//boat

export const ADD_BOAT = 'DATA/ADD_BOAT'
export const addBoat = boat => ({type: ADD_BOAT, payload: boat})

export const SET_BOATS = 'DATA/SET_BOATS'
export const setBoats = boats => ({type: SET_BOATS, payload: boats})

// thunks

export const startAddContactDialog = () => async dispatch => {
    try {
        const usersRes = await axios.get('/api/users')
        dispatch(setCachedUsers(usersRes.data.users))
        dispatch(openAddContactDialog())
    } catch (e) {
        console.error(e)
    }
}

export const requestAddContact = (user, contact) => async dispatch => {
    try {
        await axios.post('/api/me/contact', {contact})
        const {data} = await axios.get(`/api/user/${contact}`)
        dispatch(addContact(data))
    } catch (e) {
        console.error(e)
    }
}


export const requestData = () => async dispatch => {
    try {
        const userRes = await axios.get('/api/me')
        dispatch(setUserInfo(userRes.data))
        const contactsRes = await axios.get('/api/me/contacts')
        dispatch(setContacts(contactsRes.data.contacts))
    } catch (e) {
        console.error(e)
    }
}

export const requestLogin = (email, password) => async dispatch => {
    try {
        const loginRes = await axios.put('/api/auth/login', {email, password})
        dispatch(setUserInfo(loginRes.data))
        const contactsRes = await axios.get('/api/me/contacts')
        dispatch(setContacts(contactsRes.data.contacts))
        const boats = await axios.get('/api/boat/all')
        dispatch(setBoats(boats.data.boats))
    } catch (e) {
        console.error(e)
    }
}

export const requestSignup = (email, nickname, password) => async dispatch => {
    try {
        const signupRes = await axios.post('/api/auth/signup', {email, nickname, password})
        dispatch(setUserInfo(signupRes.data))
        const contactsRes = await axios.get('/api/me/contacts')
        dispatch(setContacts(contactsRes.data.contacts))
    } catch (e) {
        console.error(e)
    }
}

export const requestLogout = () => async dispatch => {
    try {
        await axios.put('/api/auth/logout', {})
        dispatch(resetApp())
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveContact = _id => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/me/contact/${_id}`)
        dispatch(removeContact(_id))
    } catch (e) {
        console.error(e)
    }
}


export const requestAddBoat = (name, code) => async dispatch => {
    try {
        await axios.post('/api/boat/add', {name, code})
        const {data} = await axios.get(`/api/boat/findByName/${name}`)
        dispatch(addBoat(data))
    } catch (e) {
        console.error(e)
    }
}

export const requestBoats = () => async dispatch => {
    try {
        const boats = await axios.get('/api/boat/all')
        dispatch(setBoats(boats.data.boats))
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveBoat = _id => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/me/contact/${_id}`)
        dispatch(removeContact(_id))
    } catch (e) {
        console.error(e)
    }
}

export const startAddTripDialog = () => async dispatch => {
    try {
        const usersRes = await axios.get('/api/users')
        dispatch(setCachedUsers(usersRes.data.users))
        dispatch(openAddContactDialog())
    } catch (e) {
        console.error(e)
    }
}