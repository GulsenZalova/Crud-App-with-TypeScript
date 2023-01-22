import { BaseService } from "../base/BaseService";
import { SuppliersModel } from "../../Models/SuppliersModel";


export class SuppliersService extends BaseService<SuppliersModel>{
    constructor(){
        super("/suppliers")
    }
}