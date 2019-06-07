import {FETCH_DOCTORS} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_DOCTORS:
            return action.payload;
        default:
            return state;
    }
}