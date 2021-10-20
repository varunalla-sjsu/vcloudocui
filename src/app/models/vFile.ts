export interface vFile{
    origFileName: string;
    description:string;
    createdby: cUser;
    createdon: Date;
    fileid:string;
    action?:string;
}
export interface cUser{
    user:string;
    firstname:string;
    lastname:string;
}