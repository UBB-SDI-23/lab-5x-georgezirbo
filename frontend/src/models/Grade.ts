import { Course } from "./Course";
import { Student } from "./Student"

export interface Grade {
	gid?: number;
    session: number;
    retake: number;
    course: Course;
    student: Student;
}