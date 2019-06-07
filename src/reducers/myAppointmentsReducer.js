import {FETCH_MY_APPOINTMENTS} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_MY_APPOINTMENTS:
            return action.payload;
        default:
            return state;
    }
}