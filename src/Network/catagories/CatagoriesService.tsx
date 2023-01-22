import { BaseService } from "../base/BaseService";
import { CatagoriesModel } from "../../Models/CatagoriesModel";

export class CatagoriesService extends BaseService<CatagoriesModel>{
    constructor(){
        super("/categories")
    }
}