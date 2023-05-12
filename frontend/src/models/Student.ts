import { Grade } from "./Grade"

export interface Student {
	sid?: number;
    fname: string;
    lname: string;
    cnp: string;
    email: string;
    phone: string;
    grades?: Grade[];
    avg_grade?: number;
    no_courses?: number;
    user?: number;
    username?: string;

}