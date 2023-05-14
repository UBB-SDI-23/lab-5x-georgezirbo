
export interface User {
    id?: number,
    username: string;
    password: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    role?: string
}