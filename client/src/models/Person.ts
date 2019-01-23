import Group from "./Group";

export default interface Person {
    id: number,
    name: string,
    gender: Gender,
    likes: Person[],
    dislikes: Person[],
    group?: Group

}

export enum Gender {
    MALE = '[person] MALE',
    FEMALE = '[person] FEMALE'
}