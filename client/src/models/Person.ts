export default interface Person {
    id: Number,
    name: String,
    gender: Gender,
    likes: Person[],
    dislikes: Person[]

}

export enum Gender {
    MALE = '[person] MALE',
    FEMALE = '[person] FEMALE'
}