import { Grade } from "./Grade"
import { Teacher } from "./Teacher";

export interface Course {
	cid?: number;
    name: string;
    university: string;
    faculty: string;
    department: string;
    teacher?: number;
    teacher_fname?: string;
    teacher_lname?: string;
    year: string;
    grades?: Grade[];
    no_students?: number;
}