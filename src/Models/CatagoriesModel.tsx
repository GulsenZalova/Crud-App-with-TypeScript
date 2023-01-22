import Catagories from "../Pages/Catagories";
import { BaseModel } from "./core/BaseModel";


export interface CatagoriesModel extends BaseModel{
    description:string,
    name:string
}