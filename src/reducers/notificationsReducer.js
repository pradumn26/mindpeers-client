import {FETCH_NOTIFICATIONS, CLEAR_NOTIFICATIONS} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return action.payload;
        case CLEAR_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}