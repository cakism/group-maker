import Person from "./Person";
import Group from "./Group";

/*
 This represents a bunch of people who will be put into groups
 */
export default interface Crowd {
    id: number,
    name: string,
    ungroupedPeople: Person[],
    groups: Group[]
}
