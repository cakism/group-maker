import Person from "../models/Person";

// All types of actions, defined as enums
export enum ActionTypes {
    CREATE_PERSON = '[crowd] CREATE_PERSON',
    DELETE_PERSON = '[crowd] DELETE_PERSON',
    CREATE_GROUP = '[crowd] CREATE_GROUP',
    DELETE_GROUP = '[crowd] DELETE_GROUP',
    ADD_PERSON = '[crowd] ADD_PERSON',
    REMOVE_PERSON = '[crowd] REMOVE_PERSON',
    ADD_FRIEND = '[crowd] ADD_FRIEND',
    REMOVE_FRIEND = '[crowd] REMOVE_FRIEND',
    ADD_ENEMY = '[crowd] ADD_ENEMY',
    REMOVE_ENEMY = '[crowd] REMOVE_ENEMY',
}

//Interfaces of all actions, defining input and return type
export interface CreateGroupAction { //Create group and add it to a crowd
    type: ActionTypes.CREATE_GROUP,
    payload: { crowdId: number}
}

export interface DeleteGroupAction { //Create group and add it to a crowd
    type: ActionTypes.DELETE_GROUP,
    payload: { crowdId: number, groupId: number}
}

export interface CreatePersonAction { //Create person and add it to a crowd
    type: ActionTypes.CREATE_PERSON,
    payload: { crowdId: number, person: Person }
}

export interface DeletePersonAction { //Delete person from crowd
    type: ActionTypes.DELETE_PERSON,
    payload: { crowdId: number, personId: number }
}

export interface AddPersonAction { //Add an existing person to a group in a crowd
    type: ActionTypes.ADD_PERSON,
    payload: { groupId: number, personId: number }
}

export interface RemovePersonAction { //Remove person from a group in a crowd
    type: ActionTypes.REMOVE_PERSON,
    payload: { groupId: number, personId: number }
}

export interface AddFriendAction { //Add a friend to a person in a group
    type: ActionTypes.ADD_FRIEND,
    payload: { personId: number, friendId: number }
}

export interface RemoveFriendAction { //Remove a friend from a person in a group
    type: ActionTypes.REMOVE_FRIEND,
    payload: { personId: number, friendId: number }
}

export interface AddEnemyAction { //Add an enemy to a person in a group
    type: ActionTypes.ADD_ENEMY,
    payload: { personId: number, enemyId: number }
}

export interface RemoveEnemyAction { //Remove an enemy from a person in a group
    type: ActionTypes.REMOVE_ENEMY,
    payload: { personId: number, enemyId: number }
}

//Implementation of the interfaces
export function createPerson(crowdId: number, person: Person): CreatePersonAction {

    return {
        type: ActionTypes.CREATE_PERSON,
        payload: {crowdId, person}
    }
}

export function deletePerson(crowdId: number, personId: number): DeletePersonAction {

    return {
        type: ActionTypes.DELETE_PERSON,
        payload: {crowdId, personId}
    }
}

export function createGroup(crowdId: number): CreateGroupAction {

    return {
        type: ActionTypes.CREATE_GROUP,
        payload: {crowdId}
    }
}

export function deleteGroup(crowdId: number, groupId: number): DeleteGroupAction {

    return {
        type: ActionTypes.DELETE_GROUP,
        payload: {crowdId, groupId}
    }
}

export function addPerson(groupId: number, personId: number): AddPersonAction {

    return {
        type: ActionTypes.ADD_PERSON,
        payload: {groupId, personId}
    }
}

export function removePerson(groupId: number, personId: number): RemovePersonAction {

    return {
        type: ActionTypes.REMOVE_PERSON,
        payload: {groupId, personId}
    }
}

export function addFriend(personId: number, friendId: number): AddFriendAction {

    return {
        type: ActionTypes.ADD_FRIEND,
        payload: {personId, friendId}
    }
}

export function removeFriend(personId: number, friendId: number): RemoveFriendAction {

    return {
        type: ActionTypes.REMOVE_FRIEND,
        payload: {personId, friendId}
    }
}

export function addEnemy(personId: number, enemyId: number): AddEnemyAction {

    return {
        type: ActionTypes.ADD_ENEMY,
        payload: {personId, enemyId}
    }
}

export function removeEnemy(personId: number, enemyId: number): RemoveEnemyAction {

    return {
        type: ActionTypes.REMOVE_ENEMY,
        payload: {personId, enemyId}
    }
}

export type Action =
    CreatePersonAction
    | DeletePersonAction
    | CreateGroupAction
    | DeleteGroupAction
    | AddPersonAction
    | RemovePersonAction
    | AddFriendAction
    | RemoveFriendAction
    | AddEnemyAction
    | RemoveEnemyAction