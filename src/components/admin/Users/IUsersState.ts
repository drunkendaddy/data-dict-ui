export interface IUsersState {
    users: User[];
}

export interface User {
    username: string;
    name: string;
    role: string;
}