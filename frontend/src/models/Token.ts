
export interface Token {
    access: string,
    refresh: string,
    exp?: number,
    username?: string,
    user_id?: number
}