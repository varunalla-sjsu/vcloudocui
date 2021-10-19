export enum Role {
    Admin=2,
    User=3
}
export interface account{
    username: string;
    firstName:string;
    lastName:string;
    userId:string;
    isActive:boolean;
    userRole:Role;
}