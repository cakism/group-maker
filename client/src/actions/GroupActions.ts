export enum ActionTypes {
    ADD_PERSON = '[class] ADD_PERSON',
    REMOVE_PERSON = '[class] REMOVE_PERSON',
}

export interface AddPersonAction { type: ActionTypes.ADD_PERSON, payload: {groupId: number, personId: number}}
export interface RemovePersonAction { type: ActionTypes.REMOVE_PERSON, payload: {groupId: number, personId: number}}

export function addPerson(groupId: number, personId: number): AddPersonAction {

    return {
        type: ActionTypes.ADD_PERSON,
        payload: { groupId, personId }
    }
}

export function removePerson(groupId: number, personId: number): RemovePersonAction {

    return {
        type: ActionTypes.REMOVE_PERSON,
        payload: { groupId, personId }
    }
}

export type Action = AddPersonAction | RemovePersonAction