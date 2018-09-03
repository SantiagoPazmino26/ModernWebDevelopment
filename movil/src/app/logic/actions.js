import axios from "axios";

export const server = "http://localhost:3000";

// plain actions

export const RESET_APP = "RESET_APP";
export const resetApp = () => ({ type: RESET_APP });

// ui

export const CLOSE_DIALOG = "UI/CLOSE_DIALOG";
export const closeDialog = () => ({ type: CLOSE_DIALOG });

export const OPEN_LOGIN_PAGE = "UI/OPEN_LOGIN_PAGE";
export const openLoginPage = () => ({ type: OPEN_LOGIN_PAGE });

//ui//trip

export const OPEN_ADD_TRIP_DIALOG = "UI/OPEN_ADD_TRIP_DIALOG";
export const openAddTripDialog = () => ({ type: OPEN_ADD_TRIP_DIALOG });

// data

export const SET_USER_INFO = "DATA/SET_USER_INFO";
export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  payload: userInfo
});

export const SET_BOATS = "DATA/SET_BOATS";
export const setBoats = boats => ({ type: SET_BOATS, payload: boats });

export const SET_DESTINATIONS = "DATA/SET_DESTINATIONS";
export const setDestinations = destinations => ({
    type: SET_DESTINATIONS,
    payload: destinations
});

export const SET_CACHED_USERS = "UI/SET_CACHED_USERS";
export const setCachedUsers = cachedUsers => ({
    type: SET_CACHED_USERS,
    payload: cachedUsers
});

export const REMOVE_CONTACT = "DATA/REMOVE_CONTACT";
export const removeContact = _id => ({ type: REMOVE_CONTACT, payload: _id });

//data//trips

export const ADD_TRIP = "DATA/ADD_TRIP";
export const addTrip = trip => ({ type: ADD_TRIP, payload: trip });

export const SET_TRIPS = "DATA/SET_TRIPS";
export const setTrips = trips => ({ type: SET_TRIPS, payload: trips });

// thunks

export const requestData = () => async dispatch => {
  try {
    const userRes = await axios.get(server + "/api/me");
    dispatch(setUserInfo(userRes.data));
    const tripsRes = await axios.get(server + "/api/trip/all");
    dispatch(setTrips(tripsRes.data.trips));
  } catch (e) {
    console.error(e);
  }
};

export const requestLogin = (email, password) => async dispatch => {
  try {
    const loginRes = await axios.put(server + "/api/auth/login", { email, password });
    dispatch(setUserInfo(loginRes.data));
  } catch (e) {
    console.error(e);
  }
};

export const requestLogout = () => async dispatch => {
  try {
    await axios.put(server + "/api/auth/logout", {});
    dispatch(resetApp());
  } catch (e) {
    console.error(e);
  }
};

export const startAddTripDialog = () => async dispatch => {
  try {
    const usersRes = await axios.get(server + "/api/users");
    dispatch(setCachedUsers(usersRes.data.users));
    const boatsRes = await axios.get(server + "/api/boat/all");
    dispatch(setBoats(boatsRes.data.boats));
    const destinationsRes = await axios.get(server + "/api/destination/all");
    dispatch(setDestinations(destinationsRes.data.destinations));
    dispatch(openAddTripDialog());
  } catch (e) {
    console.error(e);
  }
};

export const requestAddTrip = (
  boat,
  destination,
  departure,
  user
) => async dispatch => {
  try {
    const trip = await axios.post(server + "/api/trip/add", {
      destination,
      boat,
      departure,
      user
    });
    dispatch(addTrip(trip.data));
  } catch (e) {
    console.error(e);
  }
};
console.log(typeof requestAddTrip);

export const requestRemoveTrip = _id => async dispatch => {
  try {
    const { data } = await axios.delete(server + `/api/me/contact/${_id}`);
    dispatch(removeContact(_id));
  } catch (e) {
    console.error(e);
  }
};

export const requestJoinTrip = (user, trip) => async dispatch => {
  try {
    const { data } = await axios.post(server + `/api/trip/join`, { user, trip });
    const tripsRes = await axios.get(server + "/api/trip/all");
    dispatch(setTrips(tripsRes.data.trips));
  } catch (e) {
    console.error(e);
  }
};

export const sumAdd = (a, b) => a + b;
