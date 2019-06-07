import {combineReducers} from 'redux';

import auth from './authReducer';
import doctorsList from './doctorsListReducer';
import myAppointments from './myAppointmentsReducer';
import myNotifications from './notificationsReducer';
import todaysAppointments from './todaysAppointmentsReducer';

const combinedReducer = combineReducers({
    auth,
    doctorsList,
    myAppointments,
    myNotifications,
    todaysAppointments
});

export default combinedReducer;