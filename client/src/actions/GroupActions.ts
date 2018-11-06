import Person from "../models/Person";

export enum ActionTypes {
    ADD_PERSON = '[class] ADD_PERSON',
    REMOVE_PERSON = '[class] REMOVE_PERSON',
}

export interface AddPersonAction { type: ActionTypes.ADD_PERSON, payload: {person: Person}}
export interface AddPersonAction { type: ActionTypes.ADD_PERSON, payload: {person: Person}}