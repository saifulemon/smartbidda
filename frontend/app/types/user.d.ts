export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}
// v118 scaffold-frontend-contract-doctor R5 — stub types for imported-but-
// undefined members (LLM type/consumer drift). Redux `*State` types are typed
// against the entity response (see r5StateType); everything else is unknown.
export type CreateUserRequest = unknown;
export type UpdateUserRequest = unknown;
export type UserResponse = unknown;
