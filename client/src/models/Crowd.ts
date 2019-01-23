import Person from "./Person";
import Group from "./Group";

/*
 This represents our root object with people and groups
 */
export default interface Crowd {
    id: number,
    name: string,
    people: Person[],
    groups: Group[]
}
