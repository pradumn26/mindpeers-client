import axios from 'axios';

import {FETCH_USER, FETCH_DOCTORS} from "./types";

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
}