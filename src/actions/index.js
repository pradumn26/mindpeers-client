import axios from 'axios';

import {FETCH_USER, FETCH_DOCTORS, FETCH_MY_APPOINTMENTS, FETCH_NOTIFICATIONS, CLEAR_NOTIFICATIONS, FETCH_TODAYS_APPOINTMENTS, CONFIRM_APPOINTMENT} from "./types";

export const fetchUser = ()=> dispatch => {
    axios.get('/auth/fetchUser')
        .then(function (res) {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            })
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const fetchDoctors = () => dispatch => {
    axios.get('/fetchDoctors')
        .then(function (res) {
            dispatch({
                type: FETCH_DOCTORS,
                payload: res.data
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};

export const fetchMyAppointments = () => dispatch => {
    axios.get('/fetchAppointments')
        .then(function (res) {
            dispatch({
                type: FETCH_MY_APPOINTMENTS,
                payload: res.data
            });
        })
        .catch(function (err) {
            console.log(err);
        })
};

export const fetchNotifications = () => dispatch => {
    axios.get('/fetchNotifications')
        .then(function (res) {
            dispatch({
                type: FETCH_NOTIFICATIONS,
                payload: res.data
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};

export const clearNotifications = () => dispatch => {
    dispatch({
        type: CLEAR_NOTIFICATIONS,
        payload: []
    })
};

export const fetchTodaysAppointments = () => dispatch => {
    axios.get('/fetchTodaysAppointments')
        .then(function (res) {
            dispatch({
                type: FETCH_TODAYS_APPOINTMENTS,
                payload: res.data
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};

export const confirmAppointment = (appointment_id, pos) => dispatch => {
    axios.post('/confirmAppointment', {appointment_id})
        .then(function (res) {
            dispatch({
                type: CONFIRM_APPOINTMENT,
                payload: {
                    data: res.data,
                    pos
                }
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};