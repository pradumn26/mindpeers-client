import {FETCH_TODAYS_APPOINTMENTS, CONFIRM_APPOINTMENT} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_TODAYS_APPOINTMENTS:
            return action.payload;
        case CONFIRM_APPOINTMENT:
            if (action.payload.data.success) {
                let newState = [];
                state.map(function (v, i) {
                    if (i == action.payload.pos) {
                        state[i].status = "confirmed";
                    }

                    newState.push(v);
                });
                return newState
            } else
                return state;
        default:
            return state;
    }
}