import {combineReducers} from 'redux';

import auth from './authReducer';
import doctorsList from './doctorsListReducer';

const combinedReducer = combineReducers({
    auth,
    doctorsList
});

export default combinedReducer;