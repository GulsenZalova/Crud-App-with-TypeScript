import { BaseModel } from "./core/BaseModel";

export interface SuppliersModel extends BaseModel{
    companyName:string,
    contactName:string,
    contactTitle:string
}