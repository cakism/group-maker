import Crowd from "../models/Crowd";
import {Action, ActionTypes} from "../actions/AppActions";
import Group from "../models/Group";
import Person from "../models/Person";

export interface State {
    crowd: Crowd
}

export const initialState: State = {
    crowd: {id: -1, groups: [], name: "", people: []}
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {

        case ActionTypes.CREATE_PERSON: {
            //TODO add person id here?
            const {person} = action.payload;

            return {
                ...state,
                people: [...state.crowd.people, person]
            }

        }

        case ActionTypes.DELETE_PERSON: {
            const {personId} = action.payload;
            const indexToDelete = state.crowd.people.findIndex(x => x.id === personId)

            return {
                ...state,
                people: state.crowd.people.splice(indexToDelete, 1)
            };
        }

        case ActionTypes.CREATE_GROUP: {
            const newId: number = state.crowd.groups.length > 0 ? state.crowd.groups[state.crowd.groups.length - 1].id + 1 : 1;
            const newGroup: Group = {id: newId};
            return {
                ...state,
                groups: state.crowd.groups.push(newGroup)
            }
        }

        case ActionTypes.DELETE_GROUP: {
            const {groupId} = action.payload;
            const indexToDelete = state.crowd.groups.findIndex(x => x.id === groupId);

            let peopleWithDeletedGroup: Person[] = state.crowd.people.filter(p => p.group != null && p.group.id === groupId);
            peopleWithDeletedGroup.map(p => p.group = undefined);

            return {
                ...state,
                groups: state.crowd.groups.splice(indexToDelete, 1),
                people: peopleWithDeletedGroup
            };
        }

        //Add/Update person group
        case ActionTypes.ADD_PERSON: {
            const {groupId} = action.payload;
            const {personId} = action.payload;

            const newGroup = state.crowd.groups.find(x => x.id === groupId) as Group;

            //Add person with new group to state
            return {
                ...state,  //Spread operator to deconstruct group obj and create new copy with added person
                people: state.crowd.people.map(person => person.id === personId ? { //Find the person with personId
                    ...person, group: newGroup //Desconstruct person object and update group
                } : person), //If person not found, just set back original person object / do nothing

            }
        }

        case ActionTypes.REMOVE_PERSON: {
            const {personId} = action.payload;

            return {
                ...state,
                people: state.crowd.people.map(person => person.id === personId ? {
                    ...person, group: undefined
                }: person)
            }
        }

        default:
            return state;

    }
}

/*
groups: state.crowd.groups.map(group => group.id === groupId ? {
    ...group,
    people: [...group.people, person]
} : group),

*/