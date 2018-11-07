export default interface Person {
    id: number,
    name: string,
    gender: Gender,
    likes: Person[],
    dislikes: Person[]

}

export enum Gender {
    MALE = '[person] MALE',
    FEMALE = '[person] FEMALE'
}