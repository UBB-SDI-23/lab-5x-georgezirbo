import {Course} from "./Course"

export interface Teacher {
	tid?: number;
    fname: string;
    lname: string;
    rank: string;
    descr: string;
    courses?: Course[];
    no_courses?: number;
}