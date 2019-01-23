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

            const newGroup = state.crowd.groups.find(x => x.id === groupId) as Group; // Same as ! operator, disregards null possibility

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
                } : person)
            }
        }

        case ActionTypes.ADD_FRIEND: {
            const {personId} = action.payload;
            const {friendId} = action.payload;

            let updatedPeople = addFriendOrEnemy(state.crowd.people, personId, friendId, PersonType.FRIEND);
            updatedPeople = addFriendOrEnemy(updatedPeople, friendId, personId, PersonType.FRIEND);

            return {
                ...state,
                people: updatedPeople
            }


        }

        case ActionTypes.REMOVE_FRIEND: {
            const {personId} = action.payload;
            const {friendId} = action.payload;

            let updatedPeople = removeFriendOrEnemy(state.crowd.people, personId, friendId, PersonType.FRIEND)
            updatedPeople = removeFriendOrEnemy(updatedPeople, friendId, personId, PersonType.FRIEND);

            return {
                ...state,
                people: updatedPeople
            }
        }

        case ActionTypes.ADD_ENEMY: {
            const {personId} = action.payload;
            const {enemyId} = action.payload;

            let updatedPeople = addFriendOrEnemy(state.crowd.people, personId, enemyId, PersonType.ENEMY);
            updatedPeople = addFriendOrEnemy(updatedPeople, enemyId, personId, PersonType.ENEMY);

            return {
                ...state,
                people: updatedPeople
            }
        }

        case ActionTypes.REMOVE_ENEMY: {
            const {personId} = action.payload;
            const {enemyId} = action.payload;

            let updatedPeople = removeFriendOrEnemy(state.crowd.people, personId, enemyId, PersonType.ENEMY)
            updatedPeople = removeFriendOrEnemy(updatedPeople, enemyId, personId, PersonType.ENEMY);

            return {
                ...state,
                people: updatedPeople
            }
        }

        default:
            return state;

    }
}

enum PersonType {FRIEND, ENEMY}

function addFriendOrEnemy(people: Person[], personId: number, friendId: number, personType: PersonType) {
    const personIndex = people.findIndex(p => p.id === personId);
    const friend = people.find(p => p.id === friendId) as Person;
    if (friend === undefined || personIndex === -1) {
        throw new Error("Looks like you tried to add a friend that wasnt in the list of friends")
    }
    personType === PersonType.FRIEND ?
        people[personIndex].likes.push(friend)
        : people[personIndex].dislikes.push(friend);

    return people;
}

function removeFriendOrEnemy(people: Person[], personId: number, friendId: number, personType: PersonType) {
    const personIndex = people.findIndex(p => p.id === personId);
    const friendIndex = personType === PersonType.FRIEND ?
        people[personIndex].likes.findIndex(p => p.id === friendId)
        : people[personIndex].dislikes.findIndex(p => p.id === friendId);
    if (friendIndex === -1 || personIndex === -1) {
        throw new Error("Looks like you tried to remove a friend that wasnt in the list of friends")
    }
    personType === PersonType.FRIEND ?
        people[personIndex].likes.splice(friendIndex, 1)
        : people[personIndex].dislikes.splice(friendIndex, 1);

    return people;
}
