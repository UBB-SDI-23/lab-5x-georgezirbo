import { Course } from "./Course";
import { Student } from "./Student"

export interface Grade {
	gid?: number;
    session: number;
    retake: number;
    course?: string;
    course_name?: string;
    student_fname?: string;
    student_lname?: string;
    student?: string;
}