import Crowd from "../models/Crowd";
import {Action, ActionTypes} from "../actions/AppActions";

export interface State {
    crowd: Crowd
}

export const initialState: State = {
    crowd: {id: -1, groups: [], name: "", people: []}
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {

        case ActionTypes.ADD_PERSON: {
            const {groupId} = action.payload;
            const {personId} = action.payload;

            const person = state.crowd.people[personId];

            //Add person to group
            return {
                ...state,
                groups: state.crowd.groups.map(group => group.id === groupId ? {
                    ...group,
                    people: [...group.people, person]
                } : group)

            }
        }

        default:
            return state;

    }
}