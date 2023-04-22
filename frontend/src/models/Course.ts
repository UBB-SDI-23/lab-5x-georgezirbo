import { Grade } from "./Grade"
import { Teacher } from "./Teacher";

export interface Course {
	cid?: number;
    name: string;
    university: string;
    faculty: string;
    department: string;
    teacher: Teacher;
    year: string;
    grades?: Grade[];
}