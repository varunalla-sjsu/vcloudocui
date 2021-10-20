export enum Role {
    Admin=2,
    User=3
}
export interface account{
    username: string;
    firstname:string;
    lastname:string;
    isActive:boolean;
    Role:Role;
}