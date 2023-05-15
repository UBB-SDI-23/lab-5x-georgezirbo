import { Course } from "./Course";
import { Student } from "./Student"

export interface Grade {
	gid?: number;
    session: number;
    retake?: number;
    course?: number;
    course_name?: string;
    student_name?: string;
    student?: number;
    user?: number;
    username?: string;

}
